"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Gamepad2, PlayCircle, Headphones, ChevronDown, Lock } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { AuthModal } from "@/components/auth/AuthModal"

export default function GamePlayerPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const supabase = createClient();

  // Check authentication
  useEffect(() => {
    const checkUser = async () => {
      console.log('🎮 Game Player Page: Checking user authentication...');

      // Check localStorage first
      const storageKey = 'sb-yourttiykfslostesqjp-auth-token';
      const stored = localStorage.getItem(storageKey);
      console.log('💾 Game Player: localStorage check:', stored ? 'Session FOUND' : 'NO SESSION');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          console.log('💾 Game Player: Session data:', parsed);
        } catch (e) {
          console.error('💾 Game Player: Error parsing session:', e);
        }
      }

      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('👤 Game Player: User from Supabase:', user ? user.email : 'No user');
      if (error) {
        console.error('❌ Game Player: Error getting user:', error);
      }
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsAuthModalOpen(false); // Close modal after successful login
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-minimize header after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderExpanded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  // Authentication required
  if (!user) {
    return (
      <>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="max-w-md w-full p-8 text-center space-y-8">
            <div className="flex justify-center">
              <Lock className="h-20 w-20 text-blue-500" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                Sign In Required
              </h2>
              <p className="text-slate-400 font-medium text-lg">
                You need to be logged in to play games. Please sign in to continue.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-black text-white bg-blue-600 rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20"
              >
                <span className="text-xl uppercase tracking-tighter">Sign In</span>
              </button>

              <button
                onClick={() => router.back()}
                className="text-slate-400 hover:text-white font-bold text-sm uppercase transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
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
