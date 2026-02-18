"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Gamepad2, PlayCircle, Headphones } from "lucide-react"

export default function GamePlayerPage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);

  const gameRegistry: Record<string, string> = {
    "sonic-drive": "https://sonic-drive-9w4o.vercel.app/", 
    "balloon-pop": "https://balloon-game-nine.vercel.app/",
    "posabets":"https://posabets.vercel.app/",
  
  };

  const gameUrl = gameRegistry[params.gameId];

  if (!gameUrl) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Game Registry Entry Missing: {params.gameId}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="h-14 bg-black/90 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-5 w-5 text-blue-500" />
          <span className="text-white font-black tracking-tighter uppercase text-xs">
            {params.gameId.replace("-", " ")} | Neurogati Arcade
          </span>
        </div>
        <button 
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white font-bold text-xs uppercase bg-white/5 px-4 py-2 rounded-full transition-all"
        >
          <X className="h-4 w-4 inline mr-1" /> Exit
        </button>
      </div>

      <div className="relative flex-grow w-full bg-[#050505]">
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