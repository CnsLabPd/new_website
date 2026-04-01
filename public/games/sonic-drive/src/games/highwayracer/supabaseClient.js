/**
 * Supabase Client for Sonic Drive Analytics
 * Handles all database operations for analytics tracking
 *
 * Created: 2026-03-30
 */

// Supabase configuration
const SUPABASE_URL = 'https://yourttiykfslostesqjp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXJ0dGl5a2ZzbG9zdGVzcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzY1NjgsImV4cCI6MjA4NzE1MjU2OH0.R-spS9GY6AXA5cwytwW2KIxDd1F0ryqb84d8C_wwIGc';

// Create Supabase client (will be initialized when needed)
let supabase = null;

// Initialize Supabase client
function initSupabase() {
  if (!supabase && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized for analytics');
  }
  return supabase;
}

/**
 * Get or create user profile
 * @param {string} userId - User ID
 * @param {string[]} roles - Array of roles ['blind', 'adhd', 'stroke']
 * @returns {Promise<Object>} User profile
 */
export async function getOrCreateUserProfile(userId, roles) {
  const client = initSupabase();
  if (!client) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    // Try to get existing profile
    const { data: existing, error: fetchError } = await client
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existing) {
      // Update roles if changed
      const existingRoles = JSON.stringify(existing.roles.sort());
      const newRoles = JSON.stringify(roles.sort());

      if (existingRoles !== newRoles) {
        const { data: updated } = await client
          .from('user_profiles')
          .update({ roles: roles })
          .eq('user_id', userId)
          .select()
          .single();

        console.log('📝 Updated user roles:', roles);
        return updated;
      }

      return existing;
    }

    // Create new profile
    const { data: created, error: createError } = await client
      .from('user_profiles')
      .insert({ user_id: userId, roles: roles })
      .select()
      .single();

    if (createError) throw createError;

    console.log('✅ Created new user profile:', userId);
    return created;

  } catch (error) {
    console.error('❌ Error with user profile:', error);
    return null;
  }
}

/**
 * Save game session to database
 * @param {Object} sessionData - Complete session data from AnalyticsCollector
 * @returns {Promise<Object>} Result with sessionId
 */
export async function saveGameSession(sessionData) {
  const client = initSupabase();
  if (!client) {
    console.error('Supabase not initialized');
    return { success: false, error: 'Supabase not initialized' };
  }

  try {
    console.log('💾 Saving session to database...');

    // Prepare session data (remove events for now, we'll insert them separately)
    const events = sessionData.events || [];
    const sessionToInsert = {
      user_id: sessionData.user_id,
      started_at: sessionData.started_at,
      ended_at: sessionData.ended_at,
      duration_seconds: sessionData.duration_seconds,
      difficulty_level: sessionData.difficulty_level,
      control_method: sessionData.control_method,
      final_score: sessionData.final_score,
      distance_traveled: sessionData.distance_traveled,
      collisions: sessionData.collisions,
      near_misses: sessionData.near_misses,
      successful_dodges: sessionData.successful_dodges,
      mean_reaction_time_ms: sessionData.mean_reaction_time_ms,
      median_reaction_time_ms: sessionData.median_reaction_time_ms,
      reaction_time_sd_ms: sessionData.reaction_time_sd_ms,
      min_reaction_time_ms: sessionData.min_reaction_time_ms,
      max_reaction_time_ms: sessionData.max_reaction_time_ms,
      blind_sound_localization_accuracy: sessionData.blind_sound_localization_accuracy,
      blind_navigation_efficiency: sessionData.blind_navigation_efficiency,
      blind_collision_avoidance_rate: sessionData.blind_collision_avoidance_rate,
      blind_stereo_awareness_score: sessionData.blind_stereo_awareness_score,
      adhd_sustained_attention_duration_sec: sessionData.adhd_sustained_attention_duration_sec,
      adhd_impulsivity_index: sessionData.adhd_impulsivity_index,
      adhd_attention_consistency: sessionData.adhd_attention_consistency,
      adhd_premature_response_rate: sessionData.adhd_premature_response_rate,
      adhd_task_completion_quality: sessionData.adhd_task_completion_quality,
      gesture_accuracy_rate: sessionData.gesture_accuracy_rate,
      gesture_recognition_latency_ms: sessionData.gesture_recognition_latency_ms,
      total_gestures_detected: sessionData.total_gestures_detected,
      left_gesture_count: sessionData.left_gesture_count,
      right_gesture_count: sessionData.right_gesture_count,
      browser_info: sessionData.browser_info,
      device_info: JSON.stringify(sessionData.device_info)
    };

    // Insert session
    const { data: session, error: sessionError } = await client
      .from('game_sessions')
      .insert(sessionToInsert)
      .select()
      .single();

    if (sessionError) {
      console.error('❌ Error saving session:', sessionError);
      throw sessionError;
    }

    console.log('✅ Session saved:', session.id);

    // Insert events in batches (optional - can be skipped for performance)
    if (events.length > 0 && events.length < 1000) { // Only save if reasonable number
      const eventsToInsert = events.map(event => ({
        session_id: session.id,
        timestamp_ms: event.timestamp_ms,
        event_type: event.event_type,
        event_data: event.event_data,
        player_x: event.event_data?.player_x,
        player_y: event.event_data?.player_y,
        car_x: event.event_data?.car_x,
        car_y: event.event_data?.car_y,
        current_lane: event.event_data?.current_lane,
        horn_volume: event.event_data?.horn_volume,
        horn_pan: event.event_data?.horn_pan,
        sound_distance: event.event_data?.sound_distance,
        gesture_type: event.event_data?.gesture_type,
        gesture_confidence: event.event_data?.gesture_confidence,
        gesture_latency_ms: event.event_data?.gesture_latency_ms,
        hand_landmarks: event.event_data?.hand_landmarks
      }));

      const { error: eventsError } = await client
        .from('session_events')
        .insert(eventsToInsert);

      if (eventsError) {
        console.warn('⚠️ Error saving events (non-critical):', eventsError.message);
      } else {
        console.log(`✅ Saved ${events.length} events`);
      }
    }

    // Update user profile totals
    await updateUserProfileStats(sessionData.user_id, sessionData.duration_seconds);

    return { success: true, sessionId: session.id, sessionData: session };

  } catch (error) {
    console.error('❌ Error saving session:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update user profile statistics
 * @param {string} userId - User ID
 * @param {number} durationSeconds - Session duration
 */
async function updateUserProfileStats(userId, durationSeconds) {
  const client = initSupabase();
  if (!client) return;

  try {
    // Increment session count and playtime
    const { error } = await client.rpc('increment_user_stats', {
      p_user_id: userId,
      p_duration: durationSeconds
    });

    // If RPC doesn't exist, do it manually
    if (error && error.code === '42883') {
      const { data: profile } = await client
        .from('user_profiles')
        .select('total_sessions, total_playtime_seconds')
        .eq('user_id', userId)
        .single();

      if (profile) {
        await client
          .from('user_profiles')
          .update({
            total_sessions: (profile.total_sessions || 0) + 1,
            total_playtime_seconds: (profile.total_playtime_seconds || 0) + durationSeconds
          })
          .eq('user_id', userId);
      }
    }
  } catch (error) {
    console.warn('⚠️ Error updating user stats:', error.message);
  }
}

/**
 * Get user analytics (recent sessions)
 * @param {string} userId - User ID
 * @param {number} limit - Number of sessions to retrieve
 * @returns {Promise<Array>} Array of session data
 */
export async function getUserAnalytics(userId, limit = 10) {
  const client = initSupabase();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('game_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];

  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    return [];
  }
}

/**
 * Get user progress summary
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Progress data
 */
export async function getUserProgress(userId) {
  const client = initSupabase();
  if (!client) return null;

  try {
    const sessions = await getUserAnalytics(userId, 20);

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        avgScore: 0,
        avgReactionTime: 0,
        improvement: 0,
        recentSessions: []
      };
    }

    // Calculate statistics
    const avgScore = sessions.reduce((sum, s) => sum + s.final_score, 0) / sessions.length;
    const avgRT = sessions.reduce((sum, s) => sum + (s.mean_reaction_time_ms || 0), 0) / sessions.length;

    // Calculate improvement (first 3 vs last 3 sessions)
    const baseline = sessions.slice(-3).reduce((sum, s) => sum + s.final_score, 0) / Math.min(3, sessions.length);
    const recent = sessions.slice(0, 3).reduce((sum, s) => sum + s.final_score, 0) / Math.min(3, sessions.length);
    const improvement = baseline > 0 ? ((recent - baseline) / baseline) * 100 : 0;

    return {
      totalSessions: sessions.length,
      avgScore: Math.round(avgScore),
      avgReactionTime: Math.round(avgRT),
      improvement: Math.round(improvement * 10) / 10,
      recentSessions: sessions.slice(0, 5)
    };

  } catch (error) {
    console.error('❌ Error fetching progress:', error);
    return null;
  }
}

// Export for use in game
export { initSupabase };
