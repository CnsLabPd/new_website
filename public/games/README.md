# Neurogati Games

This directory contains the game files for the Neurogati exergames platform.

## Directory Structure

```
games/
└── mandala-painting/     # Mandala Art Painting Game
    ├── run_local_demo.py        # Python server script
    ├── run_local_demo.command   # macOS launcher
    ├── mode-selector.html       # Game entry point
    ├── demo2.html              # Main game interface
    ├── calibration.html        # Gesture calibration
    └── ...                     # Other game assets
```

## Mandala Art Painting Game

An interactive digital art system featuring:
- Gesture control and mouse input
- Automatic image segmentation
- Single and multiplayer modes
- Save, continue, and share functionality
- Compatible with laptops and large screens

### How to Launch

The game can be launched in two ways:

1. **Through the Website** (Recommended)
   - Navigate to `/exergames/games/mandala-painting`
   - Click the "Play Game" button
   - The API route will automatically start the Python server
   - Game opens in a new window at http://localhost:8080

2. **Manually**
   - Double-click `run_local_demo.command` (macOS)
   - Or run: `python3 run_local_demo.py`
   - Server starts on port 8080 (or next available port)
   - Browser opens automatically

### Requirements

- Python 3.x installed on the system
- Modern web browser with JavaScript enabled
- For gesture control: Compatible webcam

### Technical Details

The game runs on a local HTTP server (default port 8080) to handle:
- CORS requirements
- Local file access
- Template image uploads
- Multiplayer websocket connections

The server automatically shuts down when the browser window is closed (after 5 seconds of no heartbeat).

## Adding New Games

To add a new game:

1. Create a directory under `public/games/[game-name]`
2. Add game files and launcher scripts
3. Create a page at `app/exergames/games/[game-name]/page.tsx`
4. Update the exergames landing page to link to the new game
5. Add API route support if the game requires server functionality
