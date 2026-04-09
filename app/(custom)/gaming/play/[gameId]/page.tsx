"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Gamepad2, PlayCircle, Headphones, ChevronDown, BarChart3 } from "lucide-react"
import { createClient } from "@/lib/supabase"

const RESULTS_STATE_KEY = "sonic-pop-results-state"
const POLL_INTERVAL_MS = 2000
const MAX_POLL_ATTEMPTS = 12

type AnalyticsStatus = {
  sessionId: string
  status: "processing" | "ready"
}

export default function GamePlayerPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(true); // Auto-start game, skip intermediate screen
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analyticsStatus, setAnalyticsStatus] = useState<AnalyticsStatus | null>(null);

  const persistAnalyticsState = (nextState: AnalyticsStatus) => {
    setAnalyticsStatus(nextState);
    localStorage.setItem(RESULTS_STATE_KEY, JSON.stringify(nextState));
  };

  // Check for simple game login
  useEffect(() => {
    const checkGameUser = () => {
      console.log('🎮 Game Player Page: Checking game user...');

      const storedUser = sessionStorage.getItem('neurogati_game_user');

      if (storedUser) {
        try {
          const gameUser = JSON.parse(storedUser);
          console.log('✅ Game user found:', gameUser.username);
          setUser(gameUser);
        } catch (e) {
          console.error('❌ Error parsing game user:', e);
          sessionStorage.removeItem('neurogati_game_user');
        }
      } else {
        console.log('ℹ️ No game user found');
      }

      setLoading(false);
    };

    checkGameUser();

    // Expose Supabase client for game iframes
    if (typeof window !== 'undefined') {
      (window as any).createSupabaseClient = () => createClient();
      console.log('✅ Supabase client exposed to games');
    }
  }, []);

  // Auto-minimize header after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem(RESULTS_STATE_KEY)
      if (raw) {
        setAnalyticsStatus(JSON.parse(raw))
      }
    } catch (error) {
      console.error("Failed to restore Sonic Pop analytics status:", error)
    }
  }, [])

  useEffect(() => {
    if (params.gameId !== "sonic-pop") return

    let cancelled = false

    const pollAnalytics = async (sessionId: string, attempt = 1) => {
      try {
        const response = await fetch(
          `/api/sonic-pop/results?sessionId=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        )

        if (cancelled) return

        if (response.status === 202) {
          persistAnalyticsState({ sessionId, status: "processing" })
          if (attempt < MAX_POLL_ATTEMPTS) {
            window.setTimeout(() => {
              if (!cancelled) {
                pollAnalytics(sessionId, attempt + 1)
              }
            }, POLL_INTERVAL_MS)
          }
          return
        }

        if (response.ok) {
          persistAnalyticsState({ sessionId, status: "ready" })
          return
        }

        console.error(`Failed to poll analytics for session ${sessionId}: ${response.status}`)
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to poll Sonic Pop analytics:", error)
        }
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const payload = event.data
      if (
        params.gameId === "sonic-pop" &&
        payload?.type === "sonic-pop:analytics-uploaded" &&
        payload?.sessionId
      ) {
        persistAnalyticsState({ sessionId: payload.sessionId, status: "processing" })
        pollAnalytics(payload.sessionId)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      cancelled = true
      window.removeEventListener("message", handleMessage)
    }
  }, [params.gameId])

  const gameRegistry: Record<string, string> = {
    "sonic-drive": "/games/sonic-drive/index.html", // Sonic Racer - served from public/games/sonic-drive/
    "sonic-pop": "/games/sonic-pop/index.html", // Sonic Pop - served from public/games/sonic-pop/
    "posabets": "/games/posabets/index.html", // Posabets - served from public/games/posabets/
    "mandala-painting": "/games/mandala-painting/index.html", // Mandala Painting - served from public/games/mandala-painting/
  };

  const gameUrl = gameRegistry[params.gameId];

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to game login if not authenticated
  if (!user) {
    router.push(`/gaming/game-login?game=${params.gameId}`);
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Game not found
  if (!gameUrl) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Game Registry Entry Missing: {params.gameId}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[9999] overflow-hidden">
      {/* COLLAPSIBLE HEADER */}
      <div
        className={`fixed top-0 left-0 right-0 h-14 bg-black/90 flex items-center justify-between px-6 border-b border-white/10 z-50 backdrop-blur-lg transition-transform duration-500 ease-in-out ${
          isHeaderExpanded ? 'translate-y-0' : '-translate-y-14'
        }`}
      >
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-5 w-5 text-blue-500" />
          <span className="text-white font-black tracking-tighter uppercase text-xs">
            {params.gameId.replace("-", " ")} | Neurogati Arcade
          </span>
        </div>
        <button
          onClick={() => router.push('/gamingcategories')}
          className="text-slate-400 hover:text-white font-bold text-xs uppercase bg-white/5 px-4 py-2 rounded-full transition-all mr-12"
        >
          <X className="h-4 w-4 inline mr-1" /> Exit
        </button>
      </div>

      {params.gameId === "sonic-pop" && analyticsStatus && (
        <div className="fixed top-20 right-4 z-[70] max-w-sm rounded-2xl border border-cyan-400/25 bg-slate-950/95 px-4 py-4 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-cyan-400/15 p-2 text-cyan-300">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
                Analytics
              </p>
              <p className="mt-1 text-sm text-slate-200">
                {analyticsStatus.status === "ready"
                  ? "Your analytics are ready. Use the Analytics button in the game top panel to view them."
                  : "Telemetry uploaded. Your analytics are being prepared now."}
              </p>
              {analyticsStatus.status === "ready" && (
                <button
                  onClick={() =>
                    router.push(
                      `/gaming/play/sonic-pop/results?sessionId=${encodeURIComponent(analyticsStatus.sessionId)}`
                    )
                  }
                  className="mt-3 inline-flex items-center rounded-xl bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950"
                >
                  Open Analytics
                </button>
              )}
            </div>
            <button
              onClick={() => setAnalyticsStatus(null)}
              className="text-slate-500 hover:text-white"
              aria-label="Dismiss analytics notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* TOGGLE BUTTON - Always visible */}
      <button
        onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
        className="fixed top-1 right-3 w-9 h-9 bg-black/90 border border-white/20 rounded-lg z-[60] flex items-center justify-center hover:bg-black hover:scale-110 transition-all backdrop-blur-lg"
        aria-label="Toggle header"
      >
        <ChevronDown
          className={`h-5 w-5 text-white transition-transform duration-300 ${
            isHeaderExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        {/* INTERACTION OVERLAY (Only shows if game hasn't started) */}
        {!hasStarted && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <div className="max-w-md w-full p-8 text-center space-y-8">
              <div className="flex justify-center gap-4">
                <Headphones className="h-12 w-12 text-blue-500 animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                  Ready to Play?
                </h2>
                <p className="text-slate-400 font-medium">
                  Please ensure your headphones are on. This experience uses spatial audio for navigation.
                </p>
              </div>

              <button 
                onClick={() => setHasStarted(true)}
                className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-black text-white bg-blue-600 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20"
              >
                <PlayCircle className="mr-3 h-6 w-6" />
                <span className="text-xl uppercase tracking-tighter">Enter Experience</span>
              </button>

              <p className="text-[10px] text-slate-600 uppercase font-black tracking-[0.2em]">
                Interacting unlocks browser audio
              </p>
            </div>
          </div>
        )}

        {/* THE GAME IFRAME */}
        <iframe
          src={gameUrl}
          className={`absolute inset-0 w-full h-full border-none transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}
          allow="camera; microphone; autoplay; fullscreen"
          title="Neurogati Game Player"
        />
      </div>
    </div>
  );
}
