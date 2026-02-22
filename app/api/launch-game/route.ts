import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { game } = await request.json()

    if (game !== 'mandala-painting') {
      return NextResponse.json(
        { error: 'Invalid game specified' },
        { status: 400 }
      )
    }

    // Path to the game directory
    const gamePath = path.join(process.cwd(), 'public', 'games', 'mandala-painting')

    // Check if Python is available
    try {
      await execAsync('which python3')
    } catch (error) {
      return NextResponse.json(
        { error: 'Python 3 is not installed or not in PATH' },
        { status: 500 }
      )
    }

    // Launch the game server in the background with --no-browser flag
    // This prevents the Python server from auto-opening a browser tab
    const command = `cd "${gamePath}" && python3 run_local_demo.py --no-browser &`

    exec(command, (error) => {
      if (error) {
        console.error('Error launching game:', error)
      }
    })

    // Wait a moment for the server to start
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Return the URL where the game will be available
    return NextResponse.json({
      success: true,
      url: 'http://localhost:8080/mode-selector.html',
      message: 'Game server launched successfully'
    })

  } catch (error) {
    console.error('Error in launch-game API:', error)
    return NextResponse.json(
      { error: 'Failed to launch game' },
      { status: 500 }
    )
  }
}
