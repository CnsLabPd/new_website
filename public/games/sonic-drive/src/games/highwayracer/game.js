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

const customModelGestureModule = await import(`./customModelGestureController.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] customModelGestureController.js imported');

// Analytics modules
const analyticsModule = await import(`./analyticsCollector.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] analyticsCollector.js imported');

const supabaseModule = await import(`./supabaseClient.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] supabaseClient.js imported');

const reportModule = await import(`./analyticsReportGenerator.js?v=${timestamp}`);
console.log('🏁 [RACING GAME] analyticsReportGenerator.js imported');

const AudioEngine = audioModule.AudioEngine;
const GraphicsEngine = graphicsModule.GraphicsEngine;
const GestureController = gestureModule.GestureController;
const CustomModelGestureController = customModelGestureModule.CustomModelGestureController;
const AnalyticsCollector = analyticsModule.AnalyticsCollector;
const { saveGameSession, getOrCreateUserProfile, initSupabase } = supabaseModule;
const { generateAnalyticsReport } = reportModule;

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

    // Set number of lanes and game mode based on level
    if (this.gameLevel === 1) {
      this.numLanes = 2; // Level 1: 2 lanes, NO traffic
      this.isFreeMode = true;
      this.lives = Infinity; // Infinite lives in practice mode
      this.targetDistance = 500; // Goal: 500 meters
      this.hasTraffic = false; // NO traffic spawning
    } else if (this.gameLevel === 2) {
      this.numLanes = 3; // Level 2: 3 lanes, NO traffic
      this.isFreeMode = true;
      this.lives = Infinity; // Infinite lives in practice mode
      this.targetDistance = 500; // Goal: 500 meters
      this.hasTraffic = false; // NO traffic spawning
    } else if (this.gameLevel === 3) {
      this.numLanes = 2; // Level 3: 2 lanes with traffic (EASY)
      this.isFreeMode = false;
      this.lives = 2; // 2 lives
      this.targetDistance = 500; // Goal: 500 meters
      this.hasTraffic = true; // Traffic spawning enabled
    } else if (this.gameLevel === 4) {
      this.numLanes = 3; // Level 4: 3 lanes with traffic (MEDIUM)
      this.isFreeMode = false;
      this.lives = 5; // 5 lives
      this.targetDistance = 2000; // Goal: 2000 meters
      this.hasTraffic = true; // Traffic spawning enabled
    } else if (this.gameLevel === 5) {
      this.numLanes = 4; // Level 5: 4 lanes with traffic (HARD)
      this.isFreeMode = false;
      this.lives = 5; // 5 lives
      this.targetDistance = 2000; // Goal: 2000 meters
      this.hasTraffic = true; // Traffic spawning enabled
    } else {
      this.numLanes = 3; // Default: 3 lanes
      this.isFreeMode = false;
      this.lives = 5;
      this.targetDistance = 1000;
      this.hasTraffic = true;
    }

    this.maxLives = this.lives; // Store initial lives for display
    this.levelCompleted = false; // Flag for level completion
    this.finishLineY = null; // Y position of finish line on screen (updated each frame)

    console.log(`🎮 [RACING GAME] Highway Racer - Level ${this.gameLevel}`);
    console.log(`   └─ ${this.numLanes} lanes, ${this.hasTraffic ? 'WITH traffic' : 'NO traffic'}`);
    console.log(`   └─ Target: ${this.targetDistance}m, Lives: ${this.lives === Infinity ? '∞' : this.lives}`);

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
    this.livesDisplay = document.getElementById('livesDisplay');
    this.livesPanel = document.getElementById('livesPanel');
    this.startBtn = document.getElementById('startBtn');
    this.exitBtn = document.getElementById('exitBtn');
    this.gameOverDiv = document.getElementById('gameOver');
    this.finalScoreSpan = document.getElementById('finalScore');

    // Show lives panel only in challenge modes (not free mode)
    if (!this.isFreeMode && this.livesPanel) {
      this.livesPanel.style.display = 'block';
      this.updateLivesDisplay();
    }

    // REMOVED Matter.js - not needed for simple position-based movement
    // Using lightweight object-based vehicle tracking instead

    // Game constants - REALISTIC GEAR-BASED PHYSICS MODEL
    this.MAX_SPEED = 180; // Maximum speed in km/h (game units)
    this.MIN_SPEED = 0;

    // Realistic gear-based physics parameters (inspired by racing games)
    this.ENGINE_MAX_TORQUE = 400; // Maximum engine torque (Nm)
    this.ENGINE_MAX_RPM = 9000;   // Redline RPM
    this.ENGINE_IDLE_RPM = 1000;  // Idle RPM
    this.VEHICLE_MASS = 1200;     // Vehicle mass in kg

    // Gear ratios - each gear has different torque multiplication
    // Lower gears = more torque, faster acceleration, lower top speed
    // Higher gears = less torque, slower acceleration, higher top speed
    this.GEAR_RATIOS = [3.5, 2.2, 1.5, 1.1, 0.85, 0.68]; // 6-speed gearbox
    this.FINAL_DRIVE = 3.73; // Differential ratio

    // Gear shift points (km/h) - matches audio engine
    this.GEAR_SPEED_MAX = [40, 70, 105, 145, 190, 240];
    this.GEAR_SPEED_MIN = [0, 30, 60, 95, 135, 180];

    // Resistance forces
    this.DRAG_COEFFICIENT = 0.012; // Air resistance (quadratic with speed)
    this.ROLLING_RESISTANCE = 0.06; // Rolling resistance (linear with speed)
    this.BRAKE_FORCE = 4.5; // Braking force - gentle and gradual

    // Current gear state
    this.currentGear = 1;
    this.currentRPM = 1000;
    this.shiftCooldown = 0;

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

    // ONE-CAR-AT-A-TIME: Track if current car has passed the player (for challenge modes only)
    this.currentCarHasPassedPlayer = true; // Start true so first car can spawn immediately

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
    // Position car lower on screen (y=550) for better visibility of incoming traffic
    this.playerCar = {
      position: {
        x: this.LANE_POSITIONS[1], // Center lane
        y: 550  // Moved lower from 480 to 550
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

    // Gesture controller settings
    this.USE_CUSTOM_MODELS = true; // Set to true to use custom trained models
    this.gestureController = null;

    // Analytics
    this.analytics = null;
    this.userRoles = [];
    this.analyticsEnabled = false;

    // Telemetry collection (15 fps)
    this.telemetrySamples = [];
    this.gestureEvents = { left: [], right: [] };
    this.laneChangeEvents = [];
    this.kinematicSamples = [];
    this.telemetrySampleIntervalMs = 1000 / 5;
    this.lastTelemetryTs = 0;
    this.levelStartPerf = null;
    this.lastScoreSample = 0;

    // Holistic (pose) tracking for kinematic telemetry
    this.holistic = null;
    this.holisticBusy = false;
    this.lastHolisticTs = 0;
    this.holisticSampleIntervalMs = 1000 / 5;
    this.holisticHandedness = null;

    // Setup input handlers
    this.setupInputHandlers();
    this.setupControlModeSelection();

    // Show role selection modal immediately on page load
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      this.showRoleSelectionModal();
    }, 100);
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
   * Calculate engine torque based on RPM (torque curve)
   * Racing games use torque curves where peak torque is in mid-range RPM
   * @param {number} rpm - Current engine RPM
   * @returns {number} - Engine torque (Nm)
   */
  calculateEngineTorque(rpm) {
    // Realistic torque curve: peaks around 4500-5500 RPM, drops at low and high RPM
    // This creates the characteristic "power band" of a performance engine
    const peakRPM = 5000;
    const rpmRatio = rpm / peakRPM;

    // Torque curve formula (bell-shaped curve)
    // Maximum torque at peak RPM, ~70% at idle and redline
    let torqueMultiplier;
    if (rpm < peakRPM) {
      // Rising torque from idle to peak
      torqueMultiplier = 0.7 + 0.3 * (rpmRatio);
    } else {
      // Falling torque from peak to redline
      torqueMultiplier = 1.0 - 0.3 * Math.pow((rpm - peakRPM) / (this.ENGINE_MAX_RPM - peakRPM), 2);
    }

    return this.ENGINE_MAX_TORQUE * Math.max(0.5, torqueMultiplier);
  }

  /**
   * Calculate RPM based on current speed and gear
   * @param {number} speed - Current speed (km/h)
   * @param {number} gear - Current gear (1-6)
   * @returns {number} - Engine RPM
   */
  calculateRPM(speed, gear) {
    const gearIndex = gear - 1;
    const gearRatio = this.GEAR_RATIOS[gearIndex];

    // RPM formula: speed * gear_ratio * final_drive + idle
    // This gives realistic RPM values that increase with speed and decrease with higher gears
    const rpm = this.ENGINE_IDLE_RPM + (speed * gearRatio * this.FINAL_DRIVE * 10);

    return Math.min(rpm, this.ENGINE_MAX_RPM);
  }

  /**
   * Automatic gear shifting based on speed and RPM
   * @param {number} speed - Current speed (km/h)
   */
  autoGearShift(speed) {
    if (this.shiftCooldown > 0) {
      this.shiftCooldown -= 0.016; // Decrease cooldown
      return;
    }

    const gearIndex = this.currentGear - 1;

    // Upshift when reaching gear max speed (while accelerating)
    if (this.currentGear < 6 && speed > this.GEAR_SPEED_MAX[gearIndex] && this.keys.up) {
      console.log(`⬆️ [GAME] SHIFT UP: Gear ${this.currentGear} → ${this.currentGear + 1} at ${Math.round(speed)} km/h, RPM: ${Math.round(this.currentRPM)}`);
      this.currentGear++;
      this.shiftCooldown = 0.5; // 500ms cooldown between shifts

      // Reset RPM for new gear (drops after shift)
      this.currentRPM *= 0.7; // RPM drops ~30% after upshift
    }
    // Downshift when falling below gear min speed (engine braking)
    else if (this.currentGear > 1 && speed < this.GEAR_SPEED_MIN[gearIndex]) {
      console.log(`⬇️ [GAME] SHIFT DOWN: Gear ${this.currentGear} → ${this.currentGear - 1} at ${Math.round(speed)} km/h, RPM: ${Math.round(this.currentRPM)}`);
      this.currentGear--;
      this.shiftCooldown = 0.5;

      // RPM increases after downshift
      this.currentRPM *= 1.3; // RPM increases ~30% after downshift
    }
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

  /**
   * Show role selection modal (always shown on page load)
   */
  showRoleSelectionModal() {
    // Show modal EVERY TIME (don't check localStorage)
    const modal = document.getElementById('roleSelectionModal');
    if (!modal) return;

    modal.style.display = 'flex';

    // Load previously selected roles to pre-check boxes (for convenience)
    const savedRoles = localStorage.getItem('sonic_drive_user_roles');
    let previousRoles = [];
    if (savedRoles && savedRoles !== '[]') {
      previousRoles = JSON.parse(savedRoles);
      console.log('📊 Previously selected roles:', previousRoles);
    }

    // Role card selection
    const roleCards = document.querySelectorAll('.role-card:not(.disabled)');
    const confirmBtn = document.getElementById('confirmRolesBtn');
    const skipBtn = document.getElementById('skipRolesBtn');
    const blindCheck = document.getElementById('checkBlind');
    const adhdCheck = document.getElementById('checkADHD');

    // Pre-check boxes based on previous selection (for convenience)
    if (previousRoles.includes('blind')) {
      blindCheck.checked = true;
      document.getElementById('roleBlind').classList.add('selected');
    }
    if (previousRoles.includes('adhd')) {
      adhdCheck.checked = true;
      document.getElementById('roleADHD').classList.add('selected');
    }
    // Enable confirm button if any was previously selected
    if (previousRoles.length > 0) {
      confirmBtn.disabled = false;
    }

    // Card click handlers
    roleCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (card.classList.contains('disabled')) return;

        const role = card.dataset.role;
        const checkbox = card.querySelector('input[type="checkbox"]');

        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    });

    // Checkbox change handlers
    const updateUI = () => {
      // Update card styling
      roleCards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      // Enable/disable confirm button
      const anySelected = blindCheck.checked || adhdCheck.checked;
      confirmBtn.disabled = !anySelected;
    };

    blindCheck.addEventListener('change', updateUI);
    adhdCheck.addEventListener('change', updateUI);

    // Confirm button
    confirmBtn.addEventListener('click', async () => {
      this.userRoles = [];
      if (blindCheck.checked) this.userRoles.push('blind');
      if (adhdCheck.checked) this.userRoles.push('adhd');

      localStorage.setItem('sonic_drive_user_roles', JSON.stringify(this.userRoles));
      this.analyticsEnabled = true;

      // Create user profile in database
      const userId = localStorage.getItem('sonic_drive_user_id') ||
                     `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sonic_drive_user_id', userId);

      await getOrCreateUserProfile(userId, this.userRoles);

      modal.style.display = 'none';
      console.log('✅ Analytics enabled:', this.userRoles);
    });

    // Skip button
    skipBtn.addEventListener('click', () => {
      this.userRoles = [];
      this.analyticsEnabled = false;
      localStorage.setItem('sonic_drive_user_roles', JSON.stringify([]));
      modal.style.display = 'none';
      console.log('⏭️ Analytics skipped');
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
          if (this.gestureController.stop) this.gestureController.stop();
          if (this.gestureController.hideWebcam) this.gestureController.hideWebcam();
          if (this.gestureController.cleanup) this.gestureController.cleanup();
        }

        // Choose gesture controller based on USE_CUSTOM_MODELS flag
        if (this.USE_CUSTOM_MODELS) {
          console.log('🤖 Creating CUSTOM MODEL gesture controller');
          this.gestureController = new CustomModelGestureController();

          // Load dual models (absolute path from game root)
          const leftModelPath = '/games/sonic-drive/assets/control%20models/left_hand_controls_sonic_drive.json';
          const rightModelPath = '/games/sonic-drive/assets/control%20models/right_hand_controls_sonic_drive.json';

          console.log('📦 Loading custom models...');
          await this.gestureController.loadDualModels(leftModelPath, rightModelPath);
          console.log('✅ Custom models loaded');

          // Initialize MediaPipe
          await this.gestureController.init();
          console.log('✅ MediaPipe initialized');

          // Show webcam overlay
          if (this.gestureController.showWebcam) {
            this.gestureController.showWebcam();
          }
        } else {
          console.log('🔧 Creating STANDARD gesture controller');
          this.gestureController = new GestureController();
          await this.gestureController.init();

          // Show webcam overlay
          if (this.gestureController.showWebcam) {
            this.gestureController.showWebcam();
          }
        }

        // Setup gesture callbacks
        console.log('🔗 Setting up gesture callbacks');
        this.setupGestureCallbacks();

        // Initialize holistic pose tracking for kinematic telemetry
        if (this.analyticsEnabled && this.userRoles.length > 0) {
          this.initHolisticIfNeeded();
        }

        // Verify callbacks are set
        console.log('✔️ Callbacks check:', {
          onLaneShiftLeft: !!this.gestureController.onLaneShiftLeft,
          onLaneShiftRight: !!this.gestureController.onLaneShiftRight,
          onAccelerate: !!this.gestureController.onAccelerate,
          onDecelerate: !!this.gestureController.onDecelerate
        });

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
    this.gestureController.onLaneShiftLeft = (meta = {}) => {
      console.log(`🎮 Left shift callback: gameRunning=${this.gameRunning}, currentLane=${this.currentLane}`);
      if (this.gameRunning && this.currentLane > 0) {
        console.log(`✅ Shifting left from lane ${this.currentLane} to ${this.currentLane - 1}`);
        this.switchLane(this.currentLane - 1, { source: 'gesture', ...meta });
      } else if (!this.gameRunning) {
        console.log('❌ Game not running - cannot shift');
      } else {
        console.log('❌ Already at leftmost lane');
      }
    };

    this.gestureController.onLaneShiftRight = (meta = {}) => {
      console.log(`🎮 Right shift callback: gameRunning=${this.gameRunning}, currentLane=${this.currentLane}`);
      if (this.gameRunning && this.currentLane < this.numLanes - 1) {
        console.log(`✅ Shifting right from lane ${this.currentLane} to ${this.currentLane + 1}`);
        this.switchLane(this.currentLane + 1, { source: 'gesture', ...meta });
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

    this.gestureController.onGestureEvent = (event) => {
      this.recordGestureEvent(event);
    };
  }

  updateControlsDisplay() {
    const controlsDiv = document.querySelector('.controls');

    // Check if controlsDiv exists before updating
    if (!controlsDiv) {
      console.log('⚠️ Controls display element not found, skipping update');
      return;
    }

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
        this.switchLane(Math.max(0, this.currentLane - 1), { source: 'keyboard' });
      } else if (e.code === 'ArrowRight' && this.gameRunning) {
        e.preventDefault();
        this.switchLane(Math.min(this.numLanes - 1, this.currentLane + 1), { source: 'keyboard' });
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

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.clearSessionCache();

    // Initialize analytics if enabled
    if (this.analyticsEnabled && this.userRoles.length > 0) {
      initSupabase(); // Initialize Supabase
      this.analytics = new AnalyticsCollector(this.userRoles);
      this.analytics.onSessionStart(this.gameLevel, this.controlMode || 'keyboard');
      console.log('📊 Analytics tracking started');
    }

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
    this.levelCompleted = false;
    this.finishLineY = null;
    this.currentGear = 1; // Start in first gear
    this.currentRPM = this.ENGINE_IDLE_RPM;
    this.shiftCooldown = 0;
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
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.lastDOMUpdateFrame = 0;

    // Reset smart traffic management
    this.lastSpawnedLane = -1;
    this.guaranteedEscapeTimer = 0;

    // Reset one-car-at-a-time flag (challenge modes only)
    this.currentCarHasPassedPlayer = true;

    // Clear traffic
    this.trafficVehicles = [];

    // Reset player position - position at 75% down the screen for better view of incoming traffic
    this.playerCar.position.y = this.canvas.height * 0.75;
    this.playerCar.position.x = this.LANE_POSITIONS[this.currentLane];

    console.log(`✅ Player car positioned at x=${this.LANE_POSITIONS[this.currentLane]}, y=${this.playerCar.position.y}`);
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

    this.resetTelemetry();
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

  updateLivesDisplay() {
    if (!this.livesDisplay) return;

    // Show hearts for current lives
    if (this.lives === Infinity) {
      this.livesDisplay.textContent = '∞';
    } else {
      const hearts = '❤️'.repeat(Math.max(0, this.lives));
      const emptyHearts = '🖤'.repeat(Math.max(0, this.maxLives - this.lives));
      this.livesDisplay.textContent = hearts + emptyHearts;
    }
  }

  handleCollision(vehicle) {
    console.log('💥 COLLISION detected!');

    // Track collision in analytics
    if (this.analytics) {
      this.analytics.onCollision(this.playerCar.position, vehicle.position);
    }

    // Play collision sound
    this.audioEngine.playCollisionSound();

    // Remove the collided vehicle
    const index = this.trafficVehicles.indexOf(vehicle);
    if (index > -1) {
      this.trafficVehicles.splice(index, 1);
    }

    // Reduce life
    if (this.lives !== Infinity) {
      this.lives--;
      console.log(`❤️ Lives remaining: ${this.lives}`);
      this.updateLivesDisplay();

      // Check if game over
      if (this.lives <= 0) {
        console.log('💀 No lives remaining - Game Over!');
        this.gameOver();
      } else {
        // Brief invincibility period - slow down the player car
        console.log(`⚠️ Life lost! ${this.lives} lives remaining`);
        this.playerSpeed = Math.max(this.playerSpeed * 0.5, 30); // Slow down to 50% or minimum 30

        // Visual feedback - flash the screen (can be enhanced with graphics later)
        if (this.graphicsEngine) {
          // TODO: Add screen flash effect
        }
      }
    }
  }

  async levelComplete() {
    console.log('🏁 LEVEL COMPLETE called - gameRunning:', this.gameRunning);
    if (!this.gameRunning) {
      console.log('⚠️ Game already stopped, returning');
      return; // Prevent multiple calls
    }

    console.log('🎉 Stopping game - LEVEL COMPLETED!');
    this.gameRunning = false;
    this.playerSpeed = 0; // Stop the car immediately

    // Play success sound
    console.log('🎉 [LEVEL COMPLETE] Playing reward sound');
    if (this.audioEngine) {
      this.audioEngine.playRewardSound();
    }
    this.audioEngine.fadeOut();

    // Tell parent page to RESTART background music
    console.log('🎵 [LEVEL COMPLETE] Sending message to parent to RESTART background music');
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

    // Handle analytics if enabled - save in background but show game over screen
    if (this.analytics) {
      try {
        // End analytics session
        const sessionData = await this.analytics.endSession();
        sessionData.level_completed = true; // Mark as completed

        // Save to database
        const result = await saveGameSession(sessionData);

        if (result.success) {
          console.log('✅ Session saved to database:', result.sessionId);
        } else {
          console.error('❌ Failed to save session:', result.error);
        }

        // Store session data for later viewing
        this.lastSessionData = sessionData;

        // Telemetry JSON is available via Download Telemetry button
      } catch (error) {
        console.error('❌ Error handling analytics:', error);
        this.lastSessionData = null;
      }
    }

    // Always show level complete screen (with analytics button if enabled)
    console.log('📺 About to call showLevelCompleteScreen()...');
    await this.showLevelCompleteScreen();
    console.log('✅ showLevelCompleteScreen() completed');
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

    // Handle analytics if enabled - save in background but show game over screen
    if (this.analytics) {
      try {
        // End analytics session
        const sessionData = await this.analytics.endSession();
        sessionData.level_completed = false; // Mark as failed

        // Save to database
        const result = await saveGameSession(sessionData);

        if (result.success) {
          console.log('✅ Session saved to database:', result.sessionId);
        } else {
          console.error('❌ Failed to save session:', result.error);
        }

        // Store session data for later viewing
        this.lastSessionData = sessionData;

        // Telemetry JSON is available via Download Telemetry button
      } catch (error) {
        console.error('❌ Error handling analytics:', error);
        this.lastSessionData = null;
      }
    }

    // Always show game over overlay (with analytics button if enabled)
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
    const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');

    if (!overlay) {
      console.error('❌ Game over overlay not found!');
      return;
    }

    // Update stats FIRST - before any async operations
    if (scoreEl) scoreEl.textContent = this.score.toLocaleString();
    if (distanceEl) distanceEl.textContent = Math.round(this.distance) + 'm';
    if (maxSpeedEl) maxSpeedEl.textContent = Math.round(this.maxSpeed);

    // Show/hide analytics button based on whether analytics is enabled
    if (viewAnalyticsBtn) {
      if (this.analyticsEnabled && this.lastSessionData) {
        viewAnalyticsBtn.style.display = 'inline-block';
        viewAnalyticsBtn.onclick = () => {
          this.showAnalyticsReport(this.lastSessionData);
        };
      } else {
        viewAnalyticsBtn.style.display = 'none';
      }
    }

    const telemetryBtn = document.getElementById('gameOverTelemetryBtn');
    if (telemetryBtn) {
      if (this.analyticsEnabled && this.lastSessionData) {
        telemetryBtn.style.display = 'inline-block';
        telemetryBtn.onclick = () => {
          const payload = this.buildTelemetryJson(this.lastSessionData);
          this.downloadTelemetryJson(payload);
        };
      } else {
        telemetryBtn.style.display = 'none';
      }
    }

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

  async showLevelCompleteScreen() {
    const overlay = document.getElementById('gameOverOverlay');
    const scoreEl = document.getElementById('gameOverScore');
    const distanceEl = document.getElementById('gameOverDistance');
    const maxSpeedEl = document.getElementById('gameOverMaxSpeed');
    const nextBtn = document.getElementById('gameOverNextBtn');
    const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');

    if (!overlay) {
      console.error('❌ Game over overlay not found!');
      return;
    }

    // Update the title to show LEVEL COMPLETE
    const titleEl = overlay.querySelector('.game-over-title');
    if (titleEl) {
      titleEl.textContent = `🏁 LEVEL ${this.gameLevel} COMPLETE! 🎉`;
      titleEl.style.color = '#00ff88'; // Green for success
    }

    // Update stats
    if (scoreEl) scoreEl.textContent = this.score.toLocaleString();
    if (distanceEl) distanceEl.textContent = Math.round(this.distance) + 'm / ' + this.targetDistance + 'm';
    if (maxSpeedEl) maxSpeedEl.textContent = Math.round(this.maxSpeed);

    // Show/hide analytics button based on whether analytics is enabled
    if (viewAnalyticsBtn) {
      if (this.analyticsEnabled && this.lastSessionData) {
        viewAnalyticsBtn.style.display = 'inline-block';
        viewAnalyticsBtn.onclick = () => {
          this.showAnalyticsReport(this.lastSessionData);
        };
      } else {
        viewAnalyticsBtn.style.display = 'none';
      }
    }

    const telemetryBtn = document.getElementById('gameOverTelemetryBtn');
    if (telemetryBtn) {
      if (this.analyticsEnabled && this.lastSessionData) {
        telemetryBtn.style.display = 'inline-block';
        telemetryBtn.onclick = () => {
          const payload = this.buildTelemetryJson(this.lastSessionData);
          this.downloadTelemetryJson(payload);
        };
      } else {
        telemetryBtn.style.display = 'none';
      }
    }

    // Show overlay IMMEDIATELY
    overlay.style.display = 'flex';
    overlay.classList.add('show');

    // Handle next level button
    if (nextBtn) {
      if (this.gameLevel < 5) {
        // Can go to next level
        nextBtn.disabled = false;
        nextBtn.textContent = `➡️ Level ${this.gameLevel + 1}`;
        nextBtn.title = `Go to Level ${this.gameLevel + 1}`;
      } else {
        // Already on final level
        nextBtn.disabled = true;
        nextBtn.textContent = '🏆 All Levels Complete!';
        nextBtn.title = 'You completed all levels!';
      }
    }

    console.log('✅ showLevelCompleteScreen() complete');
  }

  hideGameOverScreen() {
    const overlay = document.getElementById('gameOverOverlay');
    overlay.style.display = 'none';
    overlay.classList.remove('show');

    // Reset title back to game over
    const titleEl = overlay.querySelector('.game-over-title');
    if (titleEl) {
      titleEl.textContent = '💥 GAME OVER! 💥';
      titleEl.style.color = ''; // Reset color
    }
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
    console.log('➡️ Going to Next Level from Level', this.gameLevel);

    if (this.gameLevel < 5) {
      // Go to next level
      this.hideGameOverScreen();

      // Stop audio and gesture controller
      this.audioEngine.fadeOut();
      if (this.gestureController) {
        this.gestureController.stop();
        this.gestureController.hideWebcam();
      }

      // Navigate to next level
      const nextLevel = this.gameLevel + 1;
      console.log(`🚀 Navigating to Level ${nextLevel}`);
      window.location.href = `index.html?level=${nextLevel}`;
    } else {
      alert('🏆 Congratulations! You have completed all levels!');
    }
  }

  /**
   * Show analytics report modal
   */
  showAnalyticsReport(sessionData) {
    const modal = document.getElementById('analyticsModal');
    const content = document.getElementById('analyticsContent');

    if (!modal || !content) {
      console.error('Analytics modal not found');
      return;
    }

    // Generate report HTML
    const reportHTML = generateAnalyticsReport(sessionData, this.userRoles);
    content.innerHTML = reportHTML;

    // Show modal
    modal.style.display = 'flex';

    // Button handlers
    const closeBtn = document.getElementById('closeAnalyticsBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const downloadBtn = document.getElementById('downloadReportBtn');
    const downloadTelemetryBtn = document.getElementById('downloadTelemetryBtn');

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.style.display = 'none';
      };
    }

    if (playAgainBtn) {
      playAgainBtn.onclick = () => {
        modal.style.display = 'none';
        setTimeout(() => {
          this.startGame(); // Restart game
        }, 300);
      };
    }

    if (downloadBtn) {
      downloadBtn.onclick = () => {
        this.downloadAnalyticsReport(sessionData);
      };
    }

    if (downloadTelemetryBtn) {
      downloadTelemetryBtn.onclick = () => {
        const telemetryPayload = this.buildTelemetryJson(sessionData);
        this.downloadTelemetryJson(telemetryPayload);
      };
    }
  }

  /**
   * Download analytics report as JSON
   */
  downloadAnalyticsReport(sessionData) {
    const dataStr = JSON.stringify(sessionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `sonic-drive-analytics-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    console.log('📥 Analytics report downloaded');
  }

  resetTelemetry() {
    this.telemetrySamples = [];
    this.gestureEvents = { left: [], right: [] };
    this.laneChangeEvents = [];
    this.kinematicSamples = [];
    this.lastTelemetryTs = 0;
    this.lastHolisticTs = 0;
    this.levelStartPerf = performance.now();
    this.lastScoreSample = this.score;
    this.holisticHandedness = null;
  }

  recordGestureEvent(event) {
    if (!event || !this.levelStartPerf) return;
    const hand = event.hand === 'left' || event.hand === 'right' ? event.hand : null;
    if (!hand) return;
    const now = performance.now();
    const t = Math.max(0, Math.round(now - this.levelStartPerf));
    this.gestureEvents[hand].push({
      t,
      gesture: event.gesture || 'unknown',
      confidence: event.confidence ?? null,
      latency_ms: event.latency_ms ?? null
    });
    this.holisticHandedness = hand;
  }

  recordLaneChange({ from_lane, to_lane, trigger }) {
    if (!this.levelStartPerf) return;
    const t = Math.max(0, Math.round(performance.now() - this.levelStartPerf));
    this.laneChangeEvents.push({
      t,
      from_lane,
      to_lane,
      trigger: trigger || { source: 'unknown' }
    });
  }

  captureTelemetrySample() {
    if (!this.gameRunning || !this.levelStartPerf) return;
    const now = performance.now();
    if (now - this.lastTelemetryTs < this.telemetrySampleIntervalMs) return;
    this.lastTelemetryTs = now;

    const t = Math.max(0, Math.round(now - this.levelStartPerf));
    const scoreTotal = Number(this.score || 0);
    const scoreDelta = scoreTotal - Number(this.lastScoreSample || 0);
    this.lastScoreSample = scoreTotal;

    const livesLeft = this.lives === Infinity ? null : this.lives;
    const livesUsed = this.lives === Infinity ? 0 : Math.max(0, (this.maxLives || 0) - (this.lives || 0));
    const distanceLeft = Math.max(0, (this.targetDistance || 0) - (this.distance || 0));

    const traffic = (this.trafficVehicles || [])
      .map((vehicle) => {
        const distanceAhead = this.playerCar.position.y - vehicle.position.y;
        return {
          lane: vehicle.lane,
          distance_ahead: Math.round(distanceAhead),
          position: {
            x: vehicle.position.x,
            y: vehicle.position.y
          },
          is_active: 1
        };
      })
      .filter((vehicle) => vehicle.distance_ahead >= 0);

    this.telemetrySamples.push({
      t,
      lane: this.currentLane,
      speed: this.playerSpeed,
      distance: this.distance,
      distance_left: distanceLeft,
      score_delta: scoreDelta,
      score_total: scoreTotal,
      lives_used: livesUsed,
      lives_left: livesLeft,
      traffic
    });
  }

  initHolisticIfNeeded() {
    if (this.holistic || typeof Holistic === 'undefined') return;
    try {
      this.holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
      });

      this.holistic.setOptions({
        modelComplexity: 0,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        refineFaceLandmarks: false
      });

      this.holistic.onResults((results) => this.onHolisticResults(results));
      console.log('✅ Holistic initialized for Sonic Drive telemetry');
    } catch (error) {
      console.warn('Failed to initialize Holistic:', error);
    }
  }

  captureHolisticFrame() {
    if (!this.holistic || this.holisticBusy) return;
    if (!this.analyticsEnabled || this.userRoles.length === 0) return;
    if (this.controlMode !== 'gesture' || !this.gestureController) return;
    const video = this.gestureController.videoElement;
    if (!video || video.readyState < 2) return;
    const now = performance.now();
    if (now - this.lastHolisticTs < this.holisticSampleIntervalMs) return;
    this.lastHolisticTs = now;

    this.holisticBusy = true;
    this.holistic.send({ image: video })
      .catch(() => {})
      .finally(() => { this.holisticBusy = false; });
  }

  onHolisticResults(results) {
    if (!results || !results.poseLandmarks || !this.levelStartPerf) return;

    const left = { shoulder: 11, elbow: 13, wrist: 15 };
    const right = { shoulder: 12, elbow: 14, wrist: 16 };

    const ls = results.poseLandmarks[left.shoulder];
    const le = results.poseLandmarks[left.elbow];
    const lw = results.poseLandmarks[left.wrist];
    const rs = results.poseLandmarks[right.shoulder];
    const re = results.poseLandmarks[right.elbow];
    const rw = results.poseLandmarks[right.wrist];

    if (!ls || !le || !lw || !rs || !re || !rw) return;

    const video = this.gestureController?.videoElement;
    const videoWidth = video?.videoWidth || 640;
    const videoHeight = video?.videoHeight || 480;

    const t = Math.max(0, Math.round(performance.now() - this.levelStartPerf));
    this.kinematicSamples.push({
      t,
      l_s: [ls.x * videoWidth, ls.y * videoHeight],
      l_e: [le.x * videoWidth, le.y * videoHeight],
      l_w: [lw.x * videoWidth, lw.y * videoHeight],
      r_s: [rs.x * videoWidth, rs.y * videoHeight],
      r_e: [re.x * videoWidth, re.y * videoHeight],
      r_w: [rw.x * videoWidth, rw.y * videoHeight]
    });
  }

  buildTelemetryJson(sessionData = {}) {
    const landmarks = {
      "11": [],
      "13": [],
      "15": [],
      "12": [],
      "14": [],
      "16": []
    };

    this.kinematicSamples.forEach((sample) => {
      if (sample.l_s) landmarks["11"].push({ x: sample.l_s[0], y: sample.l_s[1], z: 0, t: sample.t });
      if (sample.l_e) landmarks["13"].push({ x: sample.l_e[0], y: sample.l_e[1], z: 0, t: sample.t });
      if (sample.l_w) landmarks["15"].push({ x: sample.l_w[0], y: sample.l_w[1], z: 0, t: sample.t });
      if (sample.r_s) landmarks["12"].push({ x: sample.r_s[0], y: sample.r_s[1], z: 0, t: sample.t });
      if (sample.r_e) landmarks["14"].push({ x: sample.r_e[0], y: sample.r_e[1], z: 0, t: sample.t });
      if (sample.r_w) landmarks["16"].push({ x: sample.r_w[0], y: sample.r_w[1], z: 0, t: sample.t });
    });

    return {
      session_meta: {
        session_id: sessionData.session_id || null,
        level: this.gameLevel,
        lanes: this.numLanes,
        control_mode: this.controlMode || 'keyboard'
      },
      clinical_targets: [
        {
          domain: 'motor',
          body_part: 'hand',
          laterality: 'both',
          focus: 'fine_motor'
        }
      ],
      kinematic_telemetry: {
        framework: 'mediapipe_holistic_v1',
        coord_space: 'camera_pixels',
        sample_rate_hz: 5,
        frame_size: {
          width: this.gestureController?.videoElement?.videoWidth || 640,
          height: this.gestureController?.videoElement?.videoHeight || 480
        },
        landmark_aliases: {
          left_shoulder: "11",
          left_elbow: "13",
          left_wrist: "15",
          right_shoulder: "12",
          right_elbow: "14",
          right_wrist: "16"
        },
        landmarks
      },
      environment_state: {
        timeline: this.telemetrySamples
      },
      interactable_objects: [
        {
          object_id: 'left_hand',
          object_type: 'hand',
          timeline: this.gestureEvents.left
        },
        {
          object_id: 'right_hand',
          object_type: 'hand',
          timeline: this.gestureEvents.right
        },
        {
          object_id: 'lane_changes',
          object_type: 'action',
          timeline: this.laneChangeEvents
        }
      ]
    };
  }

  downloadTelemetryJson(payload) {
    if (!payload) return;
    try {
      const filename = `sonic-drive-telemetry-${Date.now()}.json`;
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', filename);
      linkElement.click();
      URL.revokeObjectURL(url);
      console.log('📥 Telemetry JSON downloaded');
    } catch (error) {
      console.warn('Telemetry download failed:', error);
    }
  }

  clearSessionCache() {
    this.telemetrySamples = [];
    this.gestureEvents = { left: [], right: [] };
    this.laneChangeEvents = [];
    this.kinematicSamples = [];
    this.lastTelemetryTs = 0;
    this.lastHolisticTs = 0;
    this.lastScoreSample = this.score;

    // Clear traffic and associated horns
    if (this.audioEngine && this.audioEngine.carHorns) {
      for (const vehicleId of this.audioEngine.carHorns.keys()) {
        this.audioEngine.stopHornForVehicle(vehicleId, this.audioEngine.audioCtx?.currentTime || 0);
      }
    }
    this.trafficVehicles = [];
  }

  switchLane(newLane, triggerMeta = {}) {
    if (this.currentLane === newLane || !this.gameRunning) return;

    // Validate lane bounds to prevent going outside the road
    if (newLane < 0 || newLane >= this.numLanes) {
      console.warn(`⚠️ Invalid lane ${newLane}! Valid lanes: 0 to ${this.numLanes - 1}`);
      return;
    }

    const oldLane = this.currentLane;
    this.currentLane = newLane;
    const targetX = this.LANE_POSITIONS[this.currentLane];

    // Update player position directly
    this.playerCar.position.x = targetX;

    // Track lane change in analytics
    if (this.analytics) {
      this.analytics.onLaneChange(oldLane, newLane, this.playerCar.position, this.trafficVehicles);
    }

    this.recordLaneChange({
      from_lane: oldLane,
      to_lane: newLane,
      trigger: triggerMeta
    });

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
      if (this.USE_CUSTOM_MODELS) {
        // Custom models: check if index finger gesture is active
        const rightGesture = this.gestureController.handStates.right.gesture;
        const leftGesture = this.gestureController.handStates.left.gesture;

        if (rightGesture !== 'right hand index') {
          this.keys.up = false;
        }
        if (leftGesture !== 'left hand index') {
          this.keys.down = false;
        }
      } else {
        // Standard controller: check pointing/thumbs up gestures
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
    }

    // ========================================
    // REALISTIC GEAR-BASED RACING PHYSICS
    // ========================================
    // This system simulates how real cars accelerate differently in each gear
    // - Low gears: High torque multiplication, strong acceleration, limited top speed
    // - High gears: Low torque multiplication, weak acceleration, high top speed

    const currentSpeed = this.playerSpeed;

    // Calculate current RPM based on speed and gear
    this.currentRPM = this.calculateRPM(currentSpeed, this.currentGear);

    // Get engine torque at current RPM (follows realistic torque curve)
    const engineTorque = this.calculateEngineTorque(this.currentRPM);

    // Multiply by gear ratio and final drive to get wheel torque
    const gearRatio = this.GEAR_RATIOS[this.currentGear - 1];
    const wheelTorque = engineTorque * gearRatio * this.FINAL_DRIVE;

    // Calculate resistance forces
    const airDragForce = this.DRAG_COEFFICIENT * currentSpeed * currentSpeed;
    const rollingResistance = this.ROLLING_RESISTANCE * currentSpeed;
    const totalResistance = airDragForce + rollingResistance;

    if (this.keys.up && !this.keys.down) {
      // ===== ACCELERATION MODE =====
      // Calculate net driving force (torque converted to force)
      // Wheel torque / wheel radius = force at ground
      const drivingForce = wheelTorque * 0.15; // 0.15 is an approximate conversion factor

      // Net force = Driving force - Resistance
      const netForce = drivingForce - totalResistance;

      // Acceleration = Force / Mass (Newton's 2nd law: F = ma)
      const acceleration = netForce / this.VEHICLE_MASS;

      // Update speed
      this.playerSpeed = Math.max(0, Math.min(currentSpeed + acceleration, this.MAX_SPEED));

      // Automatic gear shifting
      this.autoGearShift(this.playerSpeed);

      // Prevent going over redline in current gear
      if (this.currentRPM >= this.ENGINE_MAX_RPM * 0.98) {
        // Rev limiter - cut power near redline
        this.playerSpeed = Math.min(this.playerSpeed, currentSpeed + 0.1);
      }

    } else if (this.keys.down) {
      // ===== BRAKING MODE =====
      // Gradual braking that feels natural
      const brakingDeceleration = this.BRAKE_FORCE + (totalResistance / this.VEHICLE_MASS);
      this.playerSpeed = Math.max(currentSpeed - brakingDeceleration, 0);

      // Automatic downshift during braking
      this.autoGearShift(this.playerSpeed);

      // Smooth stop at very low speeds (no sudden jump to 0)
      // Only force stop if speed is extremely low (< 0.3 km/h)
      if (this.playerSpeed < 0.3) {
        this.playerSpeed = 0;
        this.currentGear = 1; // Back to first gear when stopped
      }

    } else {
      // ===== COASTING MODE (ENGINE BRAKING) =====
      // Natural deceleration from resistance forces + engine braking
      const engineBraking = gearRatio * 0.3; // Lower gears provide more engine braking
      const coastingDeceleration = (totalResistance + engineBraking) / this.VEHICLE_MASS;

      this.playerSpeed = Math.max(currentSpeed - coastingDeceleration, 0);

      // Automatic downshift when coasting
      this.autoGearShift(this.playerSpeed);

      // Complete stop at very low speeds
      if (this.playerSpeed < 0.5) {
        this.playerSpeed = 0;
        this.currentGear = 1; // Back to first gear when stopped
      }
    }

    // Track max speed
    if (this.playerSpeed > this.maxSpeed) {
      this.maxSpeed = this.playerSpeed;
    }

    // KEEP PLAYER CAR FIXED (only x changes with lane switching)
    // Position at 75% down screen for better visibility of incoming traffic
    this.playerCar.position.y = this.canvas.height * 0.75;

    // Move traffic vehicles down (they come toward the player)
    // ONLY move if player has speed - no base movement when stopped
    const moveSpeed = this.playerSpeed * 0.05;
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

        // Track successful dodge in analytics
        if (this.analytics) {
          this.analytics.onSuccessfulDodge(vehicle.position);
        }

        // Play reward sound for successfully dodging the car
        if (this.audioEngine) {
          this.audioEngine.playRewardSound();
        }
      }
    }

    // Get current difficulty parameters
    const difficulty = this.calculateDifficulty();

    // Spawn new vehicles based on dynamic spawn interval and max cars
    // ONLY SPAWN IF hasTraffic is true (Levels 3, 4, 5)
    if (this.hasTraffic && !this.isFreeMode) {
      // ONE CAR AT A TIME - TOTAL ACROSS ALL LANES
      // Only ONE car should exist on the entire road at any given time

      // Spawn timer logic
      this.spawnTimer += 16;

      if (this.spawnTimer >= difficulty.currentSpawnInterval) {
        // Only spawn if NO cars exist on the road
        if (this.trafficVehicles.length === 0) {
          // Spawn a new car in a random lane
          const randomLane = Math.floor(Math.random() * this.numLanes);
          const x = this.LANE_POSITIONS[randomLane];
          // Spawn car just above screen (horn will trigger when Y reaches 0)
          const y = -100;

          const vehicle = {
            position: { x, y },
            width: 40,
            height: 70,
            lane: randomLane
          };

          this.trafficVehicles.push(vehicle);

          // Track car spawn in analytics
          if (this.analytics) {
            this.analytics.onCarSpawn(vehicle.position, vehicle.lane);
          }

          // Get lane name for logging
          let laneNames;
          if (this.numLanes === 2) {
            laneNames = ['LEFT', 'RIGHT'];
          } else if (this.numLanes === 3) {
            laneNames = ['LEFT', 'CENTER', 'RIGHT'];
          } else if (this.numLanes === 4) {
            laneNames = ['LANE 1', 'LANE 2', 'LANE 3', 'LANE 4'];
          }

          console.log(`🚙 ONE-CAR SPAWN: ${laneNames[randomLane]} lane (Total cars: ${this.trafficVehicles.length})`);

          // Log difficulty changes
          if (this.lastLoggedDifficulty !== difficulty.difficultyLevel) {
            this.lastLoggedDifficulty = difficulty.difficultyLevel;
            console.log(`📈 DIFFICULTY INCREASED! Level ${difficulty.difficultyLevel} | Spawn: ${difficulty.currentSpawnInterval}ms`);
          }
        }
        this.spawnTimer = 0;
      }
    }

    // Check collisions - end game immediately on hit
    // OPTIMIZED: Use squared distance to avoid expensive Math.sqrt()
    const collisionThresholdSquared = 80 * 80; // 6400
    const playerX = this.playerCar.position.x;
    const playerY = this.playerCar.position.y;

    // Update proximity warnings - pass ALL vehicles ahead of player
    // Don't filter by distance, let audioEngine decide when to play horn
    const nearbyVehicles = [];
    for (let i = 0; i < this.trafficVehicles.length; i++) {
      const vehicle = this.trafficVehicles[i];
      // Only check vehicles in front (lower Y), no distance limit
      if (vehicle.position.y < playerY) {
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
        this.handleCollision(vehicle);
        return; // Stop processing immediately
      }
    }

    // Update distance
    this.distance += this.playerSpeed * 0.016;

    // Calculate finish line position on screen
    // The finish line is at targetDistance meters
    // Player is at playerCar.position.y (fixed at 75% of screen)
    // Calculate how far away finish line is from player in meters
    const distanceToFinish = this.targetDistance - this.distance;

    // Convert distance to screen position
    // Scale: 1 meter = 1 pixel roughly (can adjust for visibility)
    // Finish line moves up as player approaches it
    // Use this.playerCar.position.y directly (playerY already declared above)
    this.finishLineY = this.playerCar.position.y - distanceToFinish;

    // Check if level is completed (reached target distance)
    if (!this.levelCompleted && this.distance >= this.targetDistance) {
      this.levelCompleted = true;
      console.log(`🏁 LEVEL ${this.gameLevel} COMPLETED! Distance: ${Math.round(this.distance)}m / ${this.targetDistance}m`);
      this.levelComplete();
      return; // Stop further updates
    }

    // Update score in analytics continuously
    if (this.analytics) {
      this.analytics.onScoreUpdate(this.score, this.distance);
    }
  }

  updateGame(deltaTime = 16) {
    if (!this.gameRunning) return;

    // No physics engine - just update game state
    this.updatePhysics();

    if (this.analyticsEnabled && this.userRoles.length > 0) {
      this.captureTelemetrySample();
      this.captureHolisticFrame();
    }

    // Update audio - pass current gear to audio engine
    this.audioEngine.gear = this.currentGear; // Sync gear with audio
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
    const currentGear = this.currentGear; // Use game's gear, not audio engine's
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

      // Draw finish line (if close enough to be visible)
      if (this.finishLineY !== null && this.finishLineY > -200 && this.finishLineY < this.canvas.height + 200) {
        const roadWidth = this.canvas.width * 0.6;
        const roadLeft = (this.canvas.width - roadWidth) / 2;
        this.graphics.drawFinishLineCanvas(this.finishLineY, roadWidth, roadLeft);
      }

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
