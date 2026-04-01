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
                description: "2-minute challenge! Pop as many moving balloons as you can!",
                difficulty: "Challenge",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "random",
                    balloonCount: 1,
                    timeLimit: 120, // 2 minutes
                    balloonsToComplete: 9999, // No balloon limit - time-based completion
                    timeBasedCompletion: true, // Level completes when time runs out (not game over)

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

                instructions: "Welcome to Level 1! You have 2 minutes to pop as many moving balloons as you can! Balloons will MOVE slowly across the screen. Listen to the 3D audio beeps - they update as the balloon moves. Track the sound, follow it with your hand, and pop the balloon! The beep speed tells you how close you are. Pop as many as you can!",

                completionMessage: "Great job! Time's up! You've completed your 2-minute challenge!"
            },

            2: {
                name: "Bomb Dodger",
                description: "2-minute challenge! Pop as many balloons as you can while dodging the bomb!",
                difficulty: "Expert",
                config: {
                    balloonBehavior: "moving", // Balloons move slowly
                    positions: "edge-spawn", // NEW: Spawn from edges and float inward
                    balloonCount: 1,
                    timeLimit: 120, // 2 minutes
                    balloonsToComplete: 9999, // No balloon limit - time-based completion
                    timeBasedCompletion: true, // Level completes when time runs out (not game over)

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

                instructions: "Welcome to Level 2! You have 2 minutes to pop as many balloons as you can while avoiding the BOMB! Listen: the balloon beeps from one side, the bomb ticks from the OPPOSITE side. Start SLOW - both move gently. Each balloon you pop makes them slightly faster. The bomb FREEZES for 3 seconds when you pop a balloon - use that time wisely! Pop as many as you can in 2 minutes!",

                completionMessage: "Excellent! Time's up! You've completed your 2-minute bomb dodging challenge!"
            },

            3: {
                name: "Multi-Balloon Rush",
                description: "2-minute challenge! Pop as many balloons as you can while avoiding the bomb!",
                difficulty: "Challenge",
                config: {
                    balloonBehavior: "moving",
                    positions: "random",
                    balloonCount: 2, // 2 balloons on screen
                    timeLimit: 120, // 2 minutes
                    balloonsToComplete: 9999, // No balloon limit - time-based completion
                    timeBasedCompletion: true, // Level completes when time runs out

                    // Movement settings - 50% slower than Level 1
                    movementEnabled: true,
                    balloonSpeed: 0.25, // 50% of 0.5
                    movementRange: 50,

                    // Respawn settings
                    respawnOnPop: true, // Balloons respawn after being popped
                    spawnAllAtOnce: true, // Spawn initial 2 balloons at start

                    // Bomb settings
                    hasBomb: true,
                    bombEnabled: true,
                    bombCount: 1, // 1 bomb
                    bombSpeed: 0.15, // 50% slower
                    bombMovementRange: 40,
                    bombDangerRadius: 150,
                    bombRespawnOnHit: true, // Bomb respawns after hit
                    bombFreezeOnHit: true, // Freeze for 2 seconds before respawn
                    bombFreezeDuration: 2000, // 2 seconds

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    bombAudioEnabled: true,
                    bombDangerSound: "ticking",

                    // Scoring
                    pointsPerBalloon: 200,
                    timeBonus: true,
                    bombPenalty: -100
                },

                instructions: "Welcome to Level 3! You have 2 minutes to pop as many balloons as you can! 2 balloons and 1 bomb are on screen. When you pop a balloon, it respawns at a new location. Hit the bomb and it freezes, then respawns elsewhere. Everything moves slower - focus and pop as many as you can!",

                completionMessage: "Great job! Time's up! You've completed your 2-minute challenge!"
            },

            4: {
                name: "Bomb Field Challenge",
                description: "2-minute challenge! Pop as many balloons as you can while avoiding 2 bombs. You have 4 lives!",
                difficulty: "Expert",
                config: {
                    balloonBehavior: "moving",
                    positions: "random",
                    balloonCount: 2, // 2 balloons on screen
                    timeLimit: 120, // 2 minutes
                    balloonsToComplete: 9999, // No balloon limit - time-based completion
                    timeBasedCompletion: true, // Level completes when time runs out

                    // Movement settings - 50% slower than Level 1
                    movementEnabled: true,
                    balloonSpeed: 0.25, // 50% of 0.5
                    movementRange: 50,

                    // Respawn settings
                    respawnOnPop: true, // Balloons respawn after being popped
                    spawnAllAtOnce: true, // Spawn initial 2 balloons at start

                    // Bomb settings
                    hasBomb: true,
                    bombEnabled: true,
                    bombCount: 2, // 2 bombs
                    bombSpeed: 0.15, // 50% slower
                    bombMovementRange: 40,
                    bombDangerRadius: 150,
                    bombRespawnOnHit: true, // Bombs respawn after hit
                    bombFreezeOnHit: true, // Freeze for 2 seconds before respawn
                    bombFreezeDuration: 2000, // 2 seconds

                    // Lives system
                    hasLives: true,
                    startingLives: 4, // Start with 4 lives
                    loseLifeOnBombHit: true, // Lose 1 life when hitting bomb
                    gameOverOnNoLives: true, // Game over when lives = 0

                    // Audio settings
                    audioBeepSpeed: "normal",
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    bombAudioEnabled: true,
                    bombDangerSound: "ticking",

                    // Scoring
                    pointsPerBalloon: 300,
                    timeBonus: true,
                    bombPenalty: 0, // No points deduction (only lose lives)

                    // Encouragement system
                    encouragementEnabled: true,
                    encouragementInterval: 5 // Every 5 balloons
                },

                instructions: "Welcome to Level 4! You have 2 minutes to pop as many balloons as you can with 4 lives! 2 balloons and 2 bombs are on screen. When you pop a balloon, it respawns at a new location. Hit a bomb and you lose 1 life - the bomb freezes, then respawns elsewhere. Everything moves slower - stay focused and pop as many as you can!",

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
