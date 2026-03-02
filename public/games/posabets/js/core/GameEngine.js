// Game Engine - Main game logic coordinator
import { CONFIG } from '../../config.js';
import { GameState, GameMode, Events, PoseResult, LABEL_TO_LETTER } from '../utils/constants.js';
import { Storage } from '../utils/storage.js';
import { audioManager } from '../utils/audio.js';
import { ModelLoader } from './ModelLoader.js';
import { PoseDetector } from './PoseDetector.js';

export class GameEngine extends EventTarget {
    constructor() {
        super();
        this.modelLoader = new ModelLoader();
        this.poseDetector = new PoseDetector();
        this.state = GameState.IDLE;
        this.mode = null;
        this.currentLetter = null;
        this.currentWord = null;
        this.currentWordIndex = 0;
        this.attempts = 0;
        this.holdStartTime = null;
        this.isHolding = false;
        this.playerName = '';
        this.checkInterval = null;
        this.processingSuccess = false;
    }

    async initialize() {
        try {
            console.log('Initializing Game Engine...');
            this.state = GameState.LOADING;

            // Initialize audio
            await audioManager.init();

            // Load player data
            this.playerName = Storage.getPlayerName();

            // Load AI model
            await this.modelLoader.loadModel();

            // Setup event listeners
            this.setupEventListeners();

            this.state = GameState.READY;
            console.log('Game Engine initialized');

            return true;

        } catch (error) {
            console.error('Game Engine initialization error:', error);
            this.state = GameState.IDLE;
            throw error;
        }
    }

    setupEventListeners() {
        // Model events
        this.modelLoader.addEventListener(Events.MODEL_LOADED, () => {
            console.log('Model loaded successfully');
        });

        this.modelLoader.addEventListener(Events.MODEL_ERROR, (e) => {
            console.error('Model error:', e.detail.error);
        });

        // Pose detector events
        this.poseDetector.addEventListener(Events.CAMERA_STARTED, () => {
            console.log('Camera started');
        });

        this.poseDetector.addEventListener(Events.POSE_DETECTED, (e) => {
            this.onPoseDetected(e.detail);
        });
    }

    async startCamera(videoElement, canvasElement) {
        await this.poseDetector.initialize(videoElement, canvasElement);
        await this.poseDetector.startCamera();
    }

    stopCamera() {
        this.poseDetector.stopCamera();
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    startMode(mode, options = {}) {
        // Clean up previous mode state
        this.cleanupModeState();

        this.mode = mode;
        this.state = GameState.PLAYING;
        this.attempts = 0;

        switch (mode) {
            case GameMode.TRAINING:
                this.startTraining(options.letter);
                break;
            case GameMode.LETTER_MISSION:
                this.startLetterMission(options.letter);
                break;
            case GameMode.WORD_EXPLORER:
                this.startWordExplorer(options.word);
                break;
        }
    }

    cleanupModeState() {
        // Reset hold state to prevent carry-over between modes
        this.isHolding = false;
        this.holdStartTime = null;
        this.processingSuccess = false;

        // Clear any check intervals
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }

    startTraining(letter) {
        this.currentLetter = letter.toUpperCase();
        this.attempts = 0;
        console.log('Training mode started for letter:', this.currentLetter);
    }

    startLetterMission(letter) {
        this.currentLetter = letter.toUpperCase();
        this.attempts = 0;
        console.log('Letter Mission started for:', this.currentLetter);
    }

    startWordExplorer(word) {
        this.currentWord = word.toUpperCase();
        this.currentWordIndex = 0;
        this.currentLetter = this.currentWord[0];
        console.log('Word Explorer started for:', this.currentWord);
    }

    onPoseDetected(detail) {
        if (this.state !== GameState.PLAYING) return;
        if (!this.currentLetter) return;

        const { features } = detail;

        try {
            // Get prediction from model
            const result = this.modelLoader.predict(features);
            const predictedLetter = this.modelLoader.getLabelName(result.prediction)?.toUpperCase();
            const confidence = result.confidence;

            // Check if prediction matches target
            if (predictedLetter === this.currentLetter && confidence >= CONFIG.MIN_CONFIDENCE) {
                this.handleCorrectPose(confidence);
            } else {
                this.handleIncorrectPose(predictedLetter, confidence);
            }

        } catch (error) {
            console.error('Prediction error:', error);
        }
    }

    handleCorrectPose(confidence) {
        // Start hold timer if not already holding
        if (!this.isHolding) {
            this.isHolding = true;
            this.holdStartTime = Date.now();

            this.dispatchEvent(new CustomEvent('hold_start', {
                detail: { letter: this.currentLetter, confidence }
            }));
        } else {
            // Check if held long enough
            const holdDuration = Date.now() - this.holdStartTime;

            this.dispatchEvent(new CustomEvent('hold_progress', {
                detail: {
                    letter: this.currentLetter,
                    progress: Math.min(holdDuration / CONFIG.HOLD_TIME, 1)
                }
            }));

            if (holdDuration >= CONFIG.HOLD_TIME) {
                this.onPoseSuccess(confidence);
            }
        }
    }

    handleIncorrectPose(predictedLetter, confidence) {
        // Reset hold timer
        if (this.isHolding) {
            this.isHolding = false;
            this.holdStartTime = null;

            this.dispatchEvent(new CustomEvent('hold_cancelled', {
                detail: {
                    expected: this.currentLetter,
                    predicted: predictedLetter,
                    confidence
                }
            }));
        }
    }

    onPoseSuccess(confidence) {
        // Prevent multiple simultaneous success events
        if (this.processingSuccess) {
            return;
        }
        this.processingSuccess = true;

        this.isHolding = false;
        this.holdStartTime = null;
        this.attempts++;

        // Calculate stars based on attempt
        let stars = 0;
        if (this.attempts === 1) stars = CONFIG.REWARDS.FIRST_TRY;
        else if (this.attempts === 2) stars = CONFIG.REWARDS.SECOND_TRY;
        else stars = CONFIG.REWARDS.THIRD_TRY;

        // Training mode always gives practice stars
        if (this.mode === GameMode.TRAINING) {
            stars = CONFIG.REWARDS.PRACTICE;
        }

        // Play success sound
        audioManager.playSuccess();

        // Get encouragement message
        const message = this.getEncouragementMessage(true);

        // Dispatch success event
        this.dispatchEvent(new CustomEvent(Events.POSE_CORRECT, {
            detail: {
                letter: this.currentLetter,
                stars,
                attempts: this.attempts,
                confidence,
                message
            }
        }));

        // Handle mode-specific logic
        if (this.mode === GameMode.LETTER_MISSION) {
            // Save progress
            Storage.markLetterComplete(this.currentLetter, stars);
            Storage.updateStreak(true);

            // Check for badges
            this.checkBadges();

            this.dispatchEvent(new CustomEvent(Events.LETTER_COMPLETE, {
                detail: { letter: this.currentLetter, stars }
            }));

        } else if (this.mode === GameMode.WORD_EXPLORER) {
            this.currentWordIndex++;

            if (this.currentWordIndex >= this.currentWord.length) {
                // Word complete!
                const wordStars = stars + CONFIG.REWARDS.WORD_COMPLETE;
                Storage.markWordComplete(this.currentWord, wordStars);

                audioManager.playBadgeUnlock();

                this.dispatchEvent(new CustomEvent(Events.WORD_COMPLETE, {
                    detail: { word: this.currentWord, stars: wordStars }
                }));

                this.state = GameState.COMPLETE;
            } else {
                // Next letter in word
                this.currentLetter = this.currentWord[this.currentWordIndex];
                this.attempts = 0;
            }

        } else if (this.mode === GameMode.TRAINING) {
            // Just save stars
            Storage.updateStars(stars);
        }
    }

    checkBadges() {
        const progress = Storage.getProgress();
        const lettersCount = progress.lettersCompleted?.length || 0;
        const streak = progress.streak || 0;

        // First letter badge
        if (lettersCount === 1 && !Storage.hasBadge('FIRST_LETTER')) {
            this.awardBadge('FIRST_LETTER');
        }

        // 10 letters badge
        if (lettersCount === 10 && !Storage.hasBadge('TEN_LETTERS')) {
            this.awardBadge('TEN_LETTERS');
        }

        // All letters badge
        if (lettersCount === 26 && !Storage.hasBadge('ALL_LETTERS')) {
            this.awardBadge('ALL_LETTERS');
        }

        // Perfect streak badge
        if (streak >= 5 && !Storage.hasBadge('PERFECT_STREAK')) {
            this.awardBadge('PERFECT_STREAK');
        }
    }

    awardBadge(badgeId) {
        Storage.addBadge(badgeId);
        audioManager.playBadgeUnlock();

        const badge = CONFIG.BADGES[badgeId];
        this.dispatchEvent(new CustomEvent(Events.BADGE_EARNED, {
            detail: { badgeId, badge }
        }));
    }

    getEncouragementMessage(success = true) {
        const messages = success ? CONFIG.ENCOURAGEMENT.SUCCESS : CONFIG.ENCOURAGEMENT.TRY_AGAIN;
        const message = messages[Math.floor(Math.random() * messages.length)];
        return message.replace('{name}', this.playerName || 'Space Cadet');
    }

    pauseGame() {
        this.state = GameState.PAUSED;
        this.isHolding = false;
        this.holdStartTime = null;
        // Don't reset processingSuccess here - let it complete the feedback flow
    }

    resumeGame() {
        this.state = GameState.PLAYING;
        this.processingSuccess = false;
    }

    resetGame() {
        this.state = GameState.READY;
        this.mode = null;
        this.currentLetter = null;
        this.currentWord = null;
        this.currentWordIndex = 0;
        this.attempts = 0;
        this.isHolding = false;
        this.holdStartTime = null;
    }

    getState() {
        return {
            state: this.state,
            mode: this.mode,
            currentLetter: this.currentLetter,
            currentWord: this.currentWord,
            currentWordIndex: this.currentWordIndex,
            attempts: this.attempts,
            playerName: this.playerName
        };
    }

    getProgress() {
        return Storage.getProgress();
    }

    getStats() {
        return Storage.getStats();
    }

    setPlayerName(name) {
        this.playerName = name;
        Storage.savePlayerName(name);
    }

    dispose() {
        this.stopCamera();
        this.modelLoader.dispose();
        this.poseDetector.dispose();
        this.resetGame();
    }
}
