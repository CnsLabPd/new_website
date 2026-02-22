# Neurogati Game SDK

JavaScript libraries for integrating games with Neurogati's centralized authentication and database.

## 📦 Files

- `neurogati-auth.js` - Shared authentication module
- `balloon-racing-api.js` - API for Balloon Pop & Sonic Drive games
- `posabets-api.js` - API for Posabets (Alphabet Pose Game)

---

## 🚀 Quick Start

### For Balloon Pop / Sonic Drive Games

```html
<!-- 1. Include Supabase library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- 2. Include Neurogati SDK -->
<script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
<script src="https://neurogati.com/game-sdk/balloon-racing-api.js"></script>

<script>
// 3. Initialize game API
const gameAPI = new BalloonRacingAPI('balloon-pop'); // or 'sonic-drive'

// 4. Wait for auth to load
window.addEventListener('load', async () => {
  // Check if user is logged in
  if (!NeurogatiAuth.isAuthenticated()) {
    alert('Please sign in to play!');
    window.location.href = 'https://neurogati.com';
    return;
  }

  console.log('User:', NeurogatiAuth.getUserName());

  // 5. Save score after level completion
  const result = await gameAPI.saveScore(
    1,      // level number
    1,      // module number
    1250,   // score
    true    // completed
  );

  if (result.isNewHighScore) {
    alert('New high score!');
  }

  // 6. Get user progress
  const progress = await gameAPI.getAllProgress();
  console.log('User progress:', progress);

  // 7. Get leaderboard
  const leaderboard = await gameAPI.getLeaderboard(1); // Level 1
  console.log('Top 10:', leaderboard);
});
</script>
```

---

### For Posabets (Alphabet Game)

```html
<!-- 1. Include Supabase library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- 2. Include Neurogati SDK -->
<script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
<script src="https://neurogati.com/game-sdk/posabets-api.js"></script>

<script>
// 3. Initialize game API
const gameAPI = new PosabetsAPI();

// 4. Wait for auth to load
window.addEventListener('load', async () => {
  // Check if user is logged in
  if (!NeurogatiAuth.isAuthenticated()) {
    alert('Please sign in to play!');
    window.location.href = 'https://neurogati.com';
    return;
  }

  // 5. Get user progress
  const progress = await gameAPI.getProgress();
  console.log('Progress:', progress);

  // 6. Mark letter complete
  await gameAPI.markLetterComplete('A', 3); // Letter A, 3 stars

  // 7. Mark word complete
  await gameAPI.markWordComplete('APPLE', 5); // Word APPLE, 5 stars

  // 8. Update streak
  const streak = await gameAPI.updateStreak(true); // Correct answer
  console.log('Current streak:', streak);

  // 9. Add badge
  await gameAPI.addBadge('first_letter');

  // 10. Get stats
  const stats = await gameAPI.getStats();
  console.log('Stats:', stats);
});
</script>
```

---

## 🔑 Authentication API

### `NeurogatiAuth` Methods

```javascript
// Check if user is logged in
NeurogatiAuth.isAuthenticated() // → true/false

// Get user info
NeurogatiAuth.getCurrentUser() // → User object
NeurogatiAuth.getUserId()      // → UUID
NeurogatiAuth.getUserEmail()   // → email@example.com
NeurogatiAuth.getUserName()    // → Full Name

// Redirect to login
NeurogatiAuth.redirectToLogin()

// Access Supabase client directly
const supabase = NeurogatiAuth.getClient()
```

---

## 🎮 Balloon/Racing Game API

### `BalloonRacingAPI` Methods

```javascript
const api = new BalloonRacingAPI('balloon-pop'); // or 'sonic-drive'

// Save score
await api.saveScore(level, module, score, completed)

// Get all progress
await api.getAllProgress()

// Get level progress
await api.getLevelProgress(levelNumber)

// Get leaderboard
await api.getLeaderboard(levelNumber, limit = 10)

// Get score history
await api.getScoreHistory(levelNumber, limit = 50)
```

---

## 🔤 Posabets Game API

### `PosabetsAPI` Methods

```javascript
const api = new PosabetsAPI();

// Get progress
await api.getProgress()

// Complete letter/word
await api.markLetterComplete(letter, stars)
await api.markWordComplete(word, stars)

// Badges
await api.addBadge(badgeId)

// Streaks
await api.updateStreak(isCorrect)

// Stats
await api.getStats()

// History
await api.getSessionHistory(limit = 50)
```

---

## 📋 Migration Checklist

To migrate an existing game:

- [ ] Remove login.html (sign up/sign in page)
- [ ] Remove Python backend auth code
- [ ] Add Supabase CDN script
- [ ] Add Neurogati SDK scripts
- [ ] Initialize game API
- [ ] Add auth check on game load
- [ ] Replace score saving with SDK calls
- [ ] Test in production

---

## 🔒 Security

- All API keys are **public** (anon key only)
- Row Level Security (RLS) protects user data
- Users can only access their own scores/progress
- Leaderboards are public (read-only)

---

## 🌐 CDN Links

Production:
```html
<script src="https://neurogati.com/game-sdk/neurogati-auth.js"></script>
<script src="https://neurogati.com/game-sdk/balloon-racing-api.js"></script>
<script src="https://neurogati.com/game-sdk/posabets-api.js"></script>
```

Local development:
```html
<script src="http://localhost:3000/game-sdk/neurogati-auth.js"></script>
<script src="http://localhost:3000/game-sdk/balloon-racing-api.js"></script>
<script src="http://localhost:3000/game-sdk/posabets-api.js"></script>
```

---

## 📞 Support

Issues? Contact the Neurogati development team.
