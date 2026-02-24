import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// Simple SQLite query function without native dependencies
// This reads the SQLite database file directly using a pure JavaScript implementation
async function queryLeaderboard(levelNumber: number, limit: number) {
  const dbPath = path.join(process.cwd(), 'public', 'games', 'sonic-drive', 'server', 'balloon_game.db');

  // Check if database exists
  if (!fs.existsSync(dbPath)) {
    throw new Error('Database file not found');
  }

  // Since better-sqlite3 requires native bindings which don't work in Next.js serverless,
  // we'll use a workaround: spawn a Python process to query the database
  const { spawn } = await import('child_process');

  return new Promise((resolve, reject) => {
    const pythonScript = `
import sqlite3
import json
import sys

db_path = "${dbPath.replace(/\\/g, '\\\\')}"
level_number = ${levelNumber}
limit = ${limit}

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    query = """
        SELECT
            users.username,
            progress.high_score,
            progress.completed,
            progress.last_played
        FROM progress
        JOIN users ON progress.user_id = users.id
        WHERE progress.level_number = ?
        ORDER BY progress.high_score DESC
        LIMIT ?
    """

    cursor.execute(query, (level_number, limit))
    results = cursor.fetchall()

    leaderboard = []
    for row in results:
        leaderboard.append({
            'username': row[0],
            'high_score': row[1],
            'completed': row[2],
            'last_played': row[3]
        })

    conn.close()
    print(json.dumps({'success': True, 'leaderboard': leaderboard}))

except Exception as e:
    print(json.dumps({'success': False, 'error': str(e)}))
    sys.exit(1)
`;

    const python = spawn('python3', ['-c', pythonScript]);
    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${errorOutput}`));
        return;
      }

      try {
        const result = JSON.parse(output);
        if (result.success) {
          resolve(result.leaderboard);
        } else {
          reject(new Error(result.error));
        }
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${output}`));
      }
    });
  });
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

    // Get limit from query parameters (default: 10)
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Query leaderboard using Python subprocess
    const leaderboard = await queryLeaderboard(levelNumber, limit);

    return NextResponse.json({
      success: true,
      level_number: levelNumber,
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
