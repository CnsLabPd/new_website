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
  completed: boolean,
  token: string
) {
  // Create an authenticated Supabase client using the user's access token
  // This is critical - RLS policies check auth.uid() which comes from this token
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Create a new client with the user's token in the auth header
  const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  console.log('🔐 [DB] Created authenticated Supabase client with user token');

  try {
    console.log(`📝 Attempting to save score: userId=${userId}, level=${levelNumber}, score=${score}`);

    // 1. Save to history (all attempts)
    console.log('💾 Step 1: Inserting into game_score_history...');
    const { error: historyError } = await supabase
      .from('game_score_history')
      .insert({
        user_id: userId,
        game_slug: gameSlug,
        level_number: levelNumber,
        score: score,
        completed: completed
      });

    if (historyError) {
      console.error('❌ History insert error:', historyError);
      throw historyError;
    }
    console.log('✅ Step 1 complete: Score added to history');

    // 2. Get current progress
    console.log('🔍 Step 2: Checking for existing progress...');
    const { data: currentProgress, error: selectError } = await supabase
      .from('game_progress')
      .select('high_score')
      .eq('user_id', userId)
      .eq('game_slug', gameSlug)
      .eq('level_number', levelNumber)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is fine for first play
      console.error('❌ Select error:', selectError);
    }
    console.log('📊 Current progress:', currentProgress);

    // 3. Update or insert progress (only if new high score)
    const isNewHighScore = !currentProgress || score > currentProgress.high_score;
    const highScore = isNewHighScore ? score : currentProgress.high_score;
    console.log(`💾 Step 3: Upserting progress... (isNewHighScore=${isNewHighScore}, highScore=${highScore})`);

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

    if (progressError) {
      console.error('❌ Progress upsert error:', progressError);
      throw progressError;
    }
    console.log('✅ Step 3 complete: Progress updated');

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

    console.log('🔐 [API] Received save score request');
    console.log('🔑 [API] Token present:', !!token);

    if (!token) {
      console.error('❌ [API] No token provided');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: SaveProgressRequest = await request.json();
    const { level_number, module_number, score, completed, game_slug = 'sonic-drive' } = body;

    console.log('📦 [API] Request body:', { level_number, module_number, score, completed, game_slug });

    // Validation
    if (level_number === undefined || module_number === undefined) {
      console.error('❌ [API] Missing required fields');
      return NextResponse.json(
        { error: 'level_number and module_number are required' },
        { status: 400 }
      );
    }

    // Create Supabase client - this uses ANON key for initial connection
    console.log('🔧 [API] Creating Supabase client...');
    const supabase = createClient();

    // Verify token and get user from Supabase
    console.log('👤 [API] Verifying user token...');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
      console.error('❌ [API] Auth error:', authError);
      return NextResponse.json(
        { error: 'Unauthorized', details: authError.message },
        { status: 401 }
      );
    }

    if (!user) {
      console.error('❌ [API] No user found for token');
      return NextResponse.json(
        { error: 'Unauthorized - No user found' },
        { status: 401 }
      );
    }

    console.log('✅ [API] User authenticated:', user.id);

    // Save progress to Supabase - pass the token so RLS can work
    const result = await saveProgressToDatabase(
      user.id,
      game_slug,
      level_number,
      module_number,
      score,
      completed,
      token // Pass token for RLS
    );

    return NextResponse.json({
      success: true,
      isNewHighScore: result.isNewHighScore,
      progress: result.progress
    });

  } catch (error) {
    console.error('Save progress API error:', error);

    // Enhanced error logging for debugging
    if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, null, 2));
    }

    return NextResponse.json(
      {
        error: 'Server error',
        details: error instanceof Error ? error.message : (
          error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : 'Unknown error'
        ),
        errorObject: error && typeof error === 'object' ? error : undefined
      },
      { status: 500 }
    );
  }
}
