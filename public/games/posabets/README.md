# 🚀 Posabets

An interactive, AI-powered alphabet learning game where kids form letters with their body poses! Built with MediaPipe pose detection and TensorFlow.js.

## 🎮 Quick Start

### Windows
Double-click **`start-game.bat`** to launch the game!

### Mac
**Getting "file is damaged" error? Run `mac-setup.command` first!**
1. Right-click **`mac-setup.command`** → "Open" → Confirm
2. Wait for "Setup complete!"
3. Then double-click **`start-game.command`** to play!

### Need Help?
- **Mac "file is damaged" error:** See [MAC-SHARING-GUIDE.md](MAC-SHARING-GUIDE.md) or [START-HERE-MAC.txt](START-HERE-MAC.txt)
- **Windows users:** Check start-game.bat for built-in troubleshooting
- **All platforms:** See README sections below

---

## 🌟 Features

### Three Game Modes
- **🚀 Training Mode**: Free practice of any letter at your own pace
- **🌟 Letter Mission**: Progressive A-Z learning with star rewards
- **🪐 Word Explorer**: Spell complete words by forming letters in sequence

### Kid-Friendly Design
- Beautiful space-themed interface with animations
- Encouraging feedback and positive reinforcement
- Personalized player name and avatar
- Star-based reward system
- Unlockable badges and achievements
- Progress tracking and parent dashboard

### Technical Highlights
- Real-time pose detection using MediaPipe
- Neural network model for alphabet recognition
- Local storage for progress persistence
- Responsive design for tablets and computers
- No backend required - runs completely in the browser!

## 📁 Project Structure

```
alphabet-pose-game/
├── index.html                          # Entry point
├── config.js                           # Game configuration
├── README.md                           # This file
│
├── assets/
│   └── models/
│       └── rohit_model3.json          # Your trained AI model
│
├── css/
│   ├── main.css                       # Global styles
│   ├── animations.css                 # Fun animations
│   └── components.css                 # UI components
│
├── js/
│   ├── core/
│   │   ├── ModelLoader.js            # AI model management
│   │   ├── PoseDetector.js           # MediaPipe integration
│   │   └── GameEngine.js             # Main game logic
│   │
│   ├── utils/
│   │   ├── storage.js                # Local storage wrapper
│   │   ├── audio.js                  # Sound effects
│   │   └── constants.js              # Game constants
│   │
│   └── ... (other modules)
│
└── pages/
    ├── welcome.html                   # Name input screen
    ├── dashboard.html                 # Mission control
    ├── game.html                      # Main game page
    └── parent.html                    # Parent dashboard
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.6+** (check: `python3 --version`)
- **Modern web browser** (Chrome, Firefox, Edge, Safari)
- **Webcam** (for pose detection)

### Quick Start

1. **Navigate to the project directory**:
   ```bash
   cd alphabet-pose-game_latest
   ```

2. **Start the server**:
   ```bash
   python3 server.py
   ```

   That's it! The browser will open automatically. 🎉

3. **Allow camera permissions** when prompted

4. **Enter your name** and start playing!

### Advanced Options

```bash
# Start on a custom port
python3 server.py --port 3000

# Don't open browser automatically
python3 server.py --no-browser

# Combine options
python3 server.py --port 3000 --no-browser
```

For more details, see [QUICKSTART.md](QUICKSTART.md)

### Alternative Methods

**Using Python directly** (no cache control):
```bash
python3 -m http.server 8000
```

**Using Node.js**:
```bash
npx http-server -p 8000 -c-1
```

**Using VS Code Live Server**:
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## 🎮 How to Play

1. **Stand in front of the camera** so your full body is visible
2. **Form the target letter** shown on screen using your body
3. **Hold the pose** for 2 seconds (progress bar will fill)
4. **Earn stars** and unlock badges!

### Tips for Best Results
- Ensure good lighting
- Stand 6-8 feet from the camera
- Wear contrasting clothing
- Keep your full body in frame
- Try to match the letter shape as closely as possible

## 🎯 Game Modes Explained

### 🚀 Training Mode
- **Purpose**: Practice any letter without pressure
- **Rewards**: 10 stars per successful pose
- **Best for**: Learning new letters, warming up

### 🌟 Letter Mission
- **Purpose**: Master all 26 letters progressively
- **Rewards**: 100 stars (1st try), 75 (2nd), 50 (3rd)
- **Attempts**: 3 tries per letter
- **Best for**: Systematic alphabet learning

### 🪐 Word Explorer
- **Purpose**: Spell 3-letter words
- **Rewards**: Letter stars + 200 bonus for complete word
- **Best for**: Advanced players, vocabulary building

## 🏆 Badges & Achievements

- **Rookie Astronaut**: Complete your first letter
- **Space Cadet**: Master 10 letters
- **Alphabet Commander**: Master all 26 letters
- **Word Explorer**: Spell your first word
- **Word Wizard**: Spell 10 words
- **Cosmic Champion**: Get 5 letters perfect in a row

## 👨‍👩‍👧 Parent Dashboard

Access detailed progress tracking:
- Total stars earned
- Letters completed (out of 26)
- Words spelled
- Badges earned
- Last played date
- Visual alphabet progress grid
- Export progress data (JSON)
- Reset progress option

## ⚙️ Configuration

Edit `config.js` to customize:
- Minimum confidence threshold
- Hold time duration
- Reward points
- Badge definitions
- Word list for Word Explorer
- Encouragement messages
- Theme colors

## 🔧 Technical Details

### AI Model
- **Type**: Neural Network (TensorFlow.js)
- **Input**: Body pose landmarks (33 points)
- **Output**: 26 letters (A-Z)
- **Features**: Normalized coordinates, distances, angles

### Dependencies
- **MediaPipe Pose**: Real-time pose detection
- **TensorFlow.js**: Neural network inference
- **No external frameworks**: Vanilla JavaScript

### Browser Requirements
- ES6 modules support
- WebRTC (for camera)
- LocalStorage
- Web Audio API (for sounds)

## 🐛 Troubleshooting

### Camera not working
- Check browser permissions
- Ensure HTTPS or localhost
- Try different browser
- Check camera isn't used by another app

### Model not loading
- Verify `rohit_model3.json` is in `assets/models/`
- Check browser console for errors
- Ensure web server is running

### Poses not recognized
- Improve lighting
- Stand further from camera
- Keep full body in frame
- Try exaggerating the letter shape

### Slow performance
- Close other tabs/applications
- Try a less complex model
- Reduce video resolution in config

## 🎨 Customization Ideas

1. **Add more words**: Edit `CONFIG.WORDS` in `config.js`
2. **Change colors**: Modify CSS variables in `css/main.css`
3. **Add sound effects**: Place audio files in `assets/sounds/`
4. **Create new badges**: Add to `CONFIG.BADGES`
5. **Adjust difficulty**: Change `MIN_CONFIDENCE` and `HOLD_TIME`

## 📊 Data Storage

All progress is saved locally using `localStorage`:
- Player name and avatar
- Letters completed
- Words spelled
- Total stars
- Badges earned
- Current streak

No data is sent to any server - completely private!

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Share the URL!

### Netlify/Vercel
1. Connect repository
2. Deploy with default settings
3. Automatic HTTPS enabled

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- MediaPipe by Google for pose detection
- TensorFlow.js team for browser ML
- All the kids who will learn with this game!

## 📧 Support

For issues or questions, check the browser console for error messages and ensure all prerequisites are met.

---

**Made with ❤️ for young space cadets learning their ABCs!** 🚀✨
