// Test script to verify progressive difficulty algorithm

// Progressive difficulty settings (copied from game.js)
const BASE_SPAWN_INTERVAL = 1800;
const MIN_SPAWN_INTERVAL = 600;
const BASE_MAX_CARS = 3;
const MAX_MAX_CARS = 8;
const DIFFICULTY_MILESTONE = 500;

function calculateDifficulty(distance) {
  const difficultyLevel = Math.floor(distance / DIFFICULTY_MILESTONE);

  const decayFactor = Math.exp(-difficultyLevel / 3);
  const currentSpawnInterval = Math.round(
    MIN_SPAWN_INTERVAL +
    (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) * decayFactor
  );

  const currentMaxCars = Math.min(
    BASE_MAX_CARS + Math.floor(difficultyLevel / 2),
    MAX_MAX_CARS
  );

  return {
    currentSpawnInterval,
    currentMaxCars,
    difficultyLevel
  };
}

// Test at various distances
console.log('\n🧪 PROGRESSIVE DIFFICULTY TEST\n');
console.log('Distance | Level | Spawn Interval | Max Cars');
console.log('---------|-------|----------------|----------');

const testDistances = [0, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

testDistances.forEach(distance => {
  const result = calculateDifficulty(distance);
  console.log(
    `${distance.toString().padStart(8)}m | ` +
    `${result.difficultyLevel.toString().padStart(5)} | ` +
    `${result.currentSpawnInterval.toString().padStart(14)}ms | ` +
    `${result.currentMaxCars.toString().padStart(8)}`
  );
});

console.log('\n✅ Test complete!\n');
