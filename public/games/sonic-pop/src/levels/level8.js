// Level 8: Multi-Balloon Rush
// Challenge level with 10 balloons spawning at once - no bombs

class Level8 {
    constructor() {
        this.levelNumber = 8;
        this.config = this.getConfig();
    }

    getConfig() {
        return {
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
        };
    }

    getSettings() {
        return {
            // Visual settings
            balloonSize: 45,
            balloonColor: '#FFD93D', // Bright yellow balloons
            hitboxSize: 70,

            // Audio settings
            beepFrequency: 523.25, // C note
            beepDuration: 0.12,
            audioVolume: 0.75,

            // Movement visualization
            showMovementTrail: true,
            trailColor: '#FFD93D',
            trailLength: 20,

            // Physics settings
            balloonMass: 1.0,
            balloonFriction: 0.02,
            balloonRestitution: 0.8,

            // Gameplay settings
            popFeedback: true,
            showVisualHints: true,
            handTrackingRequired: true,

            // Audio proximity settings
            proximityBeepIncrease: true,
            minBeepInterval: 200, // ms
            maxBeepInterval: 800 // ms
        };
    }

    onBalloonSpawn(balloon) {
        console.log('Level 8: Multi-balloon spawned');
    }

    onBalloonPop(balloon, score) {
        console.log(`Level 8: Balloon popped! Score: ${score}`);
    }

    onLevelComplete(totalScore, timeRemaining) {
        console.log(`Level 8 Complete! Score: ${totalScore}, Time: ${timeRemaining}s`);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Level8;
} else {
    window.Level8 = Level8;
}
