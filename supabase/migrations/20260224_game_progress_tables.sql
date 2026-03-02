-- Game Progress and Score History Tables - FIX EXISTING SCHEMA
-- Updates existing tables and fixes RLS policies for Sonic Drive compatibility

-- NOTE: Tables already exist from previous migration, this just fixes policies and indexes

-- ============================================
-- DROP CONFLICTING POLICIES (if they exist)
-- ============================================

-- Drop old game_progress policies that might conflict
DROP POLICY IF EXISTS "Users manage own game progress" ON game_progress;
DROP POLICY IF EXISTS "Public game leaderboard" ON game_progress;
DROP POLICY IF EXISTS "Anyone can view progress for leaderboards" ON game_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON game_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON game_progress;

-- Drop old game_score_history policies that might conflict
DROP POLICY IF EXISTS "Users manage own game history" ON game_score_history;
DROP POLICY IF EXISTS "Users can view their own score history" ON game_score_history;
DROP POLICY IF EXISTS "Users can insert their own scores" ON game_score_history;

-- ============================================
-- FIX COLUMN NAME FIRST (before creating indexes)
-- ============================================

-- The original schema uses 'played_at' but we need 'created_at' for consistency
-- Rename it first before creating any indexes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'game_score_history'
        AND column_name = 'created_at'
    ) THEN
        -- Rename played_at to created_at for consistency
        ALTER TABLE game_score_history RENAME COLUMN played_at TO created_at;
    END IF;
END $$;

-- ============================================
-- CREATE OPTIMIZED INDEXES (after column rename)
-- ============================================

-- Add indexes for leaderboard queries (high score DESC is critical for performance)
CREATE INDEX IF NOT EXISTS idx_game_progress_leaderboard
    ON game_progress(game_slug, level_number, high_score DESC);

-- Add index for user history queries (now safe to use created_at)
CREATE INDEX IF NOT EXISTS idx_game_score_history_user_level
    ON game_score_history(user_id, game_slug, level_number, created_at DESC);

-- ============================================
-- RECREATE RLS POLICIES (Compatible with existing schema)
-- ============================================

-- Ensure RLS is enabled
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_score_history ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies for game_progress
-- ============================================

-- Allow anyone to view all progress for PUBLIC leaderboards (read-only)
CREATE POLICY "Public can view all game progress for leaderboards"
    ON game_progress FOR SELECT
    USING (true);

-- Allow users to insert their own progress
CREATE POLICY "Users can insert own game progress"
    ON game_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own progress
CREATE POLICY "Users can update own game progress"
    ON game_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own progress (optional, for reset functionality)
CREATE POLICY "Users can delete own game progress"
    ON game_progress FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- RLS Policies for game_score_history
-- ============================================

-- Allow users to view their own score history
CREATE POLICY "Users can view own score history"
    ON game_score_history FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own scores
CREATE POLICY "Users can insert own scores"
    ON game_score_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Note: We intentionally don't allow UPDATE or DELETE on score history to maintain integrity
