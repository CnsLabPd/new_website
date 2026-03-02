// ==========================================
// MAIN ENTRY POINT
// ==========================================

console.log('🏁 [RACING GAME] main.js script started');
console.log('🏁 [RACING GAME] Current URL:', window.location.href);
console.log('🏁 [RACING GAME] Document ready state:', document.readyState);

const timestamp = Date.now();
console.log('🏁 [RACING GAME] Importing game.js with timestamp:', timestamp);

try {
  const gameModule = await import(`./game.js?v=${timestamp}`);
  console.log('🏁 [RACING GAME] game.js imported successfully');
  const Game = gameModule.Game;
  console.log('🏁 [RACING GAME] Game class:', Game);

  // Import leaderboard manager
  const leaderboardModule = await import(`./leaderboard.js?v=${timestamp}`);
  const { LeaderboardManager, setupLeaderboardUI } = leaderboardModule;
  console.log('🏁 [RACING GAME] Leaderboard module imported successfully');

  // Function to initialize the game
  function initGame() {
    console.log('🏁 [RACING GAME] Initializing game...');
    try {
      const game = new Game();
      console.log('✅ [RACING GAME] Audio Racing Game Initialized');
      console.log('🎮 [RACING GAME] Controls:');
      console.log('  - SPACE: Start/Pause');
      console.log('  - UP ARROW: Accelerate (hold)');
      console.log('  - DOWN ARROW: Brake (hold)');
      console.log('  - LEFT ARROW: Switch to left lane');
      console.log('  - RIGHT ARROW: Switch to right lane');

      // Get level number from URL
      const urlParams = new URLSearchParams(window.location.search);
      const level = parseInt(urlParams.get('level')) || 2;
      const levelNumber = level === 1 ? 11 : 12; // Map to actual level numbers

      // Initialize leaderboard manager
      const leaderboardManager = new LeaderboardManager(levelNumber);
      console.log(`📊 [RACING GAME] Leaderboard manager initialized for level ${levelNumber}`);

      // Setup leaderboard UI handlers
      setupLeaderboardUI(leaderboardManager, game);
      console.log('✅ [RACING GAME] Leaderboard UI handlers setup complete');

      // Store leaderboard manager globally for access from game
      window.racingLeaderboard = leaderboardManager;

      // Show Save & Quit button when game starts
      game.onGameStart = () => {
        const saveQuitBtn = document.getElementById('saveQuitBtn');
        if (saveQuitBtn) {
          saveQuitBtn.style.display = 'inline-block';
        }
      };

      // Hide Save & Quit button when game ends
      game.onGameEnd = () => {
        const saveQuitBtn = document.getElementById('saveQuitBtn');
        if (saveQuitBtn) {
          saveQuitBtn.style.display = 'none';
        }
      };

      // Setup game over screen button handlers
      const gameOverHomeBtn = document.getElementById('gameOverHomeBtn');
      const gameOverRetryBtn = document.getElementById('gameOverRetryBtn');
      const gameOverNextBtn = document.getElementById('gameOverNextBtn');
      const gameOverSaveBtn = document.getElementById('gameOverSaveBtn');

      if (gameOverHomeBtn) {
        gameOverHomeBtn.addEventListener('click', () => game.gameOverGoHome());
      }

      if (gameOverRetryBtn) {
        gameOverRetryBtn.addEventListener('click', () => game.gameOverRetry());
      }

      if (gameOverNextBtn) {
        gameOverNextBtn.addEventListener('click', () => game.gameOverNextLevel());
      }

      if (gameOverSaveBtn) {
        gameOverSaveBtn.addEventListener('click', async () => {
          if (!leaderboardManager.isLoggedIn()) {
            alert('Please log in to save your score!');
            return;
          }

          const score = game.score || 0;
          const saved = await leaderboardManager.saveScore(score, false);
          if (saved) {
            gameOverSaveBtn.disabled = true;
            gameOverSaveBtn.textContent = '✅ Score Saved';
            document.getElementById('gameOverSaveStatus').textContent = '✅ Score saved successfully!';

            // Refresh leaderboard
            const leaderboardContent = document.getElementById('gameOverLeaderboardContent');
            await leaderboardManager.displayLeaderboard(leaderboardContent);
          }
        });
      }

    } catch (error) {
      console.error('❌ [RACING GAME] Error creating Game instance:', error);
    }
  }

  // Initialize game immediately if page is already loaded, otherwise wait for load event
  if (document.readyState === 'complete') {
    console.log('🏁 [RACING GAME] Page already loaded, initializing immediately...');
    initGame();
  } else {
    console.log('🏁 [RACING GAME] Waiting for page to load...');
    window.addEventListener('load', () => {
      console.log('🏁 [RACING GAME] Page loaded, initializing...');
      initGame();
    });
  }
} catch (error) {
  console.error('❌ [RACING GAME] Error importing game.js:', error);
}
