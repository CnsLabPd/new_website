#!/usr/bin/env python3
"""
Simple HTTP Server for Posabets - Alphabet Pose Game
Serves static files with proper caching headers for optimal performance.
Supports command-line options for port and browser control.
"""

import http.server
import socketserver
import webbrowser
import argparse
import os
import sys
from threading import Timer

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler that serves files without caching for development"""

    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Enable CORS for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        """Handle GET requests"""
        # Serve index.html for root path
        if self.path == '/' or self.path == '':
            self.path = '/index.html'

        # Ensure proper MIME types for game assets
        if self.path.endswith('.json'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            try:
                with open(self.path[1:], 'rb') as f:
                    self.wfile.write(f.read())
                return
            except FileNotFoundError:
                pass

        # Default handling for other files
        return super().do_GET()

    def log_message(self, format, *args):
        """Custom logging to show cleaner output"""
        message = format % args
        if "GET" in message and "200" in message:
            # Only show successful file loads for important assets
            if any(ext in message for ext in ['.html', '.js', '.json', '.css']):
                print(f"📁 Served: {message.split()[1]}")
        elif "404" in message:
            print(f"❌ Not found: {message.split()[1]}")
        else:
            print(message)

def open_browser(url, delay=1.5):
    """Open browser after a short delay to ensure server is ready"""
    def _open():
        print(f"🌐 Opening browser at {url}")
        webbrowser.open(url)

    Timer(delay, _open).start()

def main():
    """Main function to start the server"""
    parser = argparse.ArgumentParser(description='Posabets Game Server')
    parser.add_argument('--port', type=int, default=8000, help='Port to run server on (default: 8000)')
    parser.add_argument('--no-browser', action='store_true', help='Don\'t open browser automatically')
    args = parser.parse_args()

    # Ensure we're in the correct directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found in current directory")
        print("   Make sure you're running this from the alphabet-pose-game_latest directory")
        sys.exit(1)

    # Check for essential game files
    essential_files = ['config.js', 'js/core/GameEngine.js', 'assets/models/rohit_model3.json']
    missing_files = [f for f in essential_files if not os.path.exists(f)]

    if missing_files:
        print(f"⚠️  Warning: Missing some game files: {', '.join(missing_files)}")
        print("   The game may not work properly")

    try:
        # Create server
        with socketserver.TCPServer(("", args.port), NoCacheHTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{args.port}"

            print("🚀 Posabets Game Server Starting...")
            print(f"📍 Server running at: {server_url}")
            print("📁 Serving files from:", os.getcwd())

            # Open browser unless disabled
            if not args.no_browser:
                open_browser(server_url)
            else:
                print(f"🌐 Open your browser to: {server_url}")

            print("🎮 Game ready! Make sure to allow camera permissions when prompted.")
            print("⏹️  Press Ctrl+C to stop the server")
            print("-" * 60)

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for playing Posabets!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {args.port} is already in use.")
            print(f"   Try a different port: python3 server.py --port {args.port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()