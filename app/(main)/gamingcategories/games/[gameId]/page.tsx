"use client"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink, Activity, Target, Cpu, Brain, Headphones, PlayCircle } from "lucide-react"
import { getGameById } from "@/lib/games-data"
import WaveBackground from "@/components/ui/waveBackground"
import { GameMediaViewer } from "@/components/ui/game-media-viewer"

interface GameDetailPageProps {
  params: {
    gameId: string;
  };
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const game = getGameById(params.gameId);

  if (!game) {
    notFound();
  }

  // Icon mapping based on game type
  const getTechIcon = () => {
    if (game.tech?.toLowerCase().includes('audio') || game.tech?.toLowerCase().includes('binaural')) {
      return <Headphones className="h-4 w-4" />;
    }
    if (game.tech?.toLowerCase().includes('dda') || game.tech?.toLowerCase().includes('difficulty')) {
      return <Brain className="h-4 w-4" />;
    }
    return <Cpu className="h-4 w-4" />;
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Wave Background Animation */}
        <div className="absolute inset-0 z-0">
          <WaveBackground
            lineColor="rgba(28, 130, 194, 0.3)"
            backgroundColor="transparent"
            waveCount={35}
            enableZoom={true}
            zoomSpeed={0.0015}
            zoomIntensity={0.2}
          />
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Navigation */}
          <Link
            href="/gamingcategories"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>

          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-widest px-4 py-1">
              {game.isPlatform ? 'Therapeutic Platform' : 'Interactive Game'}
            </Badge>
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
              {game.name}
            </h1>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-blue-500 mb-8">
              {game.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* GAME DETAILS SECTION */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* LARGE CENTERED MEDIA */}
          <GameMediaViewer
            videoUrl={game.videoUrl}
            imageUrl={game.images[0]}
            gameName={game.name}
            gameId={game.id}
          />

          {/* CONTENT SECTION */}
          <div className="space-y-12">
            {/* Overview */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Overview</h2>
              <p className="text-[19px] text-foreground/80 leading-relaxed font-medium">
                {game.overview}
              </p>
            </div>

            {/* Technology Highlight */}
            {game.tech && (
              <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-blue-500/[0.03] border border-blue-500/10 backdrop-blur-sm">
                <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 flex items-center justify-center gap-2">
                  {getTechIcon()} Technology Highlight
                </h4>
                <p className="text-[17px] font-black text-foreground mb-2 text-center">{game.tech}</p>
                {!game.isPlatform && (
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium text-center">
                    Validated in partnership with leading neurological institutions for clinical efficacy.
                  </p>
                )}
              </div>
            )}

            {/* Features & Applications */}
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Features */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                  <Target className="h-4 w-4" /> {game.isPlatform ? 'Core Features' : 'Key Features'}
                </h4>
                <ul className="space-y-4">
                  {game.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-[17px] font-medium text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500 mb-6">
                  <Activity className="h-4 w-4" /> Therapeutic Focus
                </h4>
                <ul className="space-y-4">
                  {game.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-[17px] font-medium text-muted-foreground">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-border/50 flex flex-col items-center gap-6">
              {game.action ? (
                <Button
                  asChild
                  size="lg"
                  className="h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-full px-12 transition-all"
                >
                  <Link
                    href={game.action.href}
                    target={game.action.external ? "_blank" : "_self"}
                  >
                    {game.action.label} <ExternalLink className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="h-16 bg-[#104581] hover:bg-blue-900 text-white text-xl font-black rounded-full px-12 transition-all"
                >
                  <Link href="/contact">
                    Request Demo <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              )}

              {game.isPlatform && (
                <p className="text-muted-foreground font-medium text-center">
                  Partner with our lab to bring this platform to your institution
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl font-black text-white tracking-tight">NEUROGATI</h3>
          <div className="text-sm text-slate-500 font-bold flex flex-col md:flex-row items-center gap-6">
            <p>Indian Institute of Technology, Madras | Chennai 600036</p>
            <a
              href="mailto:gaming@neurogati.com"
              className="text-slate-500 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
            >
              gaming@neurogati.com
            </a>
          </div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
            © 2026 NEUROGATI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
