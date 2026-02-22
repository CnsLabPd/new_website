-- Mandala Painting Game Tables
-- Creates tables for storing user designs and game sessions

-- Table for storing mandala designs
CREATE TABLE IF NOT EXISTS mandala_designs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    design_id TEXT NOT NULL,
    design_name TEXT NOT NULL,
    template_name TEXT,
    color_map JSONB DEFAULT '{}',
    region_count INTEGER DEFAULT 0,
    image_data TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, design_id)
);

-- Table for storing game session statistics
CREATE TABLE IF NOT EXISTS mandala_game_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER DEFAULT 0,
    regions_painted INTEGER DEFAULT 0,
    completion_percentage REAL DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_mandala_designs_user_id ON mandala_designs(user_id);
CREATE INDEX IF NOT EXISTS idx_mandala_designs_updated_at ON mandala_designs(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_mandala_game_sessions_user_id ON mandala_game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_mandala_game_sessions_created_at ON mandala_game_sessions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE mandala_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandala_game_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mandala_designs
CREATE POLICY "Users can view their own designs"
    ON mandala_designs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own designs"
    ON mandala_designs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own designs"
    ON mandala_designs FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own designs"
    ON mandala_designs FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for mandala_game_sessions
CREATE POLICY "Users can view their own sessions"
    ON mandala_game_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions"
    ON mandala_game_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions"
    ON mandala_game_sessions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_mandala_designs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
CREATE TRIGGER update_mandala_designs_updated_at_trigger
    BEFORE UPDATE ON mandala_designs
    FOR EACH ROW
    EXECUTE FUNCTION update_mandala_designs_updated_at();
