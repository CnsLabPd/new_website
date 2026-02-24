import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

interface SaveProgressRequest {
  level_number: number;
  module_number: number;
  score: number;
  completed: boolean;
}

async function saveProgressToDatabase(
  token: string,
  levelNumber: number,
  moduleNumber: number,
  score: number,
  completed: boolean
) {
  const dbPath = path.join(process.cwd(), 'public', 'games', 'sonic-drive', 'server', 'balloon_game.db');

  // Check if database exists
  if (!fs.existsSync(dbPath)) {
    throw new Error('Database file not found');
  }

  const { spawn } = await import('child_process');

  return new Promise((resolve, reject) => {
    const pythonScript = `
import sqlite3
import json
import sys
from datetime import datetime

db_path = "${dbPath.replace(/\\/g, '\\\\')}"
token = "${token}"
level_number = ${levelNumber}
module_number = ${moduleNumber}
score = ${score}
completed = ${completed ? 1 : 0}

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Verify session token and get user
    cursor.execute("""
        SELECT user_id FROM sessions
        WHERE token = ? AND expires_at > datetime('now')
    """, (token,))
    session = cursor.fetchone()

    if not session:
        print(json.dumps({'success': False, 'error': 'Unauthorized'}))
        sys.exit(0)

    user_id = session[0]

    # Insert into score history (every attempt)
    cursor.execute("""
        INSERT INTO score_history
        (user_id, level_number, score, completed, played_at)
        VALUES (?, ?, ?, ?, datetime('now'))
    """, (user_id, level_number, score, completed))

    # Check if progress exists
    cursor.execute("""
        SELECT high_score FROM progress
        WHERE user_id = ? AND level_number = ?
    """, (user_id, level_number))
    existing = cursor.fetchone()

    if existing:
        # Update only if new score is higher
        new_high_score = max(existing[0], score)
        cursor.execute("""
            UPDATE progress
            SET high_score = ?, completed = ?, last_played = datetime('now')
            WHERE user_id = ? AND level_number = ?
        """, (new_high_score, completed, user_id, level_number))
    else:
        # Insert new progress record
        cursor.execute("""
            INSERT INTO progress
            (user_id, level_number, module_number, high_score, completed, last_played)
            VALUES (?, ?, ?, ?, ?, datetime('now'))
        """, (user_id, level_number, module_number, score, completed))

    # Get updated progress
    cursor.execute("""
        SELECT * FROM progress
        WHERE user_id = ? AND level_number = ?
    """, (user_id, level_number))
    updated = cursor.fetchone()

    conn.commit()
    conn.close()

    if updated:
        progress = {
            'id': updated[0],
            'user_id': updated[1],
            'level_number': updated[2],
            'module_number': updated[3],
            'high_score': updated[4],
            'completed': updated[5],
            'last_played': updated[6]
        }
        print(json.dumps({'success': True, 'progress': progress}))
    else:
        print(json.dumps({'success': False, 'error': 'Failed to retrieve updated progress'}))

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
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${output}`));
      }
    });
  });
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
    const { level_number, module_number, score, completed } = body;

    // Validation
    if (level_number === undefined || module_number === undefined) {
      return NextResponse.json(
        { error: 'level_number and module_number are required' },
        { status: 400 }
      );
    }

    // Save progress using Python subprocess
    const result: any = await saveProgressToDatabase(token, level_number, module_number, score, completed);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === 'Unauthorized' ? 401 : 500 }
      );
    }

    return NextResponse.json({
      success: true,
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
