import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

async function queryLeaderboard(levelNumber: number, gameSlug: string, limit: number) {
  const supabase = createClient();

  try {
    // Query game_progress table for leaderboard
    const { data, error } = await supabase
      .from('game_progress')
      .select(`
        high_score,
        completed,
        last_played,
        user_id
      `)
      .eq('game_slug', gameSlug)
      .eq('level_number', levelNumber)
      .order('high_score', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Get usernames from auth.users metadata
    const enrichedData = await Promise.all(
      (data || []).map(async (entry) => {
        // Get user profile from Supabase auth
        const { data: { user } } = await supabase.auth.admin.getUserById(entry.user_id);

        return {
          username: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous',
          high_score: entry.high_score,
          completed: entry.completed,
          last_played: entry.last_played
        };
      })
    );

    return enrichedData;
  } catch (error) {
    console.error('Error querying leaderboard from Supabase:', error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ levelId: string }> }
) {
  try {
    const { levelId } = await params;
    const levelNumber = parseInt(levelId, 10);

    if (isNaN(levelNumber)) {
      return NextResponse.json(
        { error: 'Invalid level ID' },
        { status: 400 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const gameSlug = searchParams.get('game_slug') || 'sonic-drive'; // Default to sonic-drive

    // Query leaderboard from Supabase
    const leaderboard = await queryLeaderboard(levelNumber, gameSlug, limit);

    return NextResponse.json({
      success: true,
      level_number: levelNumber,
      game_slug: gameSlug,
      leaderboard: leaderboard
    });

  } catch (error) {
    console.error('Leaderboard API error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
