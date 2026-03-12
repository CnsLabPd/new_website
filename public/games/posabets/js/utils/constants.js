// Game Constants and Enums

export const GameMode = {
    TRAINING: 'training',
    LETTER_MISSION: 'letter_mission',
    WORD_EXPLORER: 'word_explorer',
    NAME_SPELL: 'name_spell'  // NEW: Spell any custom name
};

export const GameState = {
    IDLE: 'idle',
    LOADING: 'loading',
    READY: 'ready',
    PLAYING: 'playing',
    PAUSED: 'paused',
    CHECKING: 'checking',
    SUCCESS: 'success',
    FAILED: 'failed',
    COMPLETE: 'complete'
};

export const PoseResult = {
    CORRECT: 'correct',
    INCORRECT: 'incorrect',
    LOW_CONFIDENCE: 'low_confidence',
    NO_POSE: 'no_pose'
};

export const StorageKeys = {
    USERS: 'alphabet_users',
    CURRENT_USER: 'alphabet_current_user',
    PLAYER_NAME: 'alphabet_player_name',
    PLAYER_PROGRESS: 'alphabet_player_progress',
    TOTAL_STARS: 'alphabet_total_stars',
    BADGES_EARNED: 'alphabet_badges',
    LETTERS_MASTERED: 'alphabet_letters_mastered',
    WORDS_COMPLETED: 'alphabet_words_completed',
    NAMES_COMPLETED: 'alphabet_names_completed',  // NEW: Track completed names
    SETTINGS: 'alphabet_settings'
};

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Letter to Number Mapping (from your model)
export const LETTER_TO_LABEL = {
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5,
    'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11,
    'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17,
    'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23,
    'Y': 24, 'Z': 25
};

export const LABEL_TO_LETTER = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F',
    6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L',
    12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R',
    18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X',
    24: 'Y', 25: 'Z'
};

// Animation Durations (ms)
export const ANIMATION = {
    FAST: 200,
    NORMAL: 400,
    SLOW: 600,
    CONFETTI: 3000
};

// Events
export const Events = {
    MODEL_LOADED: 'model_loaded',
    MODEL_ERROR: 'model_error',
    CAMERA_STARTED: 'camera_started',
    CAMERA_ERROR: 'camera_error',
    POSE_DETECTED: 'pose_detected',
    POSE_CORRECT: 'pose_correct',
    POSE_INCORRECT: 'pose_incorrect',
    LETTER_COMPLETE: 'letter_complete',
    WORD_COMPLETE: 'word_complete',
    NAME_COMPLETE: 'name_complete',  // NEW: Name spelling complete
    BADGE_EARNED: 'badge_earned',
    LEVEL_UP: 'level_up',
    GAME_OVER: 'game_over'
};
