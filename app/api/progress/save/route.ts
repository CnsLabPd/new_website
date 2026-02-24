import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

interface SaveProgressRequest {
  level_number: number;
  module_number: number;
  score: number;
  completed: boolean;
  game_slug?: string;
}

async function saveProgressToDatabase(
  userId: string,
  gameSlug: string,
  levelNumber: number,
  moduleNumber: number,
  score: number,
  completed: boolean
) {
  const supabase = createClient();

  try {
    // 1. Save to history (all attempts)
    const { error: historyError } = await supabase
      .from('game_score_history')
      .insert({
        user_id: userId,
        game_slug: gameSlug,
        level_number: levelNumber,
        score: score,
        completed: completed
      });

    if (historyError) throw historyError;

    // 2. Get current progress
    const { data: currentProgress } = await supabase
      .from('game_progress')
      .select('high_score')
      .eq('user_id', userId)
      .eq('game_slug', gameSlug)
      .eq('level_number', levelNumber)
      .single();

    // 3. Update or insert progress (only if new high score)
    const isNewHighScore = !currentProgress || score > currentProgress.high_score;
    const highScore = isNewHighScore ? score : currentProgress.high_score;

    const { data: progressData, error: progressError } = await supabase
      .from('game_progress')
      .upsert({
        user_id: userId,
        game_slug: gameSlug,
        level_number: levelNumber,
        module_number: moduleNumber,
        high_score: highScore,
        completed: completed,
        last_played: new Date().toISOString()
      }, {
        onConflict: 'user_id,game_slug,level_number'
      })
      .select()
      .single();

    if (progressError) throw progressError;

    console.log(`✅ Score saved: Level ${levelNumber}, Score: ${score}${isNewHighScore ? ' (NEW HIGH SCORE!)' : ''}`);

    return {
      success: true,
      isNewHighScore,
      progress: progressData
    };

  } catch (error) {
    console.error('❌ Error saving score to Supabase:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get auth token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: SaveProgressRequest = await request.json();
    const { level_number, module_number, score, completed, game_slug = 'sonic-drive' } = body;

    // Validation
    if (level_number === undefined || module_number === undefined) {
      return NextResponse.json(
        { error: 'level_number and module_number are required' },
        { status: 400 }
      );
    }

    // Verify token and get user from Supabase
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Save progress to Supabase
    const result = await saveProgressToDatabase(
      user.id,
      game_slug,
      level_number,
      module_number,
      score,
      completed
    );

    return NextResponse.json({
      success: true,
      isNewHighScore: result.isNewHighScore,
      progress: result.progress
    });

  } catch (error) {
    console.error('Save progress API error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
