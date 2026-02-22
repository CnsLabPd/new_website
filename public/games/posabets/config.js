// Global Game Configuration
export const CONFIG = {
    // Game Metadata
    GAME_NAME: "Posabets",
    VERSION: "1.0.0",

    // Model Configuration
    MODEL_PATH: '/assets/models/rohit_model3.json',
    POSE_TYPE: 'pose',

    // Game Settings
    MIN_CONFIDENCE: 0.75,           // Minimum confidence for pose recognition
    HOLD_TIME: 2000,                // Time to hold pose (ms)
    MAX_ATTEMPTS: 3,                // Attempts per letter in missions

    // Reward Points
    REWARDS: {
        FIRST_TRY: 100,             // Stars for getting it right first try
        SECOND_TRY: 75,             // Stars for second try
        THIRD_TRY: 50,              // Stars for third try
        PRACTICE: 10,               // Stars for training mode
        WORD_COMPLETE: 200,         // Bonus for completing a word
        LEVEL_COMPLETE: 500         // Bonus for completing all letters
    },

    // Badges
    BADGES: {
        FIRST_LETTER: { name: 'Rookie Astronaut', description: 'Complete your first letter!' },
        TEN_LETTERS: { name: 'Space Cadet', description: 'Master 10 letters!' },
        ALL_LETTERS: { name: 'Alphabet Commander', description: 'Master all 26 letters!' },
        FIRST_WORD: { name: 'Word Explorer', description: 'Spell your first word!' },
        TEN_WORDS: { name: 'Word Wizard', description: 'Spell 10 words!' },
        PERFECT_STREAK: { name: 'Cosmic Champion', description: 'Get 5 letters perfect in a row!' }
    },

    // Simple Words for Word Explorer Mode
    WORDS: [
        'CAT', 'DOG', 'SUN', 'BAT', 'HAT',
        'PIG', 'BIG', 'RUN', 'FUN', 'HOP',
        'TOP', 'POT', 'CUP', 'BUS', 'BED',
        'RED', 'NET', 'PEN', 'TEN', 'WEB'
    ],

    // MediaPipe Settings
    MEDIAPIPE: {
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5
    },

    // Camera Settings
    CAMERA: {
        width: 640,
        height: 480,
        facingMode: 'user'
    },

    // Visual Feedback Messages
    ENCOURAGEMENT: {
        SUCCESS: [
            "Amazing, {name}!",
            "You're a star, {name}!",
            "Perfect pose!",
            "Brilliant work!",
            "You're doing great!",
            "Fantastic job!",
            "You rock!"
        ],
        TRY_AGAIN: [
            "Almost there, {name}!",
            "You're so close!",
            "Try again, you've got this!",
            "Keep going, space cadet!",
            "One more try!"
        ],
        LOADING: [
            "Getting ready for your mission...",
            "Preparing the spacecraft...",
            "Loading your space gear..."
        ]
    },

    // Sound Effects (optional - can be added later)
    SOUNDS: {
        SUCCESS: './assets/sounds/success.mp3',
        ENCOURAGEMENT: './assets/sounds/encouragement.mp3',
        BADGE_UNLOCK: './assets/sounds/badge.mp3',
        BACKGROUND: './assets/sounds/space-music.mp3'
    },

    // Theme Colors (Space Theme)
    THEME: {
        primary: '#6366f1',         // Indigo
        secondary: '#8b5cf6',       // Purple
        success: '#10b981',         // Green
        warning: '#f59e0b',         // Amber
        danger: '#ef4444',          // Red
        space: '#0f172a',           // Dark blue
        stars: '#fbbf24'            // Golden yellow
    }
};
