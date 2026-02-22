# Vercel Serverless Function Entry Point for SonicDrive
# Last deployment trigger: 2026-02-15 (attempt 3)
import sys
import os
from pathlib import Path
from flask import Flask, jsonify

print("=" * 80)
print("🚀 VERCEL FUNCTION INITIALIZING...")
print(f"📁 Current dir: {Path(__file__).parent}")
print(f"📁 Parent dir: {Path(__file__).parent.parent}")
print("=" * 80)

# Add parent directory to path so we can import from server/
current_dir = Path(__file__).parent
parent_dir = current_dir.parent
sys.path.insert(0, str(parent_dir))

print(f"🔍 Python path: {sys.path[:3]}")

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
    def error_handler(path):
        return jsonify({
            'error': 'Function failed to load',
            'message': str(e),
            'type': type(e).__name__,
            'path': path
        }), 500

    print("⚠️  Created fallback error handler app")
    print("=" * 80)
