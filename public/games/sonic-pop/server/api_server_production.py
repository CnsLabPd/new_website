#!/usr/bin/env python3
"""
Flask API Server for Balloon Game - PRODUCTION VERSION
Handles user authentication and progress tracking
Configured for production deployment on Render.com or similar platforms
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import bcrypt
import uuid
from datetime import datetime, timedelta
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(__file__))

# Auto-detect database type based on environment
# Use PostgreSQL if DATABASE_URL is set, otherwise use SQLite (for local dev)
if os.environ.get('DATABASE_URL'):
    print("🐘 Using PostgreSQL database")
    from database_postgres import Database
else:
    print("📁 Using SQLite database (local development)")
    from database import Database

app = Flask(__name__, static_folder='..', static_url_path='')

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # In production, replace with your actual domain
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
db = Database()

# Session expiration (7 days)
SESSION_DURATION = timedelta(days=7)


def hash_password(password):
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password, password_hash):
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_token():
    """Generate a unique session token"""
    return str(uuid.uuid4())


def get_current_user(token):
    """Get current user from session token"""
    if not token:
        return None

    session = db.get_session(token)
    if not session:
        return None

    user = db.get_user_by_id(session['user_id'])
    return user


# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')

        # Validation
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400

        if len(password) < 4:
            return jsonify({'error': 'Password must be at least 4 characters'}), 400

        # Check if username already exists
        existing_user = db.get_user_by_username(username)
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409

        # Create user
        password_hash = hash_password(password)
        user_id = db.create_user(username, password_hash)

        if not user_id:
            return jsonify({'error': 'Failed to create user'}), 500

        # Create session
        token = generate_token()
        expires_at = datetime.now() + SESSION_DURATION
        db.create_session(user_id, token, expires_at)

        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user_id,
                'username': username
            }
        }), 201

    except Exception as e:
        print(f"❌ Registration error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')

        # Validation
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        # Get user
        user = db.get_user_by_username(username)
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        # Verify password
        if not verify_password(password, user['password_hash']):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Create session
        token = generate_token()
        expires_at = datetime.now() + SESSION_DURATION
        db.create_session(user['id'], token, expires_at)

        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user['id'],
                'username': user['username']
            }
        }), 200

    except Exception as e:
        print(f"❌ Login error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/logout', methods=['POST'])
def logout():
    """Logout user"""
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if token:
            db.delete_session(token)

        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"❌ Logout error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/verify', methods=['GET'])
def verify_session():
    """Verify if session token is valid"""
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = get_current_user(token)

        if not user:
            return jsonify({'valid': False}), 401

        return jsonify({
            'valid': True,
            'user': {
                'id': user['id'],
                'username': user['username']
            }
        }), 200

    except Exception as e:
        print(f"❌ Verify error: {e}")
        return jsonify({'error': 'Server error'}), 500


# ============================================================================
# PROGRESS TRACKING ENDPOINTS
# ============================================================================

@app.route('/api/progress', methods=['GET'])
def get_progress():
    """Get all progress for current user"""
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = get_current_user(token)

        if not user:
            return jsonify({'error': 'Unauthorized'}), 401

        progress = db.get_user_progress(user['id'])

        return jsonify({
            'success': True,
            'progress': progress
        }), 200

    except Exception as e:
        print(f"❌ Get progress error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/progress/level/<int:level_number>', methods=['GET'])
def get_level_progress(level_number):
    """Get progress for a specific level"""
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = get_current_user(token)

        if not user:
            return jsonify({'error': 'Unauthorized'}), 401

        progress = db.get_level_progress(user['id'], level_number)

        return jsonify({
            'success': True,
            'progress': progress
        }), 200

    except Exception as e:
        print(f"❌ Get level progress error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/progress/save', methods=['POST'])
def save_progress():
    """Save progress for a level"""
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = get_current_user(token)

        if not user:
            return jsonify({'error': 'Unauthorized'}), 401

        data = request.get_json()
        level_number = data.get('level_number')
        module_number = data.get('module_number')
        score = data.get('score', 0)
        completed = data.get('completed', False)

        # Validation
        if level_number is None or module_number is None:
            return jsonify({'error': 'level_number and module_number are required'}), 400

        # Save progress
        db.save_progress(user['id'], level_number, module_number, score, completed)

        # Get updated progress
        updated_progress = db.get_level_progress(user['id'], level_number)

        return jsonify({
            'success': True,
            'progress': updated_progress
        }), 200

    except Exception as e:
        print(f"❌ Save progress error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/leaderboard/<int:level_number>', methods=['GET'])
def get_leaderboard(level_number):
    """Get top scores for a specific level from all users"""
    try:
        limit = request.args.get('limit', 10, type=int)

        # Get leaderboard (top scores)
        leaderboard = db.get_leaderboard(level_number, limit)

        return jsonify({
            'success': True,
            'level_number': level_number,
            'leaderboard': leaderboard
        }), 200

    except Exception as e:
        print(f"❌ Leaderboard error: {e}")
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/progress/user/<username>/level/<int:level_number>/history', methods=['GET'])
def get_user_level_history(username, level_number):
    """Get score history for a specific user and level"""
    try:
        # Get user by username
        user = db.get_user_by_username(username)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        limit = request.args.get('limit', 50, type=int)

        # Get score history
        score_history = db.get_user_score_history(user['id'], level_number, limit)

        # Get high score
        progress = db.get_level_progress(user['id'], level_number)
        high_score = progress['high_score'] if progress else 0

        return jsonify({
            'success': True,
            'username': username,
            'level_number': level_number,
            'high_score': high_score,
            'scores': score_history
        }), 200

    except Exception as e:
        print(f"❌ Score history error: {e}")
        return jsonify({'error': 'Server error'}), 500


# ============================================================================
# HEARTBEAT ENDPOINTS (for health checks and auto-shutdown feature)
# ============================================================================

@app.route('/heartbeat', methods=['GET', 'POST'])
def heartbeat():
    """Heartbeat endpoint to keep server alive"""
    return 'OK', 200


@app.route('/tmp_heartbeat', methods=['GET', 'POST'])
def tmp_heartbeat():
    """Alternative heartbeat endpoint"""
    return 'OK', 200


# ============================================================================
# STATIC FILE SERVING
# ============================================================================

@app.route('/')
def serve_login():
    """Serve login page as entry point"""
    return send_from_directory('..', 'login.html')


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('..', path)


# ============================================================================
# SERVER STARTUP
# ============================================================================

def cleanup_expired_sessions():
    """Cleanup expired sessions on startup"""
    deleted = db.cleanup_expired_sessions()
    if deleted > 0:
        print(f"🧹 Cleaned up {deleted} expired sessions")


def cleanup_racing_levels():
    """Cleanup racing game levels data (one-time migration)"""
    result = db.cleanup_racing_levels()
    if result['progress_deleted'] > 0 or result['history_deleted'] > 0:
        print(f"🏎️ Removed racing game data: {result['progress_deleted']} progress records, {result['history_deleted']} history records")


if __name__ == '__main__':
    print("=" * 60)
    print("🎮 Balloon Game API Server - PRODUCTION MODE")
    print("=" * 60)

    # Cleanup old sessions
    cleanup_expired_sessions()

    # Cleanup racing game levels (Module 2 removed)
    cleanup_racing_levels()

    # Get port from environment variable (required for Render, Heroku, etc.)
    PORT = int(os.environ.get('PORT', 10000))

    # Start server
    print(f"🚀 Server starting on port {PORT}")
    if hasattr(db, 'db_path'):
        print(f"📊 Database: {db.db_path} (SQLite)")
    elif hasattr(db, 'database_url'):
        # Don't print full URL (contains password), just show type
        print(f"📊 Database: PostgreSQL (connected)")
    print("=" * 60)

    # Bind to 0.0.0.0 to allow external connections
    # Use gunicorn in production for better performance
    app.run(host='0.0.0.0', port=PORT, debug=False)
