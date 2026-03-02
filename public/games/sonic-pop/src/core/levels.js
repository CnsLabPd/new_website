// Module-Based Level Configuration System for Audio Balloon Pop Game

class LevelManager {
    constructor() {
        this.modules = this.initializeModules();
        this.levels = this.initializeLevels();
        this.currentLevel = 1;
        this.currentModule = 1;
    }

    initializeModules() {
        return {
            1: {
                name: "Balloon Shooting Games",
                description: "Put your skills to the test with moving targets and obstacles",
                levels: [1, 2, 3, 4],
                icon: "🎯"
            }
        };
    }

    initializeLevels() {
        return {
            1: {
                name: "Floating Hunter",
                description: "The real challenge begins! Hunt moving balloons that float across the screen. Use all your skills!",
                difficulty: "Challenge",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "random",
                    balloonCount: 1,
                    timeLimit: 180, // 3 minutes
                    balloonsToComplete: 15,

                    // Movement settings
                    movementEnabled: true,
                    balloonSpeed: 0.5, // Slow movement for first moving level
                    movementRange: 50, // Movement radius in pixels

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,

                    // Scoring
                    pointsPerBalloon: 200,
                    timeBonus: true
                },

                instructions: "Welcome to Level 1! Balloons will MOVE slowly across the screen. Listen to the 3D audio beeps - they update as the balloon moves. Track the sound, follow it with your hand, and pop the balloon! The beep speed tells you how close you are. Good luck, hunter!",

                completionMessage: "Incredible! You've proven yourself as a true Floating Hunter! You can track and catch moving targets!"
            },

            2: {
                name: "Bomb Dodger",
                description: "Ultimate challenge! Pop balloons while avoiding the dangerous bomb that floats nearby. Progressive difficulty!",
                difficulty: "Expert",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "edge-spawn", // NEW: Spawn from edges and float inward
                    balloonCount: 1,
                    timeLimit: 240, // 4 minutes (more time!)
                    balloonsToComplete: 10, // Reduced from 12 to 10

                    // Movement settings - START SLOW
                    movementEnabled: true,
                    balloonSpeed: 0.4, // SLOWER start (was 0.6)
                    movementRange: 40, // SMALLER range (was 60)

                    // Bomb settings
                    hasBomb: true,
                    bombEnabled: true,
                    bombCount: 1,
                    bombSpeed: 0.2, // MUCH slower than balloon (was 0.4)
                    bombMovementRange: 30, // Smaller movement range
                    bombDangerRadius: 150, // How close before danger sound increases

                    // Progressive difficulty
                    progressiveDifficulty: true,
                    speedIncreasePerBalloon: 0.05, // Speed increases gradually
                    maxBalloonSpeed: 0.8,
                    maxBombSpeed: 0.5,

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    bombAudioEnabled: true,
                    bombDangerSound: "ticking", // Ticking sound that speeds up when close

                    // Victory rewards
                    pointsPerBalloon: 300, // INCREASED from 250
                    timeBonus: true,
                    bombPenalty: -300, // REDUCED penalty (was -500)

                    // Encouragement system
                    encouragementEnabled: true,
                    encouragementInterval: 3, // Every 3 balloons

                    // Freeze bomb feature
                    bombFreezeOnHit: true, // Bomb freezes for 3 seconds after balloon pop
                    bombFreezeDuration: 3000 // 3 seconds
                },

                instructions: "Welcome to Level 2! A BOMB floats on screen. Listen: the balloon beeps from one side, the bomb ticks from the OPPOSITE side. Start SLOW - both move gently. Each balloon you pop makes them slightly faster. The bomb FREEZES for 3 seconds when you pop a balloon - use that time wisely! You can do this!",

                completionMessage: "INCREDIBLE! You've mastered the most difficult level! You can track targets while avoiding danger. You are a true Audio Balloon Pop champion!"
            },

            3: {
                name: "Multi-Balloon Rush",
                description: "Speed challenge! 10 balloons spawn at once across the screen. Pop them all before time runs out!",
                difficulty: "Challenge",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "random-spread", // Spread across entire screen
                    balloonCount: 10, // 10 balloons at once!
                    timeLimit: 60, // 60 seconds
                    balloonsToComplete: 10,

                    // Movement settings
                    movementEnabled: true,
                    balloonSpeed: 0.5, // Slow movement
                    movementRange: 50, // Movement radius in pixels

                    // Multi-balloon settings
                    spawnAllAtOnce: true, // Spawn all 10 at start
                    spreadAcrossScreen: true, // Use entire screen area

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,

                    // No bombs in this level
                    hasBomb: false,
                    bombEnabled: false,

                    // Scoring
                    pointsPerBalloon: 200,
                    timeBonus: true
                },

                instructions: "Welcome to Multi-Balloon Rush! This is a speed challenge. 10 balloons will spawn across the entire screen at once. They all move slowly. You have 60 seconds to pop all 10 balloons. Listen carefully to the 3D audio - each balloon beeps from its position. Track them one by one and pop them all! Good luck!",

                completionMessage: "Amazing! You popped all 10 balloons! You've mastered multi-target tracking!"
            },

            4: {
                name: "Bomb Field Challenge",
                description: "Ultimate challenge! 10 balloons and 1 dangerous bomb. You have 4 lives - don't hit the bomb!",
                difficulty: "Expert",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "random-spread", // Spread across entire screen
                    balloonCount: 10, // 10 balloons at once!
                    timeLimit: 120, // 2 minutes
                    balloonsToComplete: 10,

                    // Movement settings
                    movementEnabled: true,
                    balloonSpeed: 0.5, // Slow movement
                    movementRange: 50, // Movement radius in pixels

                    // Multi-balloon settings
                    spawnAllAtOnce: true, // Spawn all 10 at start
                    spreadAcrossScreen: true, // Use entire screen area

                    // Bomb settings
                    hasBomb: true,
                    bombEnabled: true,
                    bombCount: 1,
                    bombSpeed: 0.3, // Slower than balloons
                    bombMovementRange: 40,
                    bombDangerRadius: 150,

                    // Lives system (NEW!)
                    hasLives: true,
                    startingLives: 4, // Start with 4 lives
                    loseLifeOnBombHit: true, // Lose 1 life when hitting bomb
                    gameOverOnNoLives: true, // Game over when lives = 0

                    // Bomb freeze feature
                    bombFreezeOnHit: true, // Bomb freezes when balloon is popped
                    bombFreezeDuration: 3000, // 3 seconds

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    bombAudioEnabled: true,
                    bombDangerSound: "ticking",

                    // Scoring - NO PENALTY for bomb hits (only lose lives)
                    pointsPerBalloon: 300,
                    timeBonus: true,
                    bombPenalty: 0, // No points deduction!

                    // Encouragement system
                    encouragementEnabled: true,
                    encouragementInterval: 3 // Every 3 balloons
                },

                instructions: "Welcome to Bomb Field Challenge! 10 balloons and 1 bomb spawn across the screen. You have 4 lives. Pop all 10 balloons within 2 minutes. Each time you hit the bomb, you lose 1 life. Lose all 4 lives and it's game over! The bomb freezes for 3 seconds when you pop a balloon. Listen carefully: balloons beep, bombs tick. You can do this!",

                completionMessage: "INCREDIBLE! You've conquered the Bomb Field Challenge! You are a true master of audio balloon popping!"
            }

        };
    }

    getLevel(levelNumber) {
        return this.levels[levelNumber] || null;
    }

    getCurrentLevel() {
        return this.getLevel(this.currentLevel);
    }

    setLevel(levelNumber) {
        if (this.levels[levelNumber]) {
            this.currentLevel = levelNumber;
            return true;
        }
        return false;
    }

    getTotalLevels() {
        return Object.keys(this.levels).length;
    }

    getNextLevel() {
        const nextLevel = this.currentLevel + 1;
        return this.getLevel(nextLevel);
    }

    hasNextLevel() {
        return this.getNextLevel() !== null;
    }

    advanceLevel() {
        if (this.hasNextLevel()) {
            this.currentLevel++;
            return true;
        }
        return false;
    }

    getLevelProgress(balloonsPopped) {
        const level = this.getCurrentLevel();
        if (!level) return 0;
        const target = level.config.balloonsToComplete || 1;
        return Math.min(100, (balloonsPopped / target) * 100);
    }

    isLevelComplete(balloonsPopped) {
        const level = this.getCurrentLevel();
        if (!level) return false;
        const target = level.config.balloonsToComplete || 1;
        return balloonsPopped >= target;
    }

    // Module-related methods
    getModule(moduleNumber) {
        return this.modules[moduleNumber] || null;
    }

    getAllModules() {
        return this.modules;
    }

    getTotalModules() {
        return Object.keys(this.modules).length;
    }

    getModuleByLevel(levelNumber) {
        for (let moduleNum in this.modules) {
            const module = this.modules[moduleNum];
            if (module.levels.includes(levelNumber)) {
                return {
                    number: parseInt(moduleNum),
                    ...module
                };
            }
        }
        return null;
    }

    getLevelsInModule(moduleNumber) {
        const module = this.modules[moduleNumber];
        if (!module) return [];

        // Filter out any levels that don't exist in the levels object
        return module.levels
            .filter(levelNum => this.levels[levelNum] !== undefined)
            .map(levelNum => ({
                number: levelNum,
                ...this.levels[levelNum]
            }));
    }

    setModule(moduleNumber) {
        if (this.modules[moduleNumber]) {
            this.currentModule = moduleNumber;
            return true;
        }
        return false;
    }

    getCurrentModule() {
        return this.getModule(this.currentModule);
    }
}

// Balloon Position Generator for different level types
class BalloonPositionGenerator {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    updateCanvas(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    // Generate position based on level config
    generatePosition(levelConfig) {
        if (levelConfig.balloonBehavior === "static") {
            return this.getStaticPosition(levelConfig);
        } else if (levelConfig.positions === "edge-spawn") {
            // Level 6: Spawn from edges/corners and float inward
            return this.getEdgeSpawnPosition();
        } else {
            return this.getRandomCenteredPosition();
        }
    }

    // Get static position for Level 1 & 2
    getStaticPosition(levelConfig) {
        const positions = Object.keys(levelConfig.staticPositions);
        const randomKey = positions[Math.floor(Math.random() * positions.length)];
        const posData = levelConfig.staticPositions[randomKey];

        return {
            x: posData.x * this.canvasWidth,
            y: posData.y * this.canvasHeight,
            direction: randomKey, // "left", "right", "top", "bottom", etc.
            isStatic: true
        };
    }

    // Get random centered position for moving levels
    // Balloons spawn in center 60% of screen to keep them reachable for kids
    getRandomCenteredPosition() {
        const centerX = this.canvasWidth / 2;
        const centerY = this.canvasHeight / 2;

        // Spawn in center 60% of screen (30% radius from center)
        // This keeps balloons away from edges where kids can't reach easily
        const maxRadiusX = this.canvasWidth * 0.3;  // 30% radius horizontally
        const maxRadiusY = this.canvasHeight * 0.3; // 30% radius vertically

        // Random position within the center zone
        const angle = Math.random() * Math.PI * 2;
        const radiusX = Math.random() * maxRadiusX;
        const radiusY = Math.random() * maxRadiusY;

        return {
            x: centerX + Math.cos(angle) * radiusX,
            y: centerY + Math.sin(angle) * radiusY,
            direction: "random",
            isStatic: false
        };
    }

    // NEW: Get position from edge/corner that will float inward
    // Used for Level 6 to make balloons/bombs enter from corners naturally
    getEdgeSpawnPosition() {
        const margin = 100; // Distance from edge to spawn
        const centerX = this.canvasWidth / 2;
        const centerY = this.canvasHeight / 2;

        // Choose a random edge/corner region
        // 0: top-left corner, 1: top-right, 2: bottom-left, 3: bottom-right
        // 4: left edge, 5: right edge, 6: top edge, 7: bottom edge
        const region = Math.floor(Math.random() * 8);

        let x, y, velocityTowardCenter;

        switch(region) {
            case 0: // Top-left corner
                x = margin + Math.random() * (this.canvasWidth * 0.2);
                y = margin + Math.random() * (this.canvasHeight * 0.2);
                break;
            case 1: // Top-right corner
                x = this.canvasWidth - margin - Math.random() * (this.canvasWidth * 0.2);
                y = margin + Math.random() * (this.canvasHeight * 0.2);
                break;
            case 2: // Bottom-left corner
                x = margin + Math.random() * (this.canvasWidth * 0.2);
                y = this.canvasHeight - margin - Math.random() * (this.canvasHeight * 0.2);
                break;
            case 3: // Bottom-right corner
                x = this.canvasWidth - margin - Math.random() * (this.canvasWidth * 0.2);
                y = this.canvasHeight - margin - Math.random() * (this.canvasHeight * 0.2);
                break;
            case 4: // Left edge
                x = margin + Math.random() * 50;
                y = this.canvasHeight * 0.3 + Math.random() * this.canvasHeight * 0.4;
                break;
            case 5: // Right edge
                x = this.canvasWidth - margin - Math.random() * 50;
                y = this.canvasHeight * 0.3 + Math.random() * this.canvasHeight * 0.4;
                break;
            case 6: // Top edge
                x = this.canvasWidth * 0.3 + Math.random() * this.canvasWidth * 0.4;
                y = margin + Math.random() * 50;
                break;
            case 7: // Bottom edge
                x = this.canvasWidth * 0.3 + Math.random() * this.canvasWidth * 0.4;
                y = this.canvasHeight - margin - Math.random() * 50;
                break;
        }

        // Calculate initial velocity toward center (gentle inward movement)
        const dx = centerX - x;
        const dy = centerY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 0.3; // Slow inward drift

        velocityTowardCenter = {
            x: (dx / distance) * speed,
            y: (dy / distance) * speed
        };

        return {
            x: x,
            y: y,
            direction: "edge-spawn",
            isStatic: false,
            initialVelocity: velocityTowardCenter, // Will be used to set initial movement
            spawnRegion: region
        };
    }

    // Get position name for audio announcement
    getPositionName(direction) {
        const names = {
            left: "Left",
            right: "Right",
            top: "Top",
            bottom: "Bottom",
            topLeft: "Top Left",
            topRight: "Top Right",
            bottomLeft: "Bottom Left",
            bottomRight: "Bottom Right"
        };
        return names[direction] || "Center";
    }

    // Get 3D audio coordinates for static positions
    get3DAudioPosition(direction, canvasWidth, canvasHeight) {
        // Map directions to 3D space coordinates for better audio separation
        const audioMap = {
            left: { x: -4, y: 0, z: 2 },
            right: { x: 4, y: 0, z: 2 },
            top: { x: 0, y: 3, z: 2 },
            bottom: { x: 0, y: -3, z: 2 },
            topLeft: { x: -3, y: 2.5, z: 2 },
            topRight: { x: 3, y: 2.5, z: 2 },
            bottomLeft: { x: -3, y: -2.5, z: 2 },
            bottomRight: { x: 3, y: -2.5, z: 2 }
        };
        return audioMap[direction] || { x: 0, y: 0, z: 2 };
    }
}

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LevelManager, BalloonPositionGenerator };
} else {
    window.LevelManager = LevelManager;
    window.BalloonPositionGenerator = BalloonPositionGenerator;
}
