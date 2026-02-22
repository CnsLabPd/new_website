# Audio Balloon Pop Game 🎈

An accessible, audio-based balloon popping game using hand gesture tracking and 3D spatial audio. Designed for everyone, including visually impaired players.

## Features

- **3D Spatial Audio**: Immersive sound positioning using HRTF technology
- **Hand Gesture Controls**: Track balloons using webcam-based hand tracking
- **Multiple Game Modes**: 4 challenging balloon shooting levels
- **Progressive Difficulty**: From moving targets to bomb dodging challenges

## Project Structure

```
Balloon_game/
├── index.html              # Main game entry point
├── login.html              # User authentication page
├── README.md               # This file
├── assets/                 # Game assets
│   ├── audio/              # Sound effects and music
│   ├── backgrounds/        # Video backgrounds
│   └── images/             # Branding images
├── src/                    # Source code
│   ├── core/               # Core game systems
│   │   ├── audio_utils.js  # 3D audio engine
│   │   ├── audio_prompts.js # Voice assistance
│   │   ├── auth.js         # Authentication manager
│   │   └── levels.js       # Level configuration
│   └── levels/             # Individual level implementations
│       ├── level6.js       # Floating Hunter
│       ├── level7.js       # Bomb Dodger
│       ├── level8.js       # Multi-Balloon Rush
│       └── level9.js       # Bomb Field Challenge
├── server/                 # Backend API server
│   ├── api_server.py       # Development server
│   ├── api_server_production.py # Production server
│   ├── database.py         # SQLite database
│   └── database_postgres.py # PostgreSQL database
└── Documentation files (*.md)

```

## How to Run the Game Locally

### Prerequisites

- Python 3.11 or higher
- Modern web browser (Chrome, Edge, or Firefox recommended)
- Webcam for hand tracking

### Step 1: Install Dependencies

```bash
cd /path/to/Balloon_game
pip3 install -r server/requirements.txt
```

### Step 2: Start the Local Server

```bash
python3 server/api_server.py
```

You should see:
```
🎮 Balloon Game API Server
🚀 Server running at http://localhost:8080/
📊 Database: SQLite
```

### Step 3: Open the Game

Open your web browser and visit:
```
http://localhost:8080/
```

The game will automatically open the login page. Create an account to track your progress and compete on leaderboards!

### Step 4: Stop the Server

Press `Ctrl+C` in the terminal to stop the server when you're done playing.

## Game Levels

### Module 1: Balloon Shooting Games (4 Levels)

**Level 1: Floating Hunter**
- Pop 15 moving balloons with physics-based movement
- 3-minute time limit
- Track beeping sounds as balloons float around
- 200 points per balloon

**Level 2: Bomb Dodger (Expert)**
- Pop 10 balloons while avoiding a moving bomb
- Progressive difficulty - speed increases per balloon
- Bomb freezes for 3 seconds when you pop a balloon
- Lose 300 points if you hit the bomb
- 4-minute time limit

**Level 3: Multi-Balloon Rush**
- 10 balloons spawn at once across the screen
- Speed challenge mode
- 2-minute time limit
- Random spread positioning

**Level 4: Bomb Field Challenge (Ultimate)**
- 10 balloons + 1 bomb spawn simultaneously
- Lives system: Start with 4 lives
- Lose 1 life per bomb hit (no score penalty)
- Game over when lives = 0
- 2-minute time limit

## Troubleshooting

### "Python not found" error
Install Python 3 from [python.org](https://www.python.org/downloads/)

After installation, verify:
```bash
python3 --version
```

### Port 8080 already in use
If you see "Address already in use", either:
- Stop the other process using port 8080
- Or edit `server/api_server.py` and change PORT to a different number (e.g., 8081)

### Database errors
If you encounter database errors, delete `server/balloon_game.db` and restart the server. It will create a fresh database automatically.

### Game assets not loading
Make sure you're running the server from the project root directory (where `index.html` is located), not from inside the `server/` folder.

### Camera/hand tracking not working
- Allow camera permissions when prompted
- Use Chrome, Edge, or Firefox (Safari may have issues)
- Ensure good lighting for hand tracking

## 🚀 Deploying to the Web

Want to share your game with the world? Deploy it for FREE with full authentication and leaderboards!

### Quick Deployment (15 minutes)

1. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

2. **Deploy to Render** (recommended, FREE):
   - Go to https://render.com
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Click "Create Web Service"
   - Your game will be live in 5 minutes!

3. **Get your URL**:
   ```
   https://balloon-game-xxxx.onrender.com
   ```

For detailed step-by-step instructions, see **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

### Deployment Options

| Platform | Cost | Setup Time | Best For |
|----------|------|------------|----------|
| **Render** | FREE | 15 min | **Recommended** - Full features |
| **Railway** | FREE | 10 min | Alternative option |
| **PythonAnywhere** | FREE | 20 min | Python-focused |

All options include:
- ✅ User authentication
- ✅ Leaderboards
- ✅ Progress tracking
- ✅ HTTPS/SSL
- ✅ SQLite database

## Technical Details

- **Audio**: Web Audio API with HRTF spatial positioning
- **Hand Tracking**: MediaPipe Hands
- **Physics**: Matter.js physics engine
- **Server**: Custom Python HTTP server with heartbeat monitoring
- **Frontend**: Vanilla JavaScript, no build tools required
- **Backend**: Flask API with SQLite database (optional for deployment)
- **Production**: Gunicorn WSGI server for production deployments
