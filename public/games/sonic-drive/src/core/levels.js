// Level Configuration System for SonicDrive - Racing Game for Visually Impaired

class LevelManager {
    constructor() {
        this.modules = this.initializeModules();
        this.levels = this.initializeLevels();
        this.currentLevel = 11; // Start with first racing level
        this.currentModule = 1; // Only one module now
    }

    initializeModules() {
        return {
            1: {
                name: "SonicDrive Racing Challenges",
                description: "Endless driving challenges - compete for high scores!",
                levels: [11, 12, 13, 14, 15], // Racing levels (added 2 free highway levels)
                icon: "🏎️"
            }
        };
    }

    initializeLevels() {
        return {
            // FREE HIGHWAY LEVELS (No traffic)
            11: {
                name: "🛣️ Free Highway - 2 Lanes",
                description: "Practice driving on a peaceful 2-lane highway. No traffic - just enjoy the ride! LEFT lane = left speaker, RIGHT lane = right speaker.",
                difficulty: "Practice",
                isExternalGame: true,
                externalPath: "src/games/highwayracer/index.html?level=1",
                config: {
                    gameMode: "car-driving",
                    gestureControlEnabled: true,
                    lanes: 2,
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    freeMode: true
                },
                instructions: "Welcome to Free Highway! Practice driving on a 2-lane highway with no traffic. Get comfortable with the controls and spatial audio. LEFT lane is in your left speaker, RIGHT lane is in your right speaker. Enjoy the peaceful drive!",
                completionMessage: "Great practice session!"
            },

            12: {
                name: "🛣️ Free Highway - 3 Lanes",
                description: "Practice driving on a peaceful 3-lane highway. No traffic - explore all lanes! LEFT, CENTER, and RIGHT lanes.",
                difficulty: "Practice",
                isExternalGame: true,
                externalPath: "src/games/highwayracer/index.html?level=2",
                config: {
                    gameMode: "car-driving",
                    gestureControlEnabled: true,
                    lanes: 3,
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    freeMode: true
                },
                instructions: "Welcome to Free Highway! Practice driving on a 3-lane highway (LEFT, CENTER, RIGHT) with no traffic. Perfect for getting used to lane switching with spatial audio. Take your time and enjoy!",
                completionMessage: "Excellent practice!"
            },

            // CHALLENGE LEVELS (With traffic and lives)
            13: {
                name: "🌅 Highway Cruiser",
                description: "Relaxed 2-lane cruising. Avoid traffic! You have 5 lives. LEFT lane = left speaker, RIGHT lane = right speaker.",
                difficulty: "Easy",
                isExternalGame: true,
                externalPath: "src/games/highwayracer/index.html?level=3",
                config: {
                    gameMode: "car-driving",
                    gestureControlEnabled: true,
                    lanes: 2,
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    lives: 5
                },
                instructions: "Welcome to Highway Cruiser! Navigate a 2-lane highway using hand gestures or keyboard controls. Listen to the spatial audio - LEFT lane is in your left speaker, RIGHT lane is in your right speaker. Avoid traffic cars and see how far you can drive! You have 5 lives.",
                completionMessage: "AMAZING! You've mastered the Highway Cruiser!"
            },

            14: {
                name: "🌃 City Rush",
                description: "3-lane city traffic with increasing speed. You have 5 lives. Navigate LEFT, CENTER, and RIGHT lanes.",
                difficulty: "Medium",
                isExternalGame: true,
                externalPath: "src/games/highwayracer/index.html?level=4",
                config: {
                    gameMode: "car-driving",
                    gestureControlEnabled: true,
                    lanes: 3,
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    lives: 5
                },
                instructions: "Welcome to City Rush! Navigate 3 lanes (LEFT, CENTER, RIGHT) with increasing traffic density. Use spatial audio to detect cars around you. The challenge increases as you drive further! You have 5 lives.",
                completionMessage: "INCREDIBLE! You've conquered City Rush!"
            },

            15: {
                name: "🔥 Speed Demon",
                description: "Intense 4-lane highway at blazing speeds! You have 5 lives. Lane 1 = full left, Lane 2 = half left, Lane 3 = half right, Lane 4 = full right.",
                difficulty: "Hard",
                isExternalGame: true,
                externalPath: "src/games/highwayracer/index.html?level=5",
                config: {
                    gameMode: "car-driving",
                    gestureControlEnabled: true,
                    lanes: 4,
                    spatialAudioEnabled: true,
                    spatialIntensity: 1.5,
                    lives: 5
                },
                instructions: "Welcome to Speed Demon! The ultimate challenge - 4 lanes at maximum speed! Lane 1 = full left audio, Lane 2 = half left, Lane 3 = half right, Lane 4 = full right. Master spatial awareness to survive! You have 5 lives.",
                completionMessage: "LEGENDARY! You are a Speed Demon master!"
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
        const levelNumbers = [11, 12, 13, 14, 15];
        const currentIndex = levelNumbers.indexOf(this.currentLevel);
        if (currentIndex >= 0 && currentIndex < levelNumbers.length - 1) {
            return this.getLevel(levelNumbers[currentIndex + 1]);
        }
        return null;
    }

    hasNextLevel() {
        return this.getNextLevel() !== null;
    }

    advanceLevel() {
        if (this.hasNextLevel()) {
            const levelNumbers = [11, 12, 13, 14, 15];
            const currentIndex = levelNumbers.indexOf(this.currentLevel);
            this.currentLevel = levelNumbers[currentIndex + 1];
            return true;
        }
        return false;
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
        // All racing levels are in module 1
        if ([11, 12, 13, 14, 15].includes(levelNumber)) {
            return {
                number: 1,
                ...this.modules[1]
            };
        }
        return null;
    }

    getLevelsInModule(moduleNumber) {
        const module = this.modules[moduleNumber];
        if (!module) return [];

        // Return racing levels (11, 12, 13, 14, 15)
        return [11, 12, 13, 14, 15]
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

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LevelManager };
} else {
    window.LevelManager = LevelManager;
}
