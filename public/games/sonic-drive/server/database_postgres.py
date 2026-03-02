#!/usr/bin/env python3
"""
Database models and initialization for Balloon Game
Uses PostgreSQL for production deployment
"""

import psycopg2
import psycopg2.extras
import os
from datetime import datetime


class Database:
    """Database manager for users and progress using PostgreSQL"""

    def __init__(self, database_url=None):
        """
        Initialize database connection
        Args:
            database_url: PostgreSQL connection URL (from environment variable)
        """
        self.database_url = database_url or os.environ.get('DATABASE_URL')

        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable not set!")

        print(f"✅ Connecting to PostgreSQL database...")
        try:
            self.init_db()
            print(f"✅ Database tables initialized successfully")
        except Exception as e:
            print(f"❌ Database initialization error: {e}")
            # Don't fail on init - tables will be created on first connection
            # This prevents serverless function from crashing on cold start

    def get_connection(self):
        """Get a database connection"""
        conn = psycopg2.connect(self.database_url)
        return conn

    def init_db(self):
        """Initialize database tables if they don't exist"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Sessions table for authentication
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                token VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)

        # Progress table (stores high scores only)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS progress (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                level_number INTEGER NOT NULL,
                module_number INTEGER NOT NULL,
                high_score INTEGER DEFAULT 0,
                completed BOOLEAN DEFAULT FALSE,
                last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                UNIQUE(user_id, level_number)
            )
        """)

        # Score history table (stores all attempts)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS score_history (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                level_number INTEGER NOT NULL,
                score INTEGER NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)

        # Create indexes for faster queries
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_progress_user
            ON progress(user_id)
        """)

        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_sessions_token
            ON sessions(token)
        """)

        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_score_history_user_level
            ON score_history(user_id, level_number)
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print(f"✅ PostgreSQL database initialized")

    # User operations
    def create_user(self, username, password_hash):
        """Create a new user"""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (%s, %s) RETURNING id",
                (username, password_hash)
            )
            user_id = cursor.fetchone()[0]
            conn.commit()
            cursor.close()
            conn.close()
            return user_id
        except psycopg2.IntegrityError:
            conn.close()
            return None  # Username already exists

    def get_user_by_username(self, username):
        """Get user by username"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(user) if user else None

    def get_user_by_id(self, user_id):
        """Get user by ID"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(user) if user else None

    # Session operations
    def create_session(self, user_id, token, expires_at):
        """Create a new session"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s) RETURNING id",
            (user_id, token, expires_at)
        )
        session_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return session_id

    def get_session(self, token):
        """Get session by token"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(
            "SELECT * FROM sessions WHERE token = %s AND expires_at > %s",
            (token, datetime.now())
        )
        session = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(session) if session else None

    def delete_session(self, token):
        """Delete a session (logout)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE token = %s", (token,))
        conn.commit()
        cursor.close()
        conn.close()

    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE expires_at < %s", (datetime.now(),))
        deleted_count = cursor.rowcount
        conn.commit()
        cursor.close()
        conn.close()
        return deleted_count

    # Progress operations
    def save_progress(self, user_id, level_number, module_number, score, completed):
        """Save or update progress for a level"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Save to score history (every attempt)
        cursor.execute("""
            INSERT INTO score_history
            (user_id, level_number, score, completed, played_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, level_number, score, completed, datetime.now()))

        # Check if progress exists
        cursor.execute(
            "SELECT high_score FROM progress WHERE user_id = %s AND level_number = %s",
            (user_id, level_number)
        )
        existing = cursor.fetchone()

        if existing:
            # Update only if new score is higher
            current_high_score = existing[0]
            new_high_score = max(current_high_score, score)

            cursor.execute("""
                UPDATE progress
                SET high_score = %s, completed = %s, last_played = %s
                WHERE user_id = %s AND level_number = %s
            """, (new_high_score, completed, datetime.now(), user_id, level_number))
        else:
            # Insert new progress record
            cursor.execute("""
                INSERT INTO progress
                (user_id, level_number, module_number, high_score, completed, last_played)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (user_id, level_number, module_number, score, completed, datetime.now()))

        conn.commit()
        cursor.close()
        conn.close()

    def get_user_progress(self, user_id):
        """Get all progress for a user"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(
            "SELECT * FROM progress WHERE user_id = %s ORDER BY module_number, level_number",
            (user_id,)
        )
        progress = cursor.fetchall()
        cursor.close()
        conn.close()
        return [dict(row) for row in progress]

    def get_level_progress(self, user_id, level_number):
        """Get progress for a specific level"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(
            "SELECT * FROM progress WHERE user_id = %s AND level_number = %s",
            (user_id, level_number)
        )
        progress = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(progress) if progress else None

    def get_leaderboard(self, level_number, limit=10):
        """Get top scores for a specific level across all users"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            SELECT
                users.username,
                progress.high_score,
                progress.completed,
                progress.last_played
            FROM progress
            JOIN users ON progress.user_id = users.id
            WHERE progress.level_number = %s
            ORDER BY progress.high_score DESC
            LIMIT %s
        """, (level_number, limit))
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return [dict(row) for row in results]

    def get_user_score_history(self, user_id, level_number, limit=50):
        """Get score history for a specific user and level"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            SELECT
                score,
                completed,
                played_at
            FROM score_history
            WHERE user_id = %s AND level_number = %s
            ORDER BY played_at DESC
            LIMIT %s
        """, (user_id, level_number, limit))
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        return [dict(row) for row in results]


# Initialize database when module is imported
if __name__ == "__main__":
    # For testing
    import sys
    if len(sys.argv) > 1:
        db = Database(database_url=sys.argv[1])
        print("PostgreSQL database initialized successfully!")
    else:
        print("Usage: python database_postgres.py <DATABASE_URL>")
