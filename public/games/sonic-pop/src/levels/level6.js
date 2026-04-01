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
