-- Add username column to game_progress table
-- This allows us to display usernames in leaderboards without admin API access

-- Add username column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'game_progress'
        AND column_name = 'username'
    ) THEN
        ALTER TABLE game_progress ADD COLUMN username TEXT;
    END IF;
END $$;

-- Create an index for username lookups
CREATE INDEX IF NOT EXISTS idx_game_progress_username
    ON game_progress(username);

-- Backfill usernames for existing records (if any exist)
-- This is a one-time operation that will be skipped if username is already populated
UPDATE game_progress
SET username = COALESCE(
    (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = game_progress.user_id),
    (SELECT raw_user_meta_data->>'username' FROM auth.users WHERE id = game_progress.user_id),
    (SELECT email FROM auth.users WHERE id = game_progress.user_id),
    'Anonymous'
)
WHERE username IS NULL;
