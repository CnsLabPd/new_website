import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

async function queryUserScoreHistory(userId: string, levelNumber: number, gameSlug: string) {
  const supabase = createClient();

  try {
    // Query game_score_history table
    const { data: historyData, error } = await supabase
      .from('game_score_history')
      .select('score, completed, created_at')
      .eq('user_id', userId)
      .eq('game_slug', gameSlug)
      .eq('level_number', levelNumber)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get high score from game_progress table
    const { data: progressData } = await supabase
      .from('game_progress')
      .select('high_score')
      .eq('user_id', userId)
      .eq('game_slug', gameSlug)
      .eq('level_number', levelNumber)
      .single();

    // Map to match expected format
    const history = (historyData || []).map(entry => ({
      score: entry.score,
      completed: entry.completed,
      played_at: entry.created_at
    }));

    return {
      scores: history,
      high_score: progressData?.high_score || 0
    };
  } catch (error) {
    console.error('Error querying user score history from Supabase:', error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string; levelId: string }> }
) {
  try {
    const { username, levelId } = await params;
    const levelNumber = parseInt(levelId, 10);

    if (isNaN(levelNumber)) {
      return NextResponse.json(
        { error: 'Invalid level ID' },
        { status: 400 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const gameSlug = searchParams.get('game_slug') || 'sonic-drive';

    // Get auth token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Token required' },
        { status: 401 }
      );
    }

    const supabase = createClient();

    // Verify token and get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // For security, only allow users to view their own history
    // Check if the requested username matches the authenticated user
    const userMetadata = user.user_metadata || {};
    const userUsername = userMetadata.username || user.email?.split('@')[0] || '';

    if (userUsername !== username) {
      return NextResponse.json(
        { error: 'Forbidden - Can only view your own scores' },
        { status: 403 }
      );
    }

    // Query user score history using the authenticated user's ID
    const historyData = await queryUserScoreHistory(user.id, levelNumber, gameSlug);

    return NextResponse.json({
      success: true,
      username: username,
      level_number: levelNumber,
      game_slug: gameSlug,
      scores: historyData.scores,
      high_score: historyData.high_score
    });

  } catch (error) {
    console.error('User score history API error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
