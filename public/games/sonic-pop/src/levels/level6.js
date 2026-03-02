// Level 6: Floating Hunter
// First moving balloon level - the real challenge begins

class Level6 {
    constructor() {
        this.levelNumber = 6;
        this.config = this.getConfig();
    }

    getConfig() {
        return {
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

            instructions: "Welcome to Level 5! Now the real challenge begins. Balloons will MOVE slowly across the screen. Listen to the 3D audio beeps - they update as the balloon moves. Track the sound, follow it with your hand, and pop the balloon! The beep speed tells you how close you are. Good luck, hunter!",

            completionMessage: "Incredible! You've proven yourself as a true Floating Hunter! You can track and catch moving targets!"
        };
    }

    getSettings() {
        return {
            // Visual settings
            balloonSize: 45, // Slightly larger for moving target
            balloonColor: '#95E1D3', // Mint green balloons
            hitboxSize: 70, // Larger hitbox for moving target

            // Audio settings
            beepFrequency: 659.25, // E note
            beepDuration: 0.12,
            audioVolume: 0.75,

            // Movement visualization
            showMovementTrail: true,
            trailColor: '#95E1D3',
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
            proximityBeepIncrease: true, // Beeps faster when closer
            minBeepInterval: 200, // ms
            maxBeepInterval: 800 // ms
        };
    }

    onBalloonSpawn(balloon) {
        console.log('Level 5: Moving balloon spawned');
    }

    onBalloonPop(balloon, score) {
        console.log(`Level 5: Moving balloon popped! Score: ${score}`);
    }

    onBalloonEscaped(balloon) {
        console.log('Level 5: Balloon escaped off screen!');
    }

    onLevelComplete(totalScore, timeRemaining) {
        console.log(`Level 5 Complete! Score: ${totalScore}, Time: ${timeRemaining}s`);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Level6;
} else {
    window.Level6 = Level6;
}
