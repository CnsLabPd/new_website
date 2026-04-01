-- Sonic Drive Analytics Database Schema
-- Created: 2026-03-30
-- Purpose: Track performance metrics for Blind, ADHD, and Stroke rehabilitation use cases

-- ============================================================================
-- TABLE 1: user_profiles
-- Stores user configuration and role selection
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL, -- Anonymous user ID (generated client-side)
  roles TEXT[] NOT NULL, -- Array: ['blind', 'adhd', 'stroke']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User preferences
  preferred_difficulty INTEGER DEFAULT 3,
  preferred_control TEXT DEFAULT 'gesture', -- 'gesture' or 'keyboard'

  -- Metadata
  total_sessions INTEGER DEFAULT 0,
  total_playtime_seconds INTEGER DEFAULT 0
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- ============================================================================
-- TABLE 2: game_sessions
-- Stores aggregated data for each gameplay session
-- ============================================================================

CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,

  -- Session metadata
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  difficulty_level INTEGER NOT NULL,
  control_method TEXT NOT NULL, -- 'gesture' or 'keyboard'

  -- Game performance
  final_score INTEGER NOT NULL,
  distance_traveled NUMERIC NOT NULL,
  collisions INTEGER NOT NULL,
  near_misses INTEGER NOT NULL,
  successful_dodges INTEGER NOT NULL,

  -- Universal metrics (applicable to all roles)
  mean_reaction_time_ms NUMERIC,
  median_reaction_time_ms NUMERIC,
  reaction_time_sd_ms NUMERIC,
  min_reaction_time_ms NUMERIC,
  max_reaction_time_ms NUMERIC,

  -- Blind-specific metrics
  blind_sound_localization_accuracy NUMERIC, -- 0-100%
  blind_navigation_efficiency NUMERIC, -- 0-100%
  blind_collision_avoidance_rate NUMERIC, -- 0-100%
  blind_stereo_awareness_score NUMERIC, -- 0-100%

  -- ADHD-specific metrics
  adhd_sustained_attention_duration_sec NUMERIC,
  adhd_impulsivity_index NUMERIC, -- 0-100 (lower is better)
  adhd_attention_consistency NUMERIC, -- 0-100 (higher is better)
  adhd_premature_response_rate NUMERIC, -- 0-100%
  adhd_task_completion_quality NUMERIC, -- 0-100%

  -- Gesture-specific metrics (for ADHD/Stroke - if using gesture controls)
  gesture_accuracy_rate NUMERIC, -- 0-100%
  gesture_recognition_latency_ms NUMERIC,
  total_gestures_detected INTEGER,
  left_gesture_count INTEGER,
  right_gesture_count INTEGER,

  -- Additional metadata
  browser_info TEXT,
  device_info TEXT
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_started_at ON game_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_date ON game_sessions(user_id, started_at DESC);

-- ============================================================================
-- TABLE 3: session_events
-- Stores raw event-level data for detailed analysis
-- ============================================================================

CREATE TABLE IF NOT EXISTS session_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
  timestamp_ms BIGINT NOT NULL, -- Milliseconds since session start

  -- Event type and data
  event_type TEXT NOT NULL, -- 'car_spawn', 'horn_start', 'lane_change', 'collision', 'near_miss', 'gesture_detected', etc.
  event_data JSONB NOT NULL, -- Flexible JSON storage for event-specific data

  -- Position data
  player_x NUMERIC,
  player_y NUMERIC,
  car_x NUMERIC,
  car_y NUMERIC,
  current_lane INTEGER,

  -- Audio data (for blind users)
  horn_volume NUMERIC,
  horn_pan NUMERIC, -- -1 to +1 (left to right)
  sound_distance NUMERIC,

  -- Gesture data (for ADHD/Stroke)
  gesture_type TEXT, -- 'left', 'right', 'none'
  gesture_confidence NUMERIC, -- 0-1
  gesture_latency_ms NUMERIC,
  hand_landmarks JSONB -- 21-point MediaPipe landmarks if available
);

-- Indexes for efficient event queries
CREATE INDEX IF NOT EXISTS idx_session_events_session_id ON session_events(session_id);
CREATE INDEX IF NOT EXISTS idx_session_events_timestamp ON session_events(session_id, timestamp_ms);
CREATE INDEX IF NOT EXISTS idx_session_events_type ON session_events(event_type);

-- ============================================================================
-- TABLE 4: user_progress
-- Stores longitudinal progress tracking and milestones
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,

  -- Baseline assessment (first 3 sessions average)
  baseline_reaction_time_ms NUMERIC,
  baseline_collision_rate NUMERIC,
  baseline_score NUMERIC,
  baseline_date TIMESTAMP WITH TIME ZONE,

  -- Current performance (rolling 10-session average)
  current_reaction_time_ms NUMERIC,
  current_collision_rate NUMERIC,
  current_score NUMERIC,

  -- Improvement metrics
  improvement_rate_percent NUMERIC, -- % improvement from baseline
  sessions_to_plateau INTEGER, -- Sessions needed to reach stable performance
  plateau_detected BOOLEAN DEFAULT FALSE,

  -- Milestones
  milestones JSONB, -- Array of {date, achievement, metric_name, metric_value}

  -- Role-specific progress
  blind_progress JSONB, -- {localization_accuracy_trend, navigation_efficiency_trend, etc.}
  adhd_progress JSONB, -- {attention_duration_trend, impulsivity_reduction_trend, etc.}

  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user progress lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- ============================================================================
-- TABLE 5: analytics_summary
-- Stores pre-computed summary statistics for faster report generation
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,

  -- Time period
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  period_type TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'

  -- Session counts
  total_sessions INTEGER NOT NULL,
  total_playtime_seconds INTEGER NOT NULL,

  -- Performance averages
  avg_score NUMERIC,
  avg_distance NUMERIC,
  avg_reaction_time_ms NUMERIC,
  avg_collision_rate NUMERIC,

  -- Blind metrics averages
  avg_blind_localization_accuracy NUMERIC,
  avg_blind_navigation_efficiency NUMERIC,

  -- ADHD metrics averages
  avg_adhd_attention_duration NUMERIC,
  avg_adhd_impulsivity_index NUMERIC,
  avg_adhd_consistency NUMERIC,

  -- Gesture metrics averages
  avg_gesture_accuracy NUMERIC,

  -- Trends (positive = improving, negative = declining)
  score_trend NUMERIC,
  reaction_time_trend NUMERIC,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for summary queries
CREATE INDEX IF NOT EXISTS idx_analytics_summary_user_id ON analytics_summary(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_summary_period ON analytics_summary(user_id, period_start DESC);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user_profiles
DROP TRIGGER IF EXISTS trigger_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER trigger_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_progress
DROP TRIGGER IF EXISTS trigger_user_progress_updated_at ON user_progress;
CREATE TRIGGER trigger_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to read/write their own data
-- Since we're using anonymous client-side generated user_id, we'll allow all operations
-- In production, you might want to implement proper authentication

CREATE POLICY "Allow all operations for now" ON user_profiles FOR ALL USING (true);
CREATE POLICY "Allow all operations for now" ON game_sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations for now" ON session_events FOR ALL USING (true);
CREATE POLICY "Allow all operations for now" ON user_progress FOR ALL USING (true);
CREATE POLICY "Allow all operations for now" ON analytics_summary FOR ALL USING (true);

-- ============================================================================
-- SAMPLE QUERIES FOR TESTING
-- ============================================================================

-- Get user profile with total statistics
-- SELECT
--   up.*,
--   COUNT(gs.id) as session_count,
--   SUM(gs.duration_seconds) as total_playtime,
--   AVG(gs.final_score) as avg_score,
--   AVG(gs.mean_reaction_time_ms) as avg_reaction_time
-- FROM user_profiles up
-- LEFT JOIN game_sessions gs ON up.user_id = gs.user_id
-- WHERE up.user_id = 'your-user-id'
-- GROUP BY up.id;

-- Get recent sessions for a user
-- SELECT * FROM game_sessions
-- WHERE user_id = 'your-user-id'
-- ORDER BY started_at DESC
-- LIMIT 10;

-- Get progress over time (last 30 days)
-- SELECT
--   DATE(started_at) as session_date,
--   COUNT(*) as sessions,
--   AVG(final_score) as avg_score,
--   AVG(mean_reaction_time_ms) as avg_rt,
--   AVG(blind_sound_localization_accuracy) as avg_blind_accuracy
-- FROM game_sessions
-- WHERE user_id = 'your-user-id'
--   AND started_at > NOW() - INTERVAL '30 days'
-- GROUP BY DATE(started_at)
-- ORDER BY session_date ASC;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

-- To apply this schema:
-- 1. Open Supabase Dashboard → SQL Editor
-- 2. Paste this entire file
-- 3. Click "Run"
-- OR
-- 4. Use Supabase CLI: supabase db push
