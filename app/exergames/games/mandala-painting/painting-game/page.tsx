"use client"

import Link from "next/link"
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function PaintingGamePlayerPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gameUrl, setGameUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // Launch the game server when component mounts
    const launchGame = async () => {
      try {
        const response = await fetch('/api/launch-game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ game: 'mandala-painting' }),
        })

        if (response.ok) {
          const data = await response.json()
          // Wait a bit for server to fully start
          setTimeout(() => {
            setGameUrl(data.url)
            setIsLoading(false)
          }, 2000)
        } else {
          setError('Failed to launch game server')
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error launching game:', err)
        setError('Error launching game. Please ensure Python 3 is installed.')
        setIsLoading(false)
      }
    }

    launchGame()
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-royal-950">
        <header className="border-b border-royal-800 bg-royal-900/50 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between py-4">
            <Link
              href="/exergames/games/mandala-painting"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Game Info</span>
            </Link>
            <div className="text-white font-semibold">Mandala Art Painting Game</div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Launching Game...</h2>
            <p className="text-gray-400">Starting the game server, please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-royal-950">
        <header className="border-b border-royal-800 bg-royal-900/50 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between py-4">
            <Link
              href="/exergames/games/mandala-painting"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Game Info</span>
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Launch Game</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <Link href="/exergames/games/mandala-painting">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col bg-royal-950 ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      <header className="border-b border-royal-800 bg-royal-900/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          {!isFullscreen && (
            <Link
              href="/exergames/games/mandala-painting"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Game Info</span>
            </Link>
          )}
          <div className="text-white font-semibold">Mandala Art Painting Game</div>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-royal-800 hover:text-white bg-transparent"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4 mr-2" />
                Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="flex-1 relative">
        <iframe
          src={gameUrl}
          className="w-full h-full border-0"
          style={{ minHeight: isFullscreen ? '100vh' : 'calc(100vh - 4rem)' }}
          title="Mandala Art Painting Game"
          allow="camera; microphone; fullscreen; storage-access"
          sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-downloads"
        />
      </div>
    </div>
  )
}
