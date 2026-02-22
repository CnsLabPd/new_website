// Level 9: Bomb Field Challenge
// Expert level with 10 balloons, 1 bomb, and 4 lives system

class Level9 {
    constructor() {
        this.levelNumber = 9;
        this.config = this.getConfig();
    }

    getConfig() {
        return {
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

            instructions: "Welcome to Bomb Field Challenge - the ultimate test! 10 balloons and 1 bomb spawn across the screen. You have 4 lives. Pop all 10 balloons within 2 minutes. Each time you hit the bomb, you lose 1 life. Lose all 4 lives and it's game over! The bomb freezes for 3 seconds when you pop a balloon. Listen carefully: balloons beep, bombs tick. You can do this!",

            completionMessage: "INCREDIBLE! You've conquered the Bomb Field Challenge! You are a true master of audio balloon popping!"
        };
    }

    getSettings() {
        return {
            // Visual settings
            balloonSize: 45,
            balloonColor: '#A8E6CF', // Mint green balloons
            hitboxSize: 70,

            // Bomb visual settings
            bombSize: 50,
            bombColor: '#FF6B6B', // Red bomb
            bombHitboxSize: 70,

            // Audio settings
            beepFrequency: 659.25, // E note
            beepDuration: 0.12,
            audioVolume: 0.75,

            // Movement visualization
            showMovementTrail: true,
            trailColor: '#A8E6CF',
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
            maxBeepInterval: 800, // ms

            // Lives display
            showLivesDisplay: true,
            livesDisplayPosition: 'top-left' // Position for hearts display
        };
    }

    onBalloonSpawn(balloon) {
        console.log('Level 9: Multi-balloon spawned');
    }

    onBalloonPop(balloon, score) {
        console.log(`Level 9: Balloon popped! Score: ${score}`);
    }

    onBombHit(livesRemaining) {
        console.log(`Level 9: Bomb hit! Lives remaining: ${livesRemaining}`);
    }

    onLifeLost(livesRemaining) {
        console.log(`Level 9: Life lost! ${livesRemaining} lives remaining`);
    }

    onGameOver(reason) {
        console.log(`Level 9: Game Over! Reason: ${reason}`);
    }

    onLevelComplete(totalScore, timeRemaining) {
        console.log(`Level 9 Complete! Score: ${totalScore}, Time: ${timeRemaining}s`);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Level9;
} else {
    window.Level9 = Level9;
}
