#!/usr/bin/env python3
"""
Database models and initialization for Balloon Game
Uses SQLite for simple, file-based storage
"""

import sqlite3
import os
from datetime import datetime
from pathlib import Path

# Database file location
DB_DIR = Path(__file__).parent
DB_FILE = DB_DIR / "balloon_game.db"


class Database:
    """Database manager for users and progress"""

    def __init__(self, db_path=DB_FILE):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        """Get a database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # Return rows as dictionaries
        return conn

    def init_db(self):
        """Initialize database tables if they don't exist"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Sessions table for authentication
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)

        # Progress table (stores high scores only)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                level_number INTEGER NOT NULL,
                module_number INTEGER NOT NULL,
                high_score INTEGER DEFAULT 0,
                completed BOOLEAN DEFAULT 0,
                last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                UNIQUE(user_id, level_number)
            )
        """)

        # Score history table (stores all attempts)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS score_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                level_number INTEGER NOT NULL,
                score INTEGER NOT NULL,
                completed BOOLEAN DEFAULT 0,
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
        conn.close()
        print(f"✅ Database initialized at {self.db_path}")

    # User operations
    def create_user(self, username, password_hash):
        """Create a new user"""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (?, ?)",
                (username, password_hash)
            )
            conn.commit()
            user_id = cursor.lastrowid
            conn.close()
            return user_id
        except sqlite3.IntegrityError:
            conn.close()
            return None  # Username already exists

    def get_user_by_username(self, username):
        """Get user by username"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        conn.close()
        return dict(user) if user else None

    def get_user_by_id(self, user_id):
        """Get user by ID"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        conn.close()
        return dict(user) if user else None

    # Session operations
    def create_session(self, user_id, token, expires_at):
        """Create a new session"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
            (user_id, token, expires_at)
        )
        conn.commit()
        session_id = cursor.lastrowid
        conn.close()
        return session_id

    def get_session(self, token):
        """Get session by token"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM sessions WHERE token = ? AND expires_at > ?",
            (token, datetime.now())
        )
        session = cursor.fetchone()
        conn.close()
        return dict(session) if session else None

    def delete_session(self, token):
        """Delete a session (logout)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()

    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE expires_at < ?", (datetime.now(),))
        deleted_count = cursor.rowcount
        conn.commit()
        conn.close()
        return deleted_count

    def cleanup_racing_levels(self):
        """Remove progress and score history for removed racing game levels (11-13)"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Delete from progress table
        cursor.execute("DELETE FROM progress WHERE level_number IN (11, 12, 13)")
        progress_deleted = cursor.rowcount

        # Delete from score_history table
        cursor.execute("DELETE FROM score_history WHERE level_number IN (11, 12, 13)")
        history_deleted = cursor.rowcount

        conn.commit()
        conn.close()

        return {
            'progress_deleted': progress_deleted,
            'history_deleted': history_deleted
        }

    # Progress operations
    def save_progress(self, user_id, level_number, module_number, score, completed):
        """Save or update progress for a level"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Save to score history (every attempt)
        cursor.execute("""
            INSERT INTO score_history
            (user_id, level_number, score, completed, played_at)
            VALUES (?, ?, ?, ?, ?)
        """, (user_id, level_number, score, completed, datetime.now()))

        # Check if progress exists
        cursor.execute(
            "SELECT high_score FROM progress WHERE user_id = ? AND level_number = ?",
            (user_id, level_number)
        )
        existing = cursor.fetchone()

        if existing:
            # Update only if new score is higher
            current_high_score = existing['high_score']
            new_high_score = max(current_high_score, score)

            cursor.execute("""
                UPDATE progress
                SET high_score = ?, completed = ?, last_played = ?
                WHERE user_id = ? AND level_number = ?
            """, (new_high_score, completed, datetime.now(), user_id, level_number))
        else:
            # Insert new progress record
            cursor.execute("""
                INSERT INTO progress
                (user_id, level_number, module_number, high_score, completed, last_played)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (user_id, level_number, module_number, score, completed, datetime.now()))

        conn.commit()
        conn.close()

    def get_user_progress(self, user_id):
        """Get all progress for a user"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM progress WHERE user_id = ? ORDER BY module_number, level_number",
            (user_id,)
        )
        progress = cursor.fetchall()
        conn.close()
        return [dict(row) for row in progress]

    def get_level_progress(self, user_id, level_number):
        """Get progress for a specific level"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM progress WHERE user_id = ? AND level_number = ?",
            (user_id, level_number)
        )
        progress = cursor.fetchone()
        conn.close()
        return dict(progress) if progress else None

    def get_leaderboard(self, level_number, limit=10):
        """Get top scores for a specific level across all users"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                users.username,
                progress.high_score,
                progress.completed,
                progress.last_played
            FROM progress
            JOIN users ON progress.user_id = users.id
            WHERE progress.level_number = ?
            ORDER BY progress.high_score DESC
            LIMIT ?
        """, (level_number, limit))
        results = cursor.fetchall()
        conn.close()
        return [dict(row) for row in results]

    def get_user_score_history(self, user_id, level_number, limit=50):
        """Get score history for a specific user and level"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                score,
                completed,
                played_at
            FROM score_history
            WHERE user_id = ? AND level_number = ?
            ORDER BY played_at DESC
            LIMIT ?
        """, (user_id, level_number, limit))
        results = cursor.fetchall()
        conn.close()
        return [dict(row) for row in results]


# Initialize database when module is imported
if __name__ == "__main__":
    db = Database()
    print("Database initialized successfully!")
