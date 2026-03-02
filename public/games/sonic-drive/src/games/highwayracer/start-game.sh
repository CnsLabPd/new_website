#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Start the server and open browser
echo "Starting Audio Racing Game..."
echo "Server running at http://localhost:8000"
echo "Opening browser..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Open browser (macOS)
open http://localhost:8000

# Start Python server
python3 -m http.server 8000
