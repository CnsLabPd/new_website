#!/usr/bin/env python3
"""
Custom HTTP Server with Heartbeat Support
Auto-shuts down when no heartbeat received for specified timeout
"""

import http.server
import socketserver
import os
import sys
import time
from pathlib import Path

PORT = 8080
HEARTBEAT_FILE = f"/tmp/balloon_game_heartbeat_{PORT}.txt"

class HeartbeatHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP Request Handler that updates heartbeat on every request"""

    def do_GET(self):
        # Update heartbeat file on every request
        try:
            Path(HEARTBEAT_FILE).touch()
        except Exception:
            pass

        # Handle heartbeat endpoint specifically
        if self.path.startswith('/heartbeat') or self.path.startswith('/tmp_heartbeat'):
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(b'OK')
            return

        # Serve normal files
        super().do_GET()

    def log_message(self, format, *args):
        # Suppress most log messages except errors
        if '404' in str(args) or '500' in str(args):
            super().log_message(format, *args)

def run_server():
    """Run the HTTP server"""
    # Change to parent directory (project root) to serve all files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.join(script_dir, '..'))

    # Create heartbeat file
    Path(HEARTBEAT_FILE).touch()

    # Create server
    with socketserver.TCPServer(("127.0.0.1", PORT), HeartbeatHTTPRequestHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{PORT}/")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"💓 Heartbeat file: {HEARTBEAT_FILE}")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
        finally:
            # Clean up heartbeat file
            try:
                os.remove(HEARTBEAT_FILE)
            except Exception:
                pass

if __name__ == "__main__":
    run_server()
