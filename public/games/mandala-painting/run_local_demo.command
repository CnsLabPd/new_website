#!/bin/bash
#
# Convenience launcher for the gesture painting demo.
# Double-click this file in Finder to start the local server and open the browser.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

exec python3 run_local_demo.py
