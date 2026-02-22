#!/usr/bin/env python3
"""
PostgreSQL Database module for Painting Game (Production)
Handles user authentication and game progress tracking on Render.com
"""

import psycopg2
import psycopg2.extras
import os
from datetime import datetime
from typing import Optional, Dict, List
from urllib.parse import urlparse

class Database:
    def __init__(self, db_path=None):
        """Initialize PostgreSQL database connection

        Args:
            db_path: Not used for PostgreSQL, but accepted for compatibility with SQLite Database class
        """
        self.database_url = os.environ.get('DATABASE_URL')
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable is required for PostgreSQL")

        # Parse database URL
        result = urlparse(self.database_url)
        self.db_config = {
            'database': result.path[1:],
            'user': result.username,
            'password': result.password,
            'host': result.hostname,
            'port': result.port
        }

        self.init_database()

    def get_connection(self):
        """Get a database connection"""
        return psycopg2.connect(**self.db_config)

    def init_database(self):
        """Initialize database tables"""
        conn = self.get_connection()
        cursor = conn.cursor()

        # Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                email VARCHAR(255) UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')

        # Sessions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                session_token TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')

        # Game sessions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS game_sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                duration_seconds INTEGER,
                regions_painted INTEGER DEFAULT 0,
                completion_percentage REAL DEFAULT 0.0,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')

        # Painted images table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS painted_images (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                game_session_id INTEGER,
                image_data TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (game_session_id) REFERENCES game_sessions (id)
            )
        ''')

        # User statistics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_statistics (
                user_id INTEGER PRIMARY KEY,
                total_games_played INTEGER DEFAULT 0,
                total_regions_painted INTEGER DEFAULT 0,
                total_play_time_seconds INTEGER DEFAULT 0,
                average_completion_percentage REAL DEFAULT 0.0,
                best_completion_time_seconds INTEGER,
                last_played_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        ''')

        conn.commit()
        cursor.close()
        conn.close()
        print("✅ PostgreSQL Database initialized successfully")

    # User Management
    def create_user(self, username: str, password_hash: str, email: Optional[str] = None) -> Optional[int]:
        """Create a new user"""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO users (username, password_hash, email) VALUES (%s, %s, %s) RETURNING id',
                (username, password_hash, email)
            )
            user_id = cursor.fetchone()[0]

            # Initialize user statistics
            cursor.execute(
                'INSERT INTO user_statistics (user_id) VALUES (%s)',
                (user_id,)
            )

            conn.commit()
            cursor.close()
            conn.close()
            return user_id
        except psycopg2.IntegrityError:
            return None

    def get_user_by_username(self, username: str) -> Optional[Dict]:
        """Get user by username"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(user) if user else None

    def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """Get user by ID"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(user) if user else None

    def update_last_login(self, user_id: int):
        """Update user's last login timestamp"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            'UPDATE users SET last_login = %s WHERE id = %s',
            (datetime.now(), user_id)
        )
        conn.commit()
        cursor.close()
        conn.close()

    # Session Management
    def create_session(self, user_id: int, session_token: str, expires_at: datetime) -> int:
        """Create a new session"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s) RETURNING id',
            (user_id, session_token, expires_at)
        )
        session_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return session_id

    def get_session(self, session_token: str) -> Optional[Dict]:
        """Get session by token"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(
            'SELECT * FROM sessions WHERE session_token = %s AND expires_at > %s',
            (session_token, datetime.now())
        )
        session = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(session) if session else None

    def delete_session(self, session_token: str):
        """Delete a session"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM sessions WHERE session_token = %s', (session_token,))
        conn.commit()
        cursor.close()
        conn.close()

    # Game Session Management
    def create_game_session(self, user_id: int) -> int:
        """Create a new game session"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO game_sessions (user_id) VALUES (%s) RETURNING id',
            (user_id,)
        )
        session_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return session_id

    def update_game_session(self, session_id: int, regions_painted: int,
                           completion_percentage: float, duration_seconds: int):
        """Update game session with progress"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE game_sessions
            SET completed_at = %s, regions_painted = %s,
                completion_percentage = %s, duration_seconds = %s
            WHERE id = %s
        ''', (datetime.now(), regions_painted, completion_percentage,
              duration_seconds, session_id))
        conn.commit()
        cursor.close()
        conn.close()

    def get_game_session(self, session_id: int) -> Optional[Dict]:
        """Get game session by ID"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('SELECT * FROM game_sessions WHERE id = %s', (session_id,))
        session = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(session) if session else None

    # Painted Images
    def save_painted_image(self, user_id: int, game_session_id: int, image_data: str) -> int:
        """Save a painted mandala image"""
        conn = self.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO painted_images (user_id, game_session_id, image_data) VALUES (%s, %s, %s) RETURNING id',
            (user_id, game_session_id, image_data)
        )
        image_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return image_id

    def get_user_images(self, user_id: int, limit: int = 10) -> List[Dict]:
        """Get user's painted images"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('''
            SELECT * FROM painted_images
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT %s
        ''', (user_id, limit))
        images = cursor.fetchall()
        cursor.close()
        conn.close()
        return [dict(img) for img in images]

    # User Statistics
    def update_user_statistics(self, user_id: int, game_data: Dict):
        """Update user statistics after a game"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Get current stats
        cursor.execute('SELECT * FROM user_statistics WHERE user_id = %s', (user_id,))
        stats = cursor.fetchone()

        if stats:
            stats = dict(stats)
            total_games = stats['total_games_played'] + 1
            total_regions = stats['total_regions_painted'] + game_data.get('regions_painted', 0)
            total_time = stats['total_play_time_seconds'] + game_data.get('duration_seconds', 0)

            # Calculate new average completion
            avg_completion = ((stats['average_completion_percentage'] * stats['total_games_played']) +
                            game_data.get('completion_percentage', 0)) / total_games

            # Update best time if applicable
            best_time = stats['best_completion_time_seconds']
            if game_data.get('completion_percentage', 0) >= 100:
                if best_time is None or game_data['duration_seconds'] < best_time:
                    best_time = game_data['duration_seconds']

            cursor.execute('''
                UPDATE user_statistics
                SET total_games_played = %s,
                    total_regions_painted = %s,
                    total_play_time_seconds = %s,
                    average_completion_percentage = %s,
                    best_completion_time_seconds = %s,
                    last_played_at = %s
                WHERE user_id = %s
            ''', (total_games, total_regions, total_time, avg_completion,
                  best_time, datetime.now(), user_id))

        conn.commit()
        cursor.close()
        conn.close()

    def get_user_statistics(self, user_id: int) -> Optional[Dict]:
        """Get user statistics"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('SELECT * FROM user_statistics WHERE user_id = %s', (user_id,))
        stats = cursor.fetchone()
        cursor.close()
        conn.close()
        return dict(stats) if stats else None

    def get_leaderboard(self, limit: int = 10) -> List[Dict]:
        """Get leaderboard (top players by completion percentage)"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute('''
            SELECT u.username, s.*
            FROM user_statistics s
            JOIN users u ON s.user_id = u.id
            ORDER BY s.average_completion_percentage DESC, s.total_games_played DESC
            LIMIT %s
        ''', (limit,))
        leaderboard = cursor.fetchall()
        cursor.close()
        conn.close()
        return [dict(row) for row in leaderboard]
