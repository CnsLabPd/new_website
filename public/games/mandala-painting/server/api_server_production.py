#!/usr/bin/env python3
"""
Flask API Server for Painting Game - PRODUCTION VERSION
Handles user authentication and game progress tracking
Configured for production deployment on Render.com
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

# Get absolute paths to ensure correct static file serving
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)

app = Flask(__name__, static_folder=ROOT_DIR, static_url_path='')

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": "*",  # In production, replace with your actual domain
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
# Pass db_path to ensure it's in the server directory
db_path = os.path.join(BASE_DIR, 'painting_game.db')
db = Database(db_path=db_path)

# Session expiration (7 days)
SESSION_DURATION = timedelta(days=7)


def hash_password(password):
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password, password_hash):
    """Verify a password against a hash"""
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_session_token():
    """Generate a unique session token"""
    return str(uuid.uuid4())


# ============= AUTHENTICATION ENDPOINTS =============

@app.route('/api/signup', methods=['POST'])
def signup():
    """Register a new user"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Safely handle potential null/None values from client
        username = (data.get('username') or '').strip()
        password = data.get('password') or ''
        email = (data.get('email') or '').strip() or None

        # Validation
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400

        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        # Check if user exists
        existing_user = db.get_user_by_username(username)
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409

        # Create user
        password_hash = hash_password(password)
        user_id = db.create_user(username, password_hash, email)

        if user_id is None:
            return jsonify({'error': 'Failed to create user'}), 500

        # Create session
        session_token = generate_session_token()
        expires_at = datetime.now() + SESSION_DURATION
        db.create_session(user_id, session_token, expires_at)
        db.update_last_login(user_id)

        return jsonify({
            'success': True,
            'message': 'User created successfully',
            'session_token': session_token,
            'user_id': user_id,
            'username': username
        }), 201

    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/login', methods=['POST'])
def login():
    """Login a user"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Safely handle potential null/None values from client
        username = (data.get('username') or '').strip()
        password = data.get('password') or ''

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
        session_token = generate_session_token()
        expires_at = datetime.now() + SESSION_DURATION
        db.create_session(user['id'], session_token, expires_at)
        db.update_last_login(user['id'])

        return jsonify({
            'success': True,
            'message': 'Login successful',
            'session_token': session_token,
            'user_id': user['id'],
            'username': user['username']
        }), 200

    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/logout', methods=['POST'])
def logout():
    """Logout a user"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid authorization header'}), 401

        session_token = auth_header[7:]  # Remove 'Bearer ' prefix
        db.delete_session(session_token)

        return jsonify({'success': True, 'message': 'Logged out successfully'}), 200

    except Exception as e:
        print(f"Logout error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/verify-session', methods=['GET'])
def verify_session():
    """Verify if a session is valid"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'valid': False, 'error': 'Missing or invalid authorization header'}), 401

        session_token = auth_header[7:]
        session = db.get_session(session_token)

        if not session:
            return jsonify({'valid': False, 'error': 'Invalid or expired session'}), 401

        user = db.get_user_by_id(session['user_id'])
        if not user:
            return jsonify({'valid': False, 'error': 'User not found'}), 404

        return jsonify({
            'valid': True,
            'user_id': user['id'],
            'username': user['username']
        }), 200

    except Exception as e:
        print(f"Session verification error: {e}")
        return jsonify({'valid': False, 'error': 'Internal server error'}), 500


# ============= GAME ENDPOINTS =============

@app.route('/api/game/start', methods=['POST'])
def start_game():
    """Start a new game session"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401

        session_token = auth_header[7:]
        session = db.get_session(session_token)

        if not session:
            return jsonify({'error': 'Invalid or expired session'}), 401

        # Create game session
        game_session_id = db.create_game_session(session['user_id'])

        return jsonify({
            'success': True,
            'game_session_id': game_session_id
        }), 201

    except Exception as e:
        print(f"Start game error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/game/complete', methods=['POST'])
def complete_game():
    """Complete a game session and save progress"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401

        session_token = auth_header[7:]
        session = db.get_session(session_token)

        if not session:
            return jsonify({'error': 'Invalid or expired session'}), 401

        data = request.get_json()
        game_session_id = data.get('game_session_id')
        regions_painted = data.get('regions_painted', 0)
        completion_percentage = data.get('completion_percentage', 0.0)
        duration_seconds = data.get('duration_seconds', 0)
        image_data = data.get('image_data')  # Base64 encoded image

        if not game_session_id:
            return jsonify({'error': 'game_session_id is required'}), 400

        # Update game session
        db.update_game_session(
            game_session_id,
            regions_painted,
            completion_percentage,
            duration_seconds
        )

        # Save painted image if provided
        image_id = None
        if image_data:
            image_id = db.save_painted_image(
                session['user_id'],
                game_session_id,
                image_data
            )

        # Update user statistics
        game_data = {
            'regions_painted': regions_painted,
            'completion_percentage': completion_percentage,
            'duration_seconds': duration_seconds
        }
        db.update_user_statistics(session['user_id'], game_data)

        return jsonify({
            'success': True,
            'message': 'Game completed successfully',
            'image_id': image_id
        }), 200

    except Exception as e:
        print(f"Complete game error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/user/statistics', methods=['GET'])
def get_user_statistics():
    """Get user statistics"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401

        session_token = auth_header[7:]
        session = db.get_session(session_token)

        if not session:
            return jsonify({'error': 'Invalid or expired session'}), 401

        stats = db.get_user_statistics(session['user_id'])

        if not stats:
            return jsonify({'error': 'Statistics not found'}), 404

        return jsonify({
            'success': True,
            'statistics': stats
        }), 200

    except Exception as e:
        print(f"Get statistics error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/user/images', methods=['GET'])
def get_user_images():
    """Get user's painted images"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401

        session_token = auth_header[7:]
        session = db.get_session(session_token)

        if not session:
            return jsonify({'error': 'Invalid or expired session'}), 401

        limit = request.args.get('limit', 10, type=int)
        images = db.get_user_images(session['user_id'], limit)

        return jsonify({
            'success': True,
            'images': images
        }), 200

    except Exception as e:
        print(f"Get images error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get leaderboard"""
    try:
        limit = request.args.get('limit', 10, type=int)
        leaderboard = db.get_leaderboard(limit)

        return jsonify({
            'success': True,
            'leaderboard': leaderboard
        }), 200

    except Exception as e:
        print(f"Get leaderboard error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# ============= STATIC FILE SERVING =============

@app.route('/')
def serve_index():
    """Serve the index page"""
    return send_from_directory(ROOT_DIR, 'index.html')


@app.route('/game.html')
def serve_game():
    """Serve the game page"""
    return send_from_directory(ROOT_DIR, 'game.html')

@app.route('/login.html')
def serve_login():
    """Serve the login page"""
    return send_from_directory(ROOT_DIR, 'login.html')


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory(ROOT_DIR, path)


# ============= HEALTH CHECK =============

@app.route('/heartbeat', methods=['GET'])
def heartbeat():
    """Health check endpoint for Render"""
    return 'OK', 200


# ============= RUN SERVER =============

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    debug = os.environ.get('FLASK_ENV') == 'development'

    print(f"🚀 Starting Painting Game API Server on port {port}")
    print(f"📊 Debug mode: {debug}")

    app.run(host='0.0.0.0', port=port, debug=debug)
