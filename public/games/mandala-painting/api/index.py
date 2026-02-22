# Vercel Serverless Function Entry Point for Painting Game
# Deployment verification test - trigger auto-deploy
import sys
import os
from pathlib import Path
from flask import Flask, jsonify

print("=" * 80)
print("🚀 VERCEL FUNCTION INITIALIZING...")
print(f"📁 Current dir: {Path(__file__).parent}")
print(f"📁 Parent dir: {Path(__file__).parent.parent}")
print(f"🔐 DATABASE_URL set: {bool(os.environ.get('DATABASE_URL'))}")
print("=" * 80)

# Add parent directory to path so we can import from server/
current_dir = Path(__file__).parent
parent_dir = current_dir.parent
sys.path.insert(0, str(parent_dir))

print(f"🔍 Python path: {sys.path[:3]}")

# Check for required environment variables
if not os.environ.get('DATABASE_URL'):
    print("❌ ERROR: DATABASE_URL environment variable not set!")
    print("⚠️  Please add DATABASE_URL in Vercel dashboard:")
    print("   Settings → Environment Variables")
    print("   Add your Neon PostgreSQL connection string")

    # Create a minimal Flask app that shows the error
    app = Flask(__name__)

    @app.route('/api/<path:path>', methods=['GET', 'POST', 'OPTIONS'])
    @app.route('/heartbeat', methods=['GET'])
    def missing_database_error(path=''):
        return jsonify({
            'error': 'Database not configured',
            'message': 'DATABASE_URL environment variable is not set. Please configure it in Vercel dashboard.',
            'instructions': [
                '1. Go to Vercel project settings',
                '2. Navigate to Environment Variables',
                '3. Add DATABASE_URL with your Neon PostgreSQL connection string',
                '4. Redeploy the project'
            ]
        }), 503  # Service Unavailable

    print("⚠️  Created error handler for missing DATABASE_URL")
    print("=" * 80)

else:
    # Try to import Flask app with error handling
    try:
        print("📦 Attempting to import Flask app...")
        from server.api_server_production import app as flask_app
        print("✅ Flask app imported successfully!")

        # Debug: Print all registered routes
        print("🔍 FLASK ROUTES REGISTERED:")
        for rule in flask_app.url_map.iter_rules():
            methods = ','.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
            print(f"  {rule.rule:50} [{methods}]")
        print("=" * 80)

        # Export the Flask app
        app = flask_app

    except Exception as e:
        print(f"❌ ERROR IMPORTING FLASK APP: {e}")
        print(f"❌ Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()

        # Create a minimal Flask app that shows the error
        app = Flask(__name__)

        @app.route('/api/<path:path>', methods=['GET', 'POST', 'OPTIONS'])
        @app.route('/heartbeat', methods=['GET'])
        def error_handler(path=''):
            return jsonify({
                'error': 'Function failed to load',
                'message': str(e),
                'type': type(e).__name__,
                'traceback': traceback.format_exc()
            }), 500

        print("⚠️  Created fallback error handler app")
        print("=" * 80)
