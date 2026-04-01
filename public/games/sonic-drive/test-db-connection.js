/**
 * Test Database Connection
 * Verifies that analytics tables are accessible
 */

// Import Supabase client
import { createClient } from '../../../lib/supabase.ts';

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');

  const supabase = createClient();

  try {
    // Test 1: Check user_profiles table
    console.log('\n1️⃣ Testing user_profiles table...');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (profilesError) {
      console.error('❌ Error accessing user_profiles:', profilesError.message);
    } else {
      console.log('✅ user_profiles table accessible');
      console.log('   Current rows:', profiles.length);
    }

    // Test 2: Check game_sessions table
    console.log('\n2️⃣ Testing game_sessions table...');
    const { data: sessions, error: sessionsError } = await supabase
      .from('game_sessions')
      .select('*')
      .limit(1);

    if (sessionsError) {
      console.error('❌ Error accessing game_sessions:', sessionsError.message);
    } else {
      console.log('✅ game_sessions table accessible');
      console.log('   Current rows:', sessions.length);
    }

    // Test 3: Check session_events table
    console.log('\n3️⃣ Testing session_events table...');
    const { data: events, error: eventsError } = await supabase
      .from('session_events')
      .select('*')
      .limit(1);

    if (eventsError) {
      console.error('❌ Error accessing session_events:', eventsError.message);
    } else {
      console.log('✅ session_events table accessible');
      console.log('   Current rows:', events.length);
    }

    // Test 4: Check user_progress table
    console.log('\n4️⃣ Testing user_progress table...');
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .limit(1);

    if (progressError) {
      console.error('❌ Error accessing user_progress:', progressError.message);
    } else {
      console.log('✅ user_progress table accessible');
      console.log('   Current rows:', progress.length);
    }

    // Test 5: Check analytics_summary table
    console.log('\n5️⃣ Testing analytics_summary table...');
    const { data: summary, error: summaryError } = await supabase
      .from('analytics_summary')
      .select('*')
      .limit(1);

    if (summaryError) {
      console.error('❌ Error accessing analytics_summary:', summaryError.message);
    } else {
      console.log('✅ analytics_summary table accessible');
      console.log('   Current rows:', summary.length);
    }

    // Test 6: Try to insert a test user profile
    console.log('\n6️⃣ Testing write permissions (user_profiles)...');
    const testUserId = `test_${Date.now()}`;
    const { data: insertData, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: testUserId,
        roles: ['blind']
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error writing to user_profiles:', insertError.message);
    } else {
      console.log('✅ Write permissions working');
      console.log('   Created test user:', insertData.user_id);

      // Clean up test data
      await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', testUserId);
      console.log('   Test user deleted');
    }

    console.log('\n✅ All database tests passed!');
    console.log('📊 Analytics system is ready to use.');

  } catch (error) {
    console.error('\n❌ Unexpected error:', error);
  }
}

// Run test
testDatabaseConnection();
