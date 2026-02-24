-- Game Progress and Score History Tables
-- Creates tables for storing user game progress and score history across all games

-- Table for storing current game progress (high scores and completion status)
CREATE TABLE IF NOT EXISTS game_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    game_slug TEXT NOT NULL,
    level_number INTEGER NOT NULL,
    module_number INTEGER NOT NULL,
    high_score INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_slug, level_number)
);

-- Table for storing complete score history (all attempts)
CREATE TABLE IF NOT EXISTS game_score_history (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    game_slug TEXT NOT NULL,
    level_number INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_game_progress_user_game_level ON game_progress(user_id, game_slug, level_number);
CREATE INDEX IF NOT EXISTS idx_game_progress_game_level_score ON game_progress(game_slug, level_number, high_score DESC);
CREATE INDEX IF NOT EXISTS idx_game_score_history_user_game_level ON game_score_history(user_id, game_slug, level_number);
CREATE INDEX IF NOT EXISTS idx_game_score_history_created_at ON game_score_history(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_score_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for game_progress

-- Allow anyone to view all progress for leaderboards (public leaderboard access)
CREATE POLICY "Anyone can view progress for leaderboards"
    ON game_progress FOR SELECT
    USING (true);

-- Allow users to insert their own progress
CREATE POLICY "Users can insert their own progress"
    ON game_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own progress
CREATE POLICY "Users can update their own progress"
    ON game_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for game_score_history

-- Allow users to view their own score history
CREATE POLICY "Users can view their own score history"
    ON game_score_history FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own scores
CREATE POLICY "Users can insert their own scores"
    ON game_score_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Note: We don't allow updates or deletes on score history to maintain data integrity
