// Level 7: Bomb Dodger
// Ultimate challenge with bomb avoidance and progressive difficulty

class Level7 {
    constructor() {
        this.levelNumber = 7;
        this.config = this.getConfig();
    }

    getConfig() {
        return {
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

            instructions: "Welcome to Level 6 - the ultimate challenge! A BOMB floats on screen. Listen: the balloon beeps from one side, the bomb ticks from the OPPOSITE side. Start SLOW - both move gently. Each balloon you pop makes them slightly faster. The bomb FREEZES for 3 seconds when you pop a balloon - use that time wisely! You can do this!",

            completionMessage: "INCREDIBLE! You've mastered the most difficult level! You can track targets while avoiding danger. You are a true Audio Balloon Pop champion!"
        };
    }

    getSettings() {
        return {
            // Visual settings
            balloonSize: 45,
            balloonColor: '#F38181', // Coral red balloon
            hitboxSize: 70,

            // Bomb visual settings
            bombSize: 50,
            bombColor: '#2D3436', // Dark bomb
            bombHitboxSize: 80, // Larger danger zone

            // Audio settings
            beepFrequency: 739.99, // F# note
            beepDuration: 0.1,
            audioVolume: 0.7,

            // Bomb audio settings
            bombTickFrequency: 220, // Low A note
            bombTickDuration: 0.05,
            bombTickInterval: 600, // ms
            bombDangerTickInterval: 200, // ms when close

            // Proximity audio algorithm - NEW
            proximityAudioMode: "closest-only", // Play audio only for closest object
            proximityCalculationInterval: 50, // ms - recalculate every 50ms

            // Visual effects
            showMovementTrail: true,
            trailColor: '#F38181',
            bombTrailColor: '#FF0000',
            bombWarningGlow: true,

            // Physics settings
            balloonMass: 1.0,
            bombMass: 1.5, // Heavier
            balloonFriction: 0.02,
            bombFriction: 0.03,

            // Gameplay settings
            popFeedback: true,
            showVisualHints: true,
            handTrackingRequired: true,

            // Freeze effect
            freezeVisualEffect: true,
            freezeEffectColor: '#00D2FF'
        };
    }

    onBalloonSpawn(balloon) {
        console.log('Level 6: Balloon spawned from edge');
    }

    onBombSpawn(bomb) {
        console.log('Level 6: Bomb spawned!');
    }

    onBalloonPop(balloon, score, currentSpeed) {
        console.log(`Level 6: Balloon popped! Score: ${score}, Speed increased to ${currentSpeed}`);
    }

    onBombHit(bomb, penalty) {
        console.log(`Level 6: BOMB HIT! Penalty: ${penalty}`);
    }

    onBombFreeze() {
        console.log('Level 6: Bomb frozen for 3 seconds!');
    }

    onBombUnfreeze() {
        console.log('Level 6: Bomb unfrozen, watch out!');
    }

    onEncouragement(balloonsPopped) {
        console.log(`Level 6: Encouragement! ${balloonsPopped} balloons popped!`);
    }

    // NEW: Calculate which object (balloon or bomb) is closer to hand
    getClosestObject(handX, handY, balloon, bomb) {
        const balloonDist = Math.sqrt(
            Math.pow(balloon.x - handX, 2) + Math.pow(balloon.y - handY, 2)
        );
        const bombDist = Math.sqrt(
            Math.pow(bomb.x - handX, 2) + Math.pow(bomb.y - handY, 2)
        );

        return {
            closest: balloonDist < bombDist ? 'balloon' : 'bomb',
            balloonDistance: balloonDist,
            bombDistance: bombDist
        };
    }

    onLevelComplete(totalScore, timeRemaining) {
        console.log(`Level 6 Complete! Score: ${totalScore}, Time: ${timeRemaining}s`);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Level7;
} else {
    window.Level7 = Level7;
}
