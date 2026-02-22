#!/usr/bin/env python3
"""
Spin up a local HTTP server for the Mandala Painting game and open it in the browser.

Usage:
    Double-click this file or run `python3 run_local_demo.py`.
"""

from __future__ import annotations

import contextlib
import http.server
import os
import socket
import sys
import threading
import time
import webbrowser
from pathlib import Path
from urllib.parse import urlparse

DEFAULT_PORT = 8080
MAX_PORT_SEARCH = 20
ENTRY_PAGE = "mode-selector.html"
HEARTBEAT_TIMEOUT = 5  # Seconds without heartbeat before shutting down


def find_open_port(start_port: int) -> int:
    """Return the first available TCP port starting from start_port."""
    for port in range(start_port, start_port + MAX_PORT_SEARCH):
        with contextlib.closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            try:
                sock.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError(f"No open port found in range {start_port}-{start_port + MAX_PORT_SEARCH - 1}.")


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler that disables caching for development."""

    last_heartbeat = None  # Class variable to track last heartbeat time

    def end_headers(self):
        # Add no-cache headers to prevent browser caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        """Handle GET requests, including the heartbeat endpoint."""
        parsed_path = urlparse(self.path)

        # Handle heartbeat endpoint
        if parsed_path.path == '/heartbeat':
            NoCacheHTTPRequestHandler.last_heartbeat = time.time()
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b'OK')
            return

        # Handle normal file requests
        super().do_GET()


def run_server(port: int) -> http.server.ThreadingHTTPServer:
    """Create and start the HTTP server in a background thread."""
    handler = NoCacheHTTPRequestHandler
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)

    thread = threading.Thread(target=httpd.serve_forever, name="LocalHTTPServer", daemon=True)
    thread.start()
    return httpd


def main() -> int:
    project_root = Path(__file__).resolve().parent
    os.chdir(project_root)

    try:
        port = find_open_port(DEFAULT_PORT)
    except RuntimeError as exc:
        print(f"[ERROR] {exc}")
        return 1

    server = run_server(port)
    url = f"http://localhost:{port}/{ENTRY_PAGE}"

    print(f"[INFO] Serving {project_root} at http://localhost:{port}")

    # Check if we should auto-open browser (only when run directly, not via API)
    should_open_browser = '--no-browser' not in sys.argv

    if should_open_browser:
        print(f"[INFO] Opening {url} in your default browser...")
        print(f"[INFO] Server will auto-close {HEARTBEAT_TIMEOUT} seconds after browser is closed.")
        # Give the server a moment before opening the browser.
        time.sleep(0.5)
        webbrowser.open(url, new=1, autoraise=True)
    else:
        print(f"[INFO] Game available at: {url}")
        print(f"[INFO] Server will auto-close {HEARTBEAT_TIMEOUT} seconds after browser is closed.")
        print(f"[INFO] Browser auto-open disabled.")

    try:
        # Monitor heartbeats and auto-shutdown if browser is closed
        while True:
            time.sleep(1)

            # Check if we've received at least one heartbeat and if it's timed out
            if (NoCacheHTTPRequestHandler.last_heartbeat is not None and
                time.time() - NoCacheHTTPRequestHandler.last_heartbeat > HEARTBEAT_TIMEOUT):
                print("\n[INFO] Browser closed detected. Shutting down server...")
                break
    except KeyboardInterrupt:
        print("\n[INFO] Shutting down server...")
    finally:
        server.shutdown()
        server.server_close()
        print("[INFO] Server stopped.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
