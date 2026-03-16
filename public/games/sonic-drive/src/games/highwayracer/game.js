// ==========================================
// GAME LOGIC MODULE
// ==========================================

console.log('🏁 [RACING GAME] game.js module loading...');

const timestamp = Date.now();
console.log('🏁 [RACING GAME] Importing modules with timestamp:', timestamp);

const audioModule = await import(`./audioEngine.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] audioEngine.js imported');

const graphicsModule = await import(`./graphics.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] graphics.js imported');

const gestureModule = await import(`./gestureController.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] gestureController.js imported');

const AudioEngine = audioModule.AudioEngine;
const GraphicsEngine = graphicsModule.GraphicsEngine;
const GestureController = gestureModule.GestureController;

console.log('🏁 [RACING GAME] All modules imported successfully');

export class Game {
  constructor() {
    console.log('🏁 [RACING GAME] Game constructor called');

    this.canvas = document.getElementById('gameCanvas');
    console.log('🏁 [RACING GAME] Canvas element:', this.canvas);

    this.ctx = this.canvas.getContext('2d');
    console.log('🏁 [RACING GAME] Canvas context:', this.ctx);

    // ===  READ LEVEL CONFIG FROM URL ===
    const urlParams = new URLSearchParams(window.location.search);
    this.gameLevel = parseInt(urlParams.get('level')) || 2; // Default to level 2 (3-lane)

    // Set number of lanes based on level
    if (this.gameLevel === 1) {
      this.numLanes = 2; // Level 1: 2 lanes
    } else if (this.gameLevel === 2) {
      this.numLanes = 3; // Level 2: 3 lanes
    } else if (this.gameLevel === 3) {
      this.numLanes = 4; // Level 3: 4 lanes
    } else {
      this.numLanes = 3; // Default: 3 lanes
    }

    console.log(`🎮 [RACING GAME] Highway Racer - Level ${this.gameLevel} (${this.numLanes} lanes)`);

    // Initialize with default lane positions (will be updated after layout completes)
    if (this.numLanes === 2) {
      this.LANE_POSITIONS = [200, 600];
    } else if (this.numLanes === 3) {
      this.LANE_POSITIONS = [200, 400, 600];
    } else if (this.numLanes === 4) {
      this.LANE_POSITIONS = [150, 300, 450, 600];
    }

    // Make canvas responsive to window size
    // Use requestAnimationFrame to ensure CSS layout is complete
    requestAnimationFrame(() => {
      this.resizeCanvas();
      // Call again to ensure it's fully calculated
      requestAnimationFrame(() => this.resizeCanvas());
    });
    window.addEventListener('resize', () => this.resizeCanvas());

    // Initialize graphics engine (wait for PIXI to be available)
    this.initGraphics();

    // UI Elements
    this.speedDisplay = document.getElementById('speedDisplay');
    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.laneDisplay = document.getElementById('laneDisplay');
    this.distanceDisplay = document.getElementById('distanceDisplay');
    this.gearDisplay = document.getElementById('gearDisplay');
    this.rpmDisplay = document.getElementById('rpmDisplay');
    this.difficultyDisplay = document.getElementById('difficultyDisplay');
    this.startBtn = document.getElementById('startBtn');
    this.exitBtn = document.getElementById('exitBtn');
    this.gameOverDiv = document.getElementById('gameOver');
    this.finalScoreSpan = document.getElementById('finalScore');

    // REMOVED Matter.js - not needed for simple position-based movement
    // Using lightweight object-based vehicle tracking instead

    // Game constants
    this.MAX_SPEED = 180; // 75% of previous value (240 * 0.75 = 180)
    this.MIN_SPEED = 0;
    this.ACCEL_RATE = 1.2;
    this.DECEL_RATE = 1.8;
    this.BRAKE_RATE = 3.0;
    this.DRAG = 0.3;
    // LANE_POSITIONS now set at top of constructor and updated by resizeCanvas()

    // Progressive difficulty settings - MORE AGGRESSIVE
    this.BASE_SPAWN_INTERVAL = 1600; // Starting spawn interval (ms) - faster start
    this.MIN_SPAWN_INTERVAL = 500;   // Minimum spawn interval at high distances - even faster
    this.BASE_MAX_CARS = 3;          // Starting max cars on screen
    this.MAX_MAX_CARS = 10;          // Maximum cars allowed at high distances - more cars
    this.DIFFICULTY_MILESTONE = 300; // Distance (meters) per difficulty increase - faster progression

    // NEW: Smart traffic management
    this.lastSpawnedLane = -1;       // Track last spawned lane to avoid clustering
    this.guaranteedEscapeTimer = 0;  // Timer to guarantee escape routes
    this.ESCAPE_GUARANTEE_INTERVAL = 5000; // Guarantee escape route every 5 seconds

    // Game state
    this.gameRunning = false;
    this.score = 0;
    this.distance = 0;
    // Start in leftmost lane for 2-lane, center lanes for 3-lane and 4-lane
    if (this.numLanes === 2) {
      this.currentLane = 0; // LEFT lane
    } else if (this.numLanes === 3) {
      this.currentLane = 1; // CENTER lane
    } else if (this.numLanes === 4) {
      this.currentLane = 1; // Second lane from left (lane 1 in 0-indexed)
    } else {
      this.currentLane = 1; // Default: center-ish
    }
    this.playerSpeed = 0;
    this.maxSpeed = 0; // Track max speed reached
    this.trafficVehicles = [];
    this.spawnTimer = 0;
    this.lastGear = 1;
    this.lastLoggedDifficulty = 0; // Track when difficulty level changes
    this.isShifting = false; // Track gear shift animation state

    // Performance optimization: Delta time tracking
    this.lastFrameTime = performance.now();
    this.animationFrameId = null;
    this.frameCount = 0;
    this.lastDOMUpdateFrame = 0;

    // Input state
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    // Player car - simple position object (no physics engine needed)
    this.playerCar = {
      position: {
        x: this.LANE_POSITIONS[1], // Center lane
        y: 480
      },
      width: 40,
      height: 70
    };

    // Audio engine
    this.audioEngine = new AudioEngine();

    // Audio toggle preference - load from localStorage or default to enabled
    const savedAudioPref = localStorage.getItem('highway-racer-audio-enabled');
    this.audioEnabled = savedAudioPref !== null ? savedAudioPref === 'true' : true;
    localStorage.setItem('highway-racer-audio-enabled', this.audioEnabled.toString());

    // Control mode ('keyboard' or 'gesture')
    this.controlMode = null;

    // Gesture controller
    this.gestureController = null;

    // Setup input handlers
    this.setupInputHandlers();
    this.setupControlModeSelection();
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Calculate lane positions to match the visual road (60% width, centered)
    const roadWidth = this.canvas.width * 0.6;
    const roadLeft = (this.canvas.width - roadWidth) / 2;

    // Divide road based on number of lanes
    if (this.numLanes === 2) {
      // 2-lane system: LEFT and RIGHT only
      const laneWidth = roadWidth / 2;
      this.LANE_POSITIONS = [
        roadLeft + laneWidth * 0.5,   // LEFT lane center
        roadLeft + laneWidth * 1.5    // RIGHT lane center
      ];
    } else if (this.numLanes === 3) {
      // 3-lane system: LEFT, CENTER, RIGHT
      const laneWidth = roadWidth / 3;
      this.LANE_POSITIONS = [
        roadLeft + laneWidth * 0.5,   // LEFT lane center
        roadLeft + laneWidth * 1.5,   // CENTER lane center
        roadLeft + laneWidth * 2.5    // RIGHT lane center
      ];
    } else if (this.numLanes === 4) {
      // 4-lane system: LANE1, LANE2, LANE3, LANE4
      const laneWidth = roadWidth / 4;
      this.LANE_POSITIONS = [
        roadLeft + laneWidth * 0.5,   // LANE 1 (leftmost) center
        roadLeft + laneWidth * 1.5,   // LANE 2 (left-center) center
        roadLeft + laneWidth * 2.5,   // LANE 3 (right-center) center
        roadLeft + laneWidth * 3.5    // LANE 4 (rightmost) center
      ];
    }

    // Sync to graphics engine
    if (this.graphics) {
      this.graphics.LANE_POSITIONS = this.LANE_POSITIONS;
      // Recreate stars for new canvas size
      if (this.graphics.useNativeCanvas) {
        this.graphics.createStarFieldCanvas();
      }
    }

    console.log(`📐 Canvas resized: ${this.canvas.width}x${this.canvas.height}`);
    console.log(`📍 Lane positions: ${this.LANE_POSITIONS.join(', ')}`);
  }

  async initGraphics() {
    // Initialize graphics engine (now using Canvas 2D)
    this.graphics = new GraphicsEngine(this.canvas);

    // Wait for async initialization to complete
    await this.graphics.initPromise;

    // Sync lane positions to graphics engine
    this.graphics.LANE_POSITIONS = this.LANE_POSITIONS;

    // Connect graphics animation to game state
    this.graphics.animate = () => this.renderWithPixi();
    console.log('✅ Graphics engine initialized');
  }

  /**
   * Calculate progressive difficulty parameters based on distance traveled
   * @returns {Object} - Contains currentSpawnInterval and currentMaxCars
   */
  calculateDifficulty() {
    // Calculate difficulty level based on distance milestones (every 300m)
    const difficultyLevel = Math.floor(this.distance / this.DIFFICULTY_MILESTONE);

    // MORE AGGRESSIVE: Exponential decay for spawn interval (faster spawning as distance increases)
    // Formula: interval = MIN + (BASE - MIN) * e^(-level/2)
    // Changed from /3 to /2 for steeper difficulty curve
    const decayFactor = Math.exp(-difficultyLevel / 2);
    const currentSpawnInterval = Math.round(
      this.MIN_SPAWN_INTERVAL +
      (this.BASE_SPAWN_INTERVAL - this.MIN_SPAWN_INTERVAL) * decayFactor
    );

    // MORE AGGRESSIVE: Add one car per difficulty level (not every 2 levels)
    // Each 300m milestone adds one more car to max count
    const currentMaxCars = Math.min(
      this.BASE_MAX_CARS + difficultyLevel,
      this.MAX_MAX_CARS
    );

    return {
      currentSpawnInterval,
      currentMaxCars,
      difficultyLevel
    };
  }

  setupControlModeSelection() {
    console.log('🏁 [RACING GAME] setupControlModeSelection called');

    const gestureBtn = document.getElementById('gestureBtn');
    const keyboardBtn = document.getElementById('keyboardBtn');
    const changeModeBtn = document.getElementById('changeModeBtn');
    const controlModeSelection = document.getElementById('controlModeSelection');
    const gameControls = document.getElementById('gameControls');

    console.log('🏁 [RACING GAME] Elements found:', {
      gestureBtn,
      keyboardBtn,
      changeModeBtn,
      controlModeSelection,
      gameControls
    });

    // Use once: true to prevent double-click
    gestureBtn.addEventListener('click', async () => {
      console.log('🖱️ [RACING GAME] Gesture button clicked');
      gestureBtn.disabled = true; // Prevent double-click
      await this.selectControlMode('gesture');
      controlModeSelection.style.display = 'none';
      gameControls.style.display = 'flex';
      this.updateControlsDisplay();
      gestureBtn.disabled = false;
    });

    keyboardBtn.addEventListener('click', () => {
      console.log('🖱️ [RACING GAME] Keyboard button clicked');
      keyboardBtn.disabled = true;
      this.selectControlMode('keyboard');
      controlModeSelection.style.display = 'none';
      gameControls.style.display = 'flex';
      this.updateControlsDisplay();
      keyboardBtn.disabled = false;
    });

    console.log('🏁 [RACING GAME] Event listeners attached to gesture and keyboard buttons');

    changeModeBtn.addEventListener('click', () => {
      console.log('🖱️ Change mode button clicked');
      this.changeControlMode();
      controlModeSelection.style.display = 'flex';
      gameControls.style.display = 'none';
    });
  }

  async selectControlMode(mode) {
    console.log(`🎮 Control mode selected: ${mode}`);

    // Prevent double initialization
    if (this.controlMode === mode) {
      console.log('⚠️ Control mode already set to', mode);
      return;
    }

    this.controlMode = mode;

    if (mode === 'gesture') {
      try {
        // Clean up any existing gesture controller first
        if (this.gestureController) {
          console.log('🧹 Cleaning up old gesture controller');
          this.gestureController.stop();
          this.gestureController.hideWebcam();
        }

        // Initialize gesture controller
        console.log('🔧 Creating new gesture controller');
        this.gestureController = new GestureController();
        await this.gestureController.init();

        // Setup gesture callbacks
        console.log('🔗 Setting up gesture callbacks');
        this.setupGestureCallbacks();

        // Verify callbacks are set
        console.log('✔️ Callbacks check:', {
          onLaneShiftLeft: !!this.gestureController.onLaneShiftLeft,
          onLaneShiftRight: !!this.gestureController.onLaneShiftRight,
          onAccelerate: !!this.gestureController.onAccelerate,
          onDecelerate: !!this.gestureController.onDecelerate
        });

        // Show webcam overlay
        this.gestureController.showWebcam();

        console.log('✅ Gesture mode activated');
      } catch (error) {
        console.error('❌ Failed to initialize gesture mode:', error);
        alert('Failed to initialize gesture controls. Please check camera permissions and try again.');
        this.controlMode = null;
      }
    } else {
      // Keyboard mode - clean up any existing gesture controller
      if (this.gestureController) {
        this.gestureController.stop();
        this.gestureController.hideWebcam();
        this.gestureController = null;
      }
    }
  }

  changeControlMode() {
    // Stop current mode
    if (this.controlMode === 'gesture' && this.gestureController) {
      this.gestureController.stop();
      this.gestureController.hideWebcam();
      this.gestureController = null;
    }

    // Pause game if running
    if (this.gameRunning) {
      this.pauseGame();
    }

    this.controlMode = null;
    console.log('🔄 Control mode reset');
  }

  setupGestureCallbacks() {
    if (!this.gestureController) return;

    // Lane shift callbacks with edge detection
    this.gestureController.onLaneShiftLeft = () => {
      console.log(`🎮 Left shift callback: gameRunning=${this.gameRunning}, currentLane=${this.currentLane}`);
      if (this.gameRunning && this.currentLane > 0) {
        console.log(`✅ Shifting left from lane ${this.currentLane} to ${this.currentLane - 1}`);
        this.switchLane(this.currentLane - 1);
      } else if (!this.gameRunning) {
        console.log('❌ Game not running - cannot shift');
      } else {
        console.log('❌ Already at leftmost lane');
      }
    };

    this.gestureController.onLaneShiftRight = () => {
      console.log(`🎮 Right shift callback: gameRunning=${this.gameRunning}, currentLane=${this.currentLane}`);
      if (this.gameRunning && this.currentLane < this.numLanes - 1) {
        console.log(`✅ Shifting right from lane ${this.currentLane} to ${this.currentLane + 1}`);
        this.switchLane(this.currentLane + 1);
      } else if (!this.gameRunning) {
        console.log('❌ Game not running - cannot shift');
      } else {
        console.log('❌ Already at rightmost lane');
      }
    };

    // Acceleration/deceleration (continuous)
    this.gestureController.onAccelerate = () => {
      if (this.gameRunning) {
        this.keys.up = true;
        this.keys.down = false;
      }
    };

    this.gestureController.onDecelerate = () => {
      if (this.gameRunning) {
        this.keys.down = true;
        this.keys.up = false;
      }
    };

    // Auto-pause when hands lost
    this.gestureController.onHandsLost = () => {
      if (this.gameRunning) {
        this.pauseGame();
        console.log('⏸️ Game auto-paused - hands not detected');
      }
    };

    // Auto-resume when hands detected again
    this.gestureController.onHandsDetected = () => {
      console.log('✅ Both hands detected');
      // Auto-resume if game is paused (but not game over)
      if (!this.gameRunning && !this.gameOverDiv.classList.contains('show')) {
        console.log('▶️ Auto-resuming game');
        this.resumeGame();
      }
    };
  }

  updateControlsDisplay() {
    const controlsDiv = document.querySelector('.controls');

    if (this.controlMode === 'gesture') {
      controlsDiv.innerHTML = `
        <h3>Gesture Controls (3-Lane Highway)</h3>
        <div class="control-item">
          <span>Start/Pause:</span>
          <strong>Click Button</strong>
        </div>
        <div class="control-item">
          <span>Shift Right Lane:</span>
          <strong>Open Right Hand ✋</strong>
        </div>
        <div class="control-item">
          <span>Shift Left Lane:</span>
          <strong>Open Left Hand ✋</strong>
        </div>
        <div class="control-item" style="background: rgba(255, 215, 0, 0.15); border-color: rgba(255, 215, 0, 0.4);">
          <span>Accelerate:</span>
          <strong>Right Point Up ☝️</strong>
        </div>
        <div class="control-item" style="background: rgba(255, 215, 0, 0.15); border-color: rgba(255, 215, 0, 0.4);">
          <span>Decelerate:</span>
          <strong>Left Point Up ☝️</strong>
        </div>
        <div class="control-item" style="background: rgba(255, 165, 0, 0.2); border-color: rgba(255, 165, 0, 0.4);">
          <span style="color: #ffaa00;">⚠️ Keep both hands visible</span>
        </div>
      `;
    } else {
      controlsDiv.innerHTML = `
        <h3>Controls & Audio Cues (3-Lane Highway)</h3>
        <div class="control-item">
          <span>Start/Pause:</span>
          <strong>SPACE</strong>
        </div>
        <div class="control-item">
          <span>Accelerate:</span>
          <strong>UP ARROW (Hold)</strong>
        </div>
        <div class="control-item">
          <span>Brake/Decelerate:</span>
          <strong>DOWN ARROW (Hold)</strong>
        </div>
        <div class="control-item">
          <span>Move Left (Left ← Center ← Right):</span>
          <strong>LEFT ARROW</strong>
        </div>
        <div class="control-item">
          <span>Move Right (Left → Center → Right):</span>
          <strong>RIGHT ARROW</strong>
        </div>
      `;
    }
  }

  setupInputHandlers() {
    window.addEventListener('keydown', (e) => {
      // Only accept keyboard input if in keyboard mode
      if (this.controlMode !== 'keyboard') return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.toggleGame();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.keys.up = true;
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.keys.down = true;
      } else if (e.code === 'ArrowLeft' && this.gameRunning) {
        e.preventDefault();
        this.switchLane(Math.max(0, this.currentLane - 1));
      } else if (e.code === 'ArrowRight' && this.gameRunning) {
        e.preventDefault();
        this.switchLane(Math.min(this.numLanes - 1, this.currentLane + 1));
      }
    });

    window.addEventListener('keyup', (e) => {
      // Only accept keyboard input if in keyboard mode
      if (this.controlMode !== 'keyboard') return;

      if (e.code === 'ArrowUp') {
        e.preventDefault();
        this.keys.up = false;
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        this.keys.down = false;
      }
    });

    this.startBtn.addEventListener('click', () => this.toggleGame());
    this.exitBtn.addEventListener('click', () => this.exitGame());
  }

  exitGame() {
    console.log('🚪 Exit game requested');

    // Stop the game if running
    if (this.gameRunning) {
      this.pauseGame();
    }

    // Stop all audio
    this.audioEngine.fadeOut();

    // Stop gesture controller if active
    if (this.gestureController) {
      this.gestureController.stop();
      this.gestureController.hideWebcam();
    }

    // Check if we're running in an iframe (embedded in main game)
    if (window.parent && window.parent !== window) {
      console.log('🔗 Running in iframe - sending close message to parent');
      // Send message to parent window to close the game
      window.parent.postMessage({
        type: 'CLOSE_RACING_GAME',
        source: 'highway-racer'
      }, '*');
    }
    // Check if this was opened in a new tab/window
    else if (window.opener) {
      console.log('🪟 Opened in new window - closing tab');
      // Opened by window.open() - close this tab
      window.close();
    }
    // Navigated here directly
    else {
      console.log('🔙 Direct access - going back in history');
      // Try to go back, or show message if can't
      if (window.history.length > 1) {
        window.history.back();
      } else {
        alert('Please close this tab to return to the main game.');
      }
    }
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    localStorage.setItem('highway-racer-audio-enabled', this.audioEnabled);

    // Update audio engine master volume (only if audio engine is initialized)
    if (this.audioEngine && this.audioEngine.audioCtx) {
      const masterGain = this.audioEngine.engineNodes.masterGain;
      if (masterGain) {
        if (this.audioEnabled) {
          // Fade in to normal volume
          masterGain.gain.setTargetAtTime(0.55, this.audioEngine.audioCtx.currentTime, 0.3);
          console.log('🔊 Audio enabled - fading in');
        } else {
          // Fade out to silence
          masterGain.gain.setTargetAtTime(0, this.audioEngine.audioCtx.currentTime, 0.3);
          console.log('🔇 Audio disabled - fading out');
        }
      }
    } else {
      // Audio engine not initialized yet - preference will be applied when game starts
      console.log(`🔊 Audio preference saved: ${this.audioEnabled ? 'enabled' : 'disabled'} (will apply when game starts)`);
    }

    console.log(`🔊 Audio ${this.audioEnabled ? 'enabled' : 'disabled'}`);
  }

  toggleGame() {
    // Don't allow spacebar to work if game over overlay is showing
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    if (gameOverOverlay && gameOverOverlay.classList.contains('show')) {
      console.log('⚠️ Game over overlay is showing - use buttons instead of spacebar');
      return;
    }

    if (this.gameRunning) {
      this.pauseGame();
    } else {
      // If game over OR never started, start new game, otherwise resume
      if (this.gameOverDiv.classList.contains('show') || this.score === 0 && this.distance === 0) {
        this.startGame();
      } else {
        this.resumeGame();
      }
    }
  }

  startGame() {
    console.log('🎮 ======= GAME STARTING =======');
    this.audioEngine.init();

    // Apply audio enabled/disabled state
    if (this.audioEngine.audioCtx && this.audioEngine.engineNodes.masterGain) {
      const targetVolume = this.audioEnabled ? 0.55 : 0;
      this.audioEngine.engineNodes.masterGain.gain.setTargetAtTime(
        targetVolume,
        this.audioEngine.audioCtx.currentTime,
        0.5
      );
      console.log(`🔊 Initial audio state: ${this.audioEnabled ? 'enabled' : 'disabled'}`);
    }

    this.gameRunning = true;
    this.gameOverDiv.classList.remove('show');
    this.startBtn.textContent = 'Pause (Space)';

    // Tell parent page to STOP background music when game starts
    console.log('🎵 [GAME START] Sending message to parent to STOP background music');
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'stopBackgroundMusic' }, '*');
    }

    // Reset game state
    this.score = 0;
    this.distance = 0;
    this.playerSpeed = 0;
    this.maxSpeed = 0;
    // Set starting lane based on number of lanes
    if (this.numLanes === 2) {
      this.currentLane = 0; // LEFT lane
    } else if (this.numLanes === 3) {
      this.currentLane = 1; // CENTER lane
    } else if (this.numLanes === 4) {
      this.currentLane = 1; // Second lane from left (lane 1 in 0-indexed)
    } else {
      this.currentLane = 1; // Default: center-ish
    }
    this.spawnTimer = 0;
    this.lastLoggedDifficulty = 0;

    // Reset smart traffic management
    this.lastSpawnedLane = -1;
    this.guaranteedEscapeTimer = 0;

    // Clear traffic
    this.trafficVehicles = [];

    // Reset player position
    this.playerCar.position.x = this.LANE_POSITIONS[this.currentLane];
    this.playerCar.position.y = 480;

    console.log(`✅ Player car positioned at x=${this.LANE_POSITIONS[this.currentLane]}, y=480`);
    console.log(`✅ Canvas size: ${this.canvas.width}x${this.canvas.height}`);

    // Set initial lane name based on number of lanes
    let initialLaneName;
    if (this.numLanes === 2) {
      initialLaneName = 'LEFT';
    } else if (this.numLanes === 3) {
      initialLaneName = 'CENTER';
    } else if (this.numLanes === 4) {
      initialLaneName = 'LANE 2'; // Second lane from left
    }
    this.laneDisplay.textContent = initialLaneName;
    this.audioEngine.fadeIn();

    // Resume gesture processing
    if (this.gestureController) {
      this.gestureController.resume();
    }

    this.gameLoop();
  }

  pauseGame() {
    this.gameRunning = false;
    this.startBtn.textContent = 'Resume (Space)';
    this.audioEngine.fadeOut();

    // Cancel animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Pause gesture processing but keep camera running
    if (this.gestureController) {
      this.gestureController.pause();
      // Clear auto-pause flag if user manually pauses
      // (but don't clear if it was already auto-paused)
    }
  }

  resumeGame() {
    console.log('🎮 ======= GAME RESUMING =======');
    this.gameRunning = true;
    this.startBtn.textContent = 'Pause (Space)';
    this.audioEngine.fadeIn();

    // Resume gesture processing
    if (this.gestureController) {
      this.gestureController.resume();
      // Clear auto-pause flag when manually resuming
      if (this.gestureController.wasAutoPaused) {
        console.log('🔓 Clearing auto-pause flag (manual resume)');
        this.gestureController.wasAutoPaused = false;
      }
    }

    this.gameLoop();
  }

  async gameOver() {
    console.log('💥 GAME OVER called - gameRunning:', this.gameRunning);
    if (!this.gameRunning) {
      console.log('⚠️ Game already over, returning');
      return; // Prevent multiple calls
    }

    console.log('🛑 Stopping game...');
    this.gameRunning = false;
    this.playerSpeed = 0; // Stop the car immediately

    console.log('💥 [COLLISION] Playing collision sound and stopping ALL game sounds');
    this.audioEngine.playCollisionSound();
    this.audioEngine.fadeOut();

    // Tell parent page to RESTART background music after collision
    console.log('🎵 [COLLISION] Sending message to parent to RESTART background music');
    if (window.parent !== window) {
      window.parent.postMessage({ action: 'startBackgroundMusic' }, '*');
    }

    // Pause gesture processing
    if (this.gestureController) {
      this.gestureController.pause();
    }

    // Hide old game over div
    this.gameOverDiv.classList.remove('show');
    this.startBtn.textContent = 'Start New Game (Space)';

    // Show new game over overlay
    console.log('📺 About to call showGameOverScreen()...');
    await this.showGameOverScreen();
    console.log('✅ showGameOverScreen() completed');
  }

  async showGameOverScreen() {
    const overlay = document.getElementById('gameOverOverlay');
    const scoreEl = document.getElementById('gameOverScore');
    const distanceEl = document.getElementById('gameOverDistance');
    const maxSpeedEl = document.getElementById('gameOverMaxSpeed');
    const leaderboardContent = document.getElementById('gameOverLeaderboardContent');
    const saveBtn = document.getElementById('gameOverSaveBtn');
    const saveStatus = document.getElementById('gameOverSaveStatus');
    const nextBtn = document.getElementById('gameOverNextBtn');

    if (!overlay) {
      console.error('❌ Game over overlay not found!');
      return;
    }

    // Update stats FIRST - before any async operations
    if (scoreEl) scoreEl.textContent = this.score.toLocaleString();
    if (distanceEl) distanceEl.textContent = Math.round(this.distance) + 'm';
    if (maxSpeedEl) maxSpeedEl.textContent = Math.round(this.maxSpeed);

    // Show overlay IMMEDIATELY - don't wait for async operations
    overlay.style.display = 'flex';
    overlay.classList.add('show');

    // Handle next level button
    if (nextBtn) {
      if (this.gameLevel === 1) {
        // Currently on level 1 (2-lane), can go to level 2 (3-lane)
        nextBtn.disabled = false;
        nextBtn.title = 'Go to 3-Lane Highway Racer';
      } else {
        // Already on level 2 (3-lane), no next level
        nextBtn.disabled = true;
        nextBtn.title = 'No more levels available';
      }
    }

    // Now handle async operations (leaderboard, score saving) in background
    try {
      // Check if user is logged in
      const leaderboardManager = window.racingLeaderboard;
      const isLoggedIn = leaderboardManager && leaderboardManager.isLoggedIn();

      // Auto-save score if logged in
      if (isLoggedIn && leaderboardManager) {
        console.log('💾 Attempting to save score...');
        try {
          const scoreSaved = await leaderboardManager.saveScore(this.score, false);
          if (scoreSaved && saveStatus) {
            saveStatus.textContent = '✅ Score saved successfully!';
            if (saveBtn) saveBtn.style.display = 'none';
          } else if (saveBtn && saveStatus) {
            saveStatus.textContent = '';
            saveBtn.style.display = 'inline-block';
          }
        } catch (saveError) {
          console.error('Error saving score:', saveError);
          if (saveStatus) saveStatus.textContent = '⚠️ Failed to save score';
        }
      } else {
        if (saveStatus) saveStatus.textContent = '⚠️ Please log in to save your score';
        if (saveBtn) saveBtn.style.display = 'none';
      }

      // Load and display leaderboard
      if (leaderboardManager && leaderboardContent) {
        console.log('📊 Loading leaderboard...');
        try {
          await leaderboardManager.displayLeaderboard(leaderboardContent);
          console.log('✅ Leaderboard loaded');
        } catch (leaderboardError) {
          console.error('Error loading leaderboard:', leaderboardError);
          leaderboardContent.innerHTML = '<p style="text-align: center; color: #ff4444;">⚠️ Leaderboard unavailable</p>';
        }
      } else if (leaderboardContent) {
        leaderboardContent.innerHTML = '<p style="text-align: center; color: #888;">Leaderboard unavailable</p>';
      }
    } catch (error) {
      console.error('Error in async operations:', error);
      // Don't let errors prevent the overlay from showing
    }

    console.log('✅ showGameOverScreen() complete');
  }

  hideGameOverScreen() {
    const overlay = document.getElementById('gameOverOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');
  }

  gameOverGoHome() {
    console.log('🏠 Game Over - Going Home');
    this.hideGameOverScreen();

    // Stop all audio
    this.audioEngine.fadeOut();

    // Stop gesture controller if active
    if (this.gestureController) {
      this.gestureController.stop();
      this.gestureController.hideWebcam();
    }

    // Close the iframe and return to level selection screen in parent window
    try {
      // Check if we're in an iframe by checking parent window
      const isInIframe = window.parent && window.parent !== window;
      console.log('🔍 Is in iframe:', isInIframe);

      if (isInIframe) {
        console.log('🔍 Checking for parent.game object...');

        // Try accessing parent's game object
        try {
          if (window.parent.game && typeof window.parent.game.closeExternalGame === 'function') {
            console.log('✅ Parent window has game.closeExternalGame() - calling it now');
            window.parent.game.closeExternalGame();
            return;
          } else {
            console.log('⚠️ Parent window exists but no game.closeExternalGame() found');
          }
        } catch (e) {
          console.log('⚠️ Cannot access parent.game (CORS or not ready):', e.message);
        }
      }

      // Fallback: Reload the parent iframe to show level selection
      // This handles the case where the game is loaded in Neurogati's iframe
      console.log('🏠 Using fallback: reloading parent iframe to show level selection');
      if (window.parent && window.parent !== window) {
        // Reload the parent iframe (index.html) which will show level selection
        window.parent.location.reload();
      } else {
        // If not in iframe, reload current page
        window.location.reload();
      }

    } catch (error) {
      console.error('❌ Error in gameOverGoHome:', error);
      // Last resort fallback - reload the page
      window.location.reload();
    }
  }

  gameOverRetry() {
    console.log('🔄 Game Over - Retrying');
    this.hideGameOverScreen();

    // Small delay before starting new game for better UX
    setTimeout(() => {
      this.startGame();
    }, 300);
  }

  gameOverNextLevel() {
    console.log('➡️ Game Over - Going to Next Level');

    if (this.gameLevel === 1) {
      // Go to level 2 (3-lane)
      this.hideGameOverScreen();

      // Stop audio and gesture controller
      this.audioEngine.fadeOut();
      if (this.gestureController) {
        this.gestureController.stop();
        this.gestureController.hideWebcam();
      }

      // Navigate to level 2
      window.location.href = 'index.html?level=2';
    } else {
      alert('You are already on the highest level!');
    }
  }

  switchLane(newLane) {
    if (this.currentLane === newLane || !this.gameRunning) return;

    // Validate lane bounds to prevent going outside the road
    if (newLane < 0 || newLane >= this.numLanes) {
      console.warn(`⚠️ Invalid lane ${newLane}! Valid lanes: 0 to ${this.numLanes - 1}`);
      return;
    }

    this.currentLane = newLane;
    const targetX = this.LANE_POSITIONS[this.currentLane];

    // Update player position directly (no physics engine)
    this.playerCar.position.x = targetX;

    // Get lane names based on number of lanes
    let laneNames;
    if (this.numLanes === 2) {
      laneNames = ['LEFT', 'RIGHT'];
    } else if (this.numLanes === 3) {
      laneNames = ['LEFT', 'CENTER', 'RIGHT'];
    } else if (this.numLanes === 4) {
      laneNames = ['LANE 1', 'LANE 2', 'LANE 3', 'LANE 4'];
    }
    this.laneDisplay.textContent = laneNames[this.currentLane];
    console.log(`🚗 Switched to ${laneNames[this.currentLane]} lane (lane ${this.currentLane})`);

    // Visual feedback
    if (this.graphics) {
      this.graphics.flashLaneChange(this.currentLane);
    }
  }

  /**
   * INTELLIGENT TRAFFIC SPAWNING ALGORITHM
   * Prevents impossible situations where all lanes are blocked
   */
  spawnTrafficVehicle() {
    // Get lane names for logging
    let laneNames;
    if (this.numLanes === 2) {
      laneNames = ['LEFT', 'RIGHT'];
    } else if (this.numLanes === 3) {
      laneNames = ['LEFT', 'CENTER', 'RIGHT'];
    } else if (this.numLanes === 4) {
      laneNames = ['LANE 1', 'LANE 2', 'LANE 3', 'LANE 4'];
    }

    // STEP 1: Check which lanes are currently blocked near spawn point
    const SPAWN_ZONE_HEIGHT = 200; // Check top 200px for recent spawns
    const MIN_VEHICLE_SPACING = 150; // Minimum vertical spacing between cars

    const blockedLanes = new Set();
    for (let vehicle of this.trafficVehicles) {
      // Only check vehicles near the spawn area (top of screen)
      if (vehicle.position.y < SPAWN_ZONE_HEIGHT && vehicle.position.y > -100) {
        blockedLanes.add(vehicle.lane);
      }
    }

    // STEP 2: Find available lanes
    const availableLanes = [];
    for (let i = 0; i < this.numLanes; i++) {
      if (!blockedLanes.has(i)) {
        availableLanes.push(i);
      }
    }

    // STEP 3: Intelligent lane selection
    let selectedLane;

    // CRITICAL: If all lanes are blocked, don't spawn (wait for space)
    if (availableLanes.length === 0) {
      console.log(`⚠️ All lanes blocked in spawn zone - skipping spawn`);
      return; // Don't spawn, wait for space
    }

    // GUARANTEE: Always keep at least one lane open when spawning
    // If only 1 lane is available, use it (but this means 2 lanes will be blocked)
    // If 2+ lanes available, randomly choose but NEVER block all lanes

    if (availableLanes.length === 1) {
      // Only one lane available - use it (will block 2 out of 3 lanes)
      selectedLane = availableLanes[0];
      console.log(`⚠️ Only 1 lane available: ${laneNames[selectedLane]} - spawning here`);
    } else if (availableLanes.length === this.numLanes) {
      // All lanes are clear - use smart distribution
      // Avoid spawning in the same lane consecutively
      let candidateLanes = availableLanes.filter(lane => lane !== this.lastSpawnedLane);

      if (candidateLanes.length === 0) {
        candidateLanes = availableLanes; // Fallback if all lanes were last spawned
      }

      selectedLane = candidateLanes[Math.floor(Math.random() * candidateLanes.length)];
    } else {
      // Some lanes available - choose randomly from available
      selectedLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
    }

    // STEP 4: Additional safety check - ensure spacing in selected lane
    let canSpawn = true;
    for (let vehicle of this.trafficVehicles) {
      if (vehicle.lane === selectedLane) {
        const verticalDistance = Math.abs(vehicle.position.y - (-50));
        if (verticalDistance < MIN_VEHICLE_SPACING) {
          canSpawn = false;
          console.log(`⚠️ Vehicle too close in ${laneNames[selectedLane]} (${Math.round(verticalDistance)}px) - skipping spawn`);
          break;
        }
      }
    }

    if (!canSpawn) return; // Skip this spawn, try again next interval

    // STEP 5: Spawn the vehicle
    const x = this.LANE_POSITIONS[selectedLane];
    const y = -50;

    const vehicle = {
      position: { x, y },
      width: 40,
      height: 70,
      lane: selectedLane
    };

    this.trafficVehicles.push(vehicle);
    this.lastSpawnedLane = selectedLane;

    console.log(`🚙 SMART SPAWN: ${laneNames[selectedLane]} lane (${availableLanes.length}/${this.numLanes} lanes available)`);
  }

  /**
   * GUARANTEED ESCAPE ROUTE SPAWNING
   * Called periodically to ensure player always has a way out
   * Spawns in a pattern that leaves at least one lane completely clear
   */
  spawnWithEscapeGuarantee() {
    // Get lane names for logging
    let laneNames;
    if (this.numLanes === 2) {
      laneNames = ['LEFT', 'RIGHT'];
    } else if (this.numLanes === 3) {
      laneNames = ['LEFT', 'CENTER', 'RIGHT'];
    } else if (this.numLanes === 4) {
      laneNames = ['LANE 1', 'LANE 2', 'LANE 3', 'LANE 4'];
    }

    // STRATEGY: Randomly pick one lane to keep completely clear
    const guaranteedClearLane = Math.floor(Math.random() * this.numLanes);

    // Check which lanes currently have vehicles in spawn zone
    const SPAWN_ZONE_HEIGHT = 300; // Larger zone for escape guarantee
    const lanesWithVehicles = new Set();

    for (let vehicle of this.trafficVehicles) {
      if (vehicle.position.y < SPAWN_ZONE_HEIGHT && vehicle.position.y > -100) {
        lanesWithVehicles.add(vehicle.lane);
      }
    }

    // Choose a lane to spawn in (any lane EXCEPT the guaranteed clear lane)
    const spawnableLanes = [];
    for (let i = 0; i < this.numLanes; i++) {
      if (i !== guaranteedClearLane && !lanesWithVehicles.has(i)) {
        spawnableLanes.push(i);
      }
    }

    // If no spawnable lanes, skip (the guaranteed clear lane is working)
    if (spawnableLanes.length === 0) {
      console.log(`✅ Escape guaranteed: ${laneNames[guaranteedClearLane]} is clear, others blocked`);
      return;
    }

    // Spawn in one of the non-guaranteed lanes
    const selectedLane = spawnableLanes[Math.floor(Math.random() * spawnableLanes.length)];
    const x = this.LANE_POSITIONS[selectedLane];
    const y = -50;

    const vehicle = {
      position: { x, y },
      width: 40,
      height: 70,
      lane: selectedLane
    };

    this.trafficVehicles.push(vehicle);
    this.lastSpawnedLane = selectedLane;

    console.log(`✅ ESCAPE SPAWN: ${laneNames[selectedLane]} spawned, ${laneNames[guaranteedClearLane]} guaranteed clear`);
  }

  updatePhysics() {
    // In gesture mode, reset acceleration/deceleration inputs each frame
    // They will be set again by gesture callbacks if gestures are active
    if (this.controlMode === 'gesture' && this.gestureController) {
      // Check if pointing gestures are still active
      const rightPointing = this.gestureController.handStates.right.isPointing;
      const leftPointing = this.gestureController.handStates.left.isPointing;
      const rightThumbsUp = this.gestureController.handStates.right.thumbsUp;
      const leftThumbsUp = this.gestureController.handStates.left.thumbsUp;

      if (!rightPointing && !rightThumbsUp) {
        this.keys.up = false;
      }
      if (!leftPointing && !leftThumbsUp) {
        this.keys.down = false;
      }
    }

    // Handle acceleration/deceleration based on input
    if (this.keys.up && !this.keys.down) {
      // Accelerate
      this.playerSpeed = Math.min(this.playerSpeed + this.ACCEL_RATE, this.MAX_SPEED);
    } else if (this.keys.down) {
      // Brake
      this.playerSpeed = Math.max(this.playerSpeed - this.BRAKE_RATE, this.MIN_SPEED);
    } else {
      // Natural deceleration (drag)
      this.playerSpeed = Math.max(this.playerSpeed - this.DRAG, this.MIN_SPEED);
    }

    // Track max speed
    if (this.playerSpeed > this.maxSpeed) {
      this.maxSpeed = this.playerSpeed;
    }

    // KEEP PLAYER CAR FIXED AT y=480 (only x changes with lane switching)
    this.playerCar.position.y = 480;

    // Move traffic vehicles down (they come toward the player)
    const moveSpeed = 2 + this.playerSpeed * 0.05;
    for (let i = 0; i < this.trafficVehicles.length; i++) {
      const vehicle = this.trafficVehicles[i];
      vehicle.position.y += moveSpeed;
    }

    // Remove off-screen vehicles and add score (reverse loop for safe removal)
    for (let i = this.trafficVehicles.length - 1; i >= 0; i--) {
      const vehicle = this.trafficVehicles[i];
      if (vehicle.position.y > this.canvas.height + 100) {
        this.trafficVehicles.splice(i, 1);
        this.score += 10;
        // Play reward sound for successfully dodging the car
        if (this.audioEngine) {
          this.audioEngine.playRewardSound();
        }
      }
    }

    // Get current difficulty parameters
    const difficulty = this.calculateDifficulty();

    // Spawn new vehicles based on dynamic spawn interval and max cars
    this.spawnTimer += 16;
    this.guaranteedEscapeTimer += 16;

    if (this.spawnTimer >= difficulty.currentSpawnInterval) {
      // Only spawn if we haven't reached the max cars limit
      if (this.trafficVehicles.length < difficulty.currentMaxCars) {
        // SMART SPAWN: Check if we should guarantee an escape route
        const shouldGuaranteeEscape = this.guaranteedEscapeTimer >= this.ESCAPE_GUARANTEE_INTERVAL;

        if (shouldGuaranteeEscape) {
          // Force spawn with escape route guarantee
          this.spawnWithEscapeGuarantee();
          this.guaranteedEscapeTimer = 0; // Reset timer
          console.log(`✅ ESCAPE ROUTE GUARANTEED - spawning safe pattern`);
        } else {
          // Normal smart spawn
          this.spawnTrafficVehicle();
        }

        // Log difficulty changes
        if (this.lastLoggedDifficulty !== difficulty.difficultyLevel) {
          this.lastLoggedDifficulty = difficulty.difficultyLevel;
          console.log(`📈 DIFFICULTY INCREASED! Level ${difficulty.difficultyLevel} | Spawn: ${difficulty.currentSpawnInterval}ms | Max Cars: ${difficulty.currentMaxCars}`);
        }
      }
      this.spawnTimer = 0;
    }

    // Check collisions - end game immediately on hit
    // OPTIMIZED: Use squared distance to avoid expensive Math.sqrt()
    const collisionThresholdSquared = 80 * 80; // 6400
    const playerX = this.playerCar.position.x;
    const playerY = this.playerCar.position.y;

    // Update proximity warnings (OPTIMIZED - only check nearby vehicles)
    // Filter vehicles to only those in front of player and nearby
    const nearbyVehicles = [];
    for (let i = 0; i < this.trafficVehicles.length; i++) {
      const vehicle = this.trafficVehicles[i];
      // Only check vehicles in front (lower Y) and within 300px range
      if (vehicle.position.y < playerY && (playerY - vehicle.position.y) < 300) {
        nearbyVehicles.push(vehicle);
      }
    }
    this.audioEngine.updateProximityWarnings(this.playerCar, nearbyVehicles, this.currentLane, this.LANE_POSITIONS, this.numLanes);

    for (let i = 0; i < this.trafficVehicles.length; i++) {
      const vehicle = this.trafficVehicles[i];

      // Quick bounding box check first (cheapest)
      const vehicleY = vehicle.position.y;
      if (Math.abs(vehicleY - playerY) > 100) continue; // Too far vertically

      const vehicleX = vehicle.position.x;
      if (Math.abs(vehicleX - playerX) > 100) continue; // Too far horizontally

      // Now do precise collision with squared distance
      const dx = playerX - vehicleX;
      const dy = playerY - vehicleY;
      const distanceSquared = dx * dx + dy * dy;

      // Cars are 40x70, so collision when centers are within 80 pixels
      if (distanceSquared < collisionThresholdSquared) {
        this.gameOver();
        return; // Stop processing immediately
      }
    }

    // Update distance
    this.distance += this.playerSpeed * 0.016;
  }

  updateGame(deltaTime = 16) {
    if (!this.gameRunning) return;

    // No physics engine - just update game state
    this.updatePhysics();

    // Update audio
    this.audioEngine.update(this.playerSpeed, this.currentLane, this.keys.up);

    // Update graphics
    this.updateGraphics();

    // Update displays (THROTTLED - only every 3 frames to reduce DOM reflows)
    const shouldUpdateDOM = (this.frameCount - this.lastDOMUpdateFrame) >= 3;

    if (shouldUpdateDOM) {
      this.lastDOMUpdateFrame = this.frameCount;

      const currentSpeed = Math.round(this.playerSpeed);
      this.speedDisplay.textContent = currentSpeed;
      this.scoreDisplay.textContent = this.score;
      this.distanceDisplay.textContent = Math.round(this.distance) + 'm';

      // Update difficulty display
      const currentDifficulty = this.calculateDifficulty();
      this.difficultyDisplay.textContent = currentDifficulty.difficultyLevel;

      // Update speedometer arc - FIXED: Use actual MAX_SPEED (240 km/h)
      const speedPercent = Math.min(currentSpeed / this.MAX_SPEED, 1);
      const speedArc = document.getElementById('speedArc');
      if (speedArc) {
        const dashOffset = 282.6 * (1 - speedPercent);
        speedArc.style.strokeDashoffset = dashOffset;
      }
    }

    // Gear display with shift animation
    const currentGear = this.audioEngine.gear;
    if (this.lastGear !== currentGear) {
      this.lastGear = currentGear;
      this.gearDisplay.textContent = currentGear;

      // Add shifting animation to new gear display
      const gearValue = document.querySelector('.gear-value');
      if (gearValue) {
        gearValue.classList.add('shifting');
        setTimeout(() => {
          gearValue.classList.remove('shifting');
        }, 300);
      }

      // Legacy gear-stat for backwards compatibility
      const gearStat = document.querySelector('.gear-stat');
      if (gearStat) {
        gearStat.classList.add('shifting');
        setTimeout(() => {
          gearStat.classList.remove('shifting');
        }, 350);
      }

      // Set shifting state for visual effects
      this.isShifting = true;
      setTimeout(() => {
        this.isShifting = false;
      }, 350);
    }

    // RPM display removed - no longer needed for cleaner dashboard
  }

  updateGraphics() {
    if (!this.graphics) return; // Graphics not initialized yet

    if (this.graphics.useNativeCanvas) {
      // Native Canvas 2D rendering
      this.graphics.updateStarFieldCanvas(this.playerSpeed);
      this.graphics.drawRoadCanvas(this.playerSpeed);

      // Draw player car with speed and shift effects
      this.graphics.drawPlayerCarCanvas(
        this.playerCar.position.x,
        this.playerCar.position.y,
        this.currentLane,
        this.playerSpeed,
        this.isShifting
      );

      // Draw traffic vehicles
      const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'];
      this.trafficVehicles.forEach((vehicle, idx) => {
        const color = colors[idx % colors.length];
        this.graphics.drawTrafficVehicleCanvas(vehicle.position.x, vehicle.position.y, color);
      });

      // Speed lines effect
      this.graphics.createSpeedLinesCanvas(this.playerSpeed);

    } else {
      // Pixi.js WebGL rendering
      this.graphics.drawRoad(this.playerSpeed);
      this.graphics.updateStarField(this.playerSpeed);

      // Update player car
      this.graphics.createPlayerCar(
        this.playerCar.position.x,
        this.playerCar.position.y,
        this.currentLane
      );

      // Update traffic vehicles
      this.trafficVehicles.forEach((vehicle, idx) => {
        const id = `vehicle_${idx}`;
        if (!this.graphics.vehicleSprites.has(id)) {
          this.graphics.createTrafficVehicle(id, vehicle.position.x, vehicle.position.y);
        } else {
          this.graphics.updateTrafficVehicle(id, vehicle.position.x, vehicle.position.y);
        }
      });

      // Clean up removed vehicles
      const activeIds = new Set(this.trafficVehicles.map((_, idx) => `vehicle_${idx}`));
      for (const [id] of this.graphics.vehicleSprites) {
        if (!activeIds.has(id)) {
          this.graphics.removeTrafficVehicle(id);
        }
      }

      // Speed lines effect
      this.graphics.createSpeedLines(this.playerSpeed);
    }
  }

  gameLoop(currentTime = performance.now()) {
    if (!this.gameRunning) {
      this.animationFrameId = null;
      return;
    }

    // Calculate delta time (cap at 50ms to prevent huge jumps)
    const deltaTime = Math.min(currentTime - this.lastFrameTime, 50);
    this.lastFrameTime = currentTime;
    this.frameCount++;

    this.updateGame(deltaTime);

    // Use requestAnimationFrame for smooth 60fps
    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  renderWithPixi() {
    // Pixi handles rendering automatically via ticker
    // This function is called by Pixi's animation loop
  }
}
