/**
 * Centralized Audio Prompting System for Balloon Game
 * All audio prompts are defined here in one place
 * Handles prompt cancellation and non-overlapping playback
 */

class AudioPromptManager {
    constructor() {
        this.isActive = false;
        this.currentUtterance = null;
        this.currentPage = null; // 'home' or 'level_X'
        this.voiceEnabled = true;
        this.preferredVoice = null;

        // Load voices when available
        this.loadVoices();
        if (typeof speechSynthesis !== 'undefined') {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    }

    loadVoices() {
        if (typeof speechSynthesis === 'undefined') return;

        const voices = speechSynthesis.getVoices();
        // Prefer Indian English voices
        this.preferredVoice = voices.find(voice =>
            voice.lang.includes('en-IN') || voice.name.includes('Indian')
        ) || voices.find(voice =>
            voice.lang.startsWith('en')
        ) || voices[0];
    }

    /**
     * Stop any currently playing audio prompt
     */
    stopCurrent() {
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.speaking) {
            speechSynthesis.cancel(); // Immediately stop all speech
        }
        this.currentUtterance = null;
        this.isActive = false;
    }

    /**
     * Speak a message (internal method)
     */
    async _speak(text) {
        return new Promise((resolve, reject) => {
            if (!this.voiceEnabled || typeof speechSynthesis === 'undefined') {
                resolve();
                return;
            }

            // Stop any previous speech and wait briefly for it to fully cancel
            this.stopCurrent();

            // Small delay to allow speech synthesis to fully cancel before starting new speech
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;

                if (this.preferredVoice) {
                    utterance.voice = this.preferredVoice;
                }

                utterance.onend = () => {
                    this.isActive = false;
                    this.currentUtterance = null;
                    resolve();
                };

                utterance.onerror = (event) => {
                    // Ignore "interrupted" errors as they're expected when we cancel speech
                    if (event.error === 'interrupted') {
                        console.log('Speech interrupted (expected when switching prompts)');
                        this.isActive = false;
                        this.currentUtterance = null;
                        resolve(); // Resolve instead of reject for interrupted errors
                        return;
                    }

                    console.error('Speech error:', event);
                    this.isActive = false;
                    this.currentUtterance = null;
                    reject(event);
                };

                this.currentUtterance = utterance;
                this.isActive = true;

                try {
                    speechSynthesis.speak(utterance);
                } catch (error) {
                    console.error('Error speaking:', error);
                    this.isActive = false;
                    reject(error);
                }
            }, 50); // 50ms delay to allow previous speech to fully cancel
        });
    }

    /**
     * Play home page prompt
     */
    async playHomePrompt() {
        this.stopCurrent(); // Stop any previous prompts
        this.currentPage = 'home';

        const prompt = `Welcome to Audio Balloon Pop Game.
        This is an audio-based game designed for everyone.
        You will use spatial sound to locate and pop balloons using hand gestures.
        The game is organized into 2 modules.
        Module 1: Learning and Practice.
        Module 2: Balloon Shooting Games.
        Select a module to explore its levels.`;

        try {
            await this._speak(prompt);
        } catch (error) {
            console.error('Home prompt error:', error);
        }
    }

    /**
     * Play module selection prompt
     */
    async playModulePrompt(moduleNumber) {
        this.stopCurrent();
        this.currentPage = `module_${moduleNumber}`;

        let prompt = '';

        switch(moduleNumber) {
            case 1:
                prompt = `Module 1: Learning and Practice.
                This module helps you master the basics.
                It contains 5 levels.
                Level 1: Cardinal Compass. Learn 4 directions.
                Level 2: Diagonal Discovery. Master 8 directions.
                Level 3: Center Seeker. Training mode for center navigation.
                Level 4: Edge Explorer. Training mode for edge detection.
                Level 5: Bomb Training. Learn how bombs sound and feel.
                Select any level to begin.`;
                break;

            case 2:
                prompt = `Module 2: Balloon Shooting Games.
                Put your skills to the test!
                This module contains 2 challenging levels.
                Level 6: Floating Hunter. Pop 15 moving balloons.
                Level 7: Bomb Dodger. Pop balloons while avoiding bombs.
                Select a level to start the challenge.`;
                break;

            default:
                prompt = `Module ${moduleNumber} selected. Choose a level to continue.`;
        }

        try {
            await this._speak(prompt);
        } catch (error) {
            console.error(`Module ${moduleNumber} prompt error:`, error);
        }
    }

    /**
     * Play level selection prompt (before clicking Start Game)
     */
    async playLevelPrompt(levelNumber) {
        this.stopCurrent(); // Stop any previous prompts immediately
        this.currentPage = `level_${levelNumber}`;

        let prompt = '';

        switch(levelNumber) {
            case 1:
                prompt = `Level 1: Cardinal Compass.
                This is the tutorial level.
                You will pop 10 balloons located in 4 cardinal directions: left, right, top, and bottom.
                Listen to the beeping sound. The beeps get faster as your hand gets closer to the balloon.
                Move your hand toward the sound and touch the balloon to pop it.
                You have 2 minutes to complete this level.
                Click the Start Game button when you are ready to begin.`;
                break;

            case 2:
                prompt = `Level 2: Diagonal Discovery.
                In this level, you will pop 16 balloons located in 8 directions, including diagonals.
                The directions are: left, right, top, bottom, top-left, top-right, bottom-left, and bottom-right.
                Use the spatial audio to locate each balloon.
                The beeps get faster when you are close.
                You have 2 and a half minutes.
                Click the Start Game button when you are ready.`;
                break;

            case 3:
                prompt = `Level 3: Center Seeker.
                This is a training level with no balloons to pop.
                Move your hand around the screen and listen to the continuous audio feedback.
                The sound gets louder when you move toward the center of the screen.
                The sound gets quieter near the edges.
                Practice for 3 minutes to develop your spatial awareness.
                Click the Start Game button to begin your training.`;
                break;

            case 4:
                prompt = `Level 4: Edge Explorer.
                This is an inverted training level.
                Move your hand and listen to the audio feedback.
                The sound gets louder when you are near the edges of the screen.
                The sound gets quieter in the center.
                This helps you learn to navigate to the edges.
                Practice for 3 minutes.
                Click the Start Game button to start.`;
                break;

            case 5:
                prompt = `Level 5: Bomb Training.
                This is a safe practice level to learn about bombs!
                In this level, you will learn how bombs sound and feel.
                Bombs make a ticking sound and an alarm.
                Your goal is to FIND and TOUCH the bomb 8 times.
                Don't worry, there is no penalty in training mode!
                Listen to the ticking sound, move your hand toward it, and touch it.
                This prepares you for the Bomb Dodger level where you must avoid bombs.
                You have 3 minutes to practice.
                Click the Start Game button to begin training.`;
                break;

            case 6:
                prompt = `Level 6: Floating Hunter.
                Now the challenge begins!
                You will pop 15 moving balloons.
                The balloons float around the screen with physics-based movement.
                Track the beeping sound and follow the balloon as it moves.
                The beeps get faster as you get closer.
                You have 3 minutes to pop all 15 balloons.
                Click the Start Game button when ready.`;
                break;

            case 7:
                prompt = `Level 7: Bomb Dodger.
                This is an expert level with danger!
                You must pop 10 moving balloons while avoiding a bomb.
                The balloon makes beeping sounds.
                The bomb makes a ticking sound and an alarm.
                If you touch the bomb, you lose points and freeze for 3 seconds.
                After popping a balloon, the bomb freezes for 3 seconds to give you recovery time.
                You have 4 minutes.
                Click the Start Game button when you are ready for the challenge.`;
                break;

            default:
                prompt = `Level ${levelNumber} selected. Click the Start Game button to begin.`;
        }

        try {
            await this._speak(prompt);
        } catch (error) {
            console.error(`Level ${levelNumber} prompt error:`, error);
        }
    }

    /**
     * Toggle voice on/off
     */
    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        if (!this.voiceEnabled) {
            this.stopCurrent();
        }
        return this.voiceEnabled;
    }

    /**
     * Check if prompt is currently playing
     */
    isPlaying() {
        return this.isActive;
    }
}

// Create global instance
window.audioPromptManager = new AudioPromptManager();
