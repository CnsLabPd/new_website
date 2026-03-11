"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PlayCircle } from "lucide-react"
import type { Game } from "@/lib/games-data"

interface GameCardProps {
  game: Game;
  categorySlug: string;
}

export function GameCard({ game, categorySlug }: GameCardProps) {
  return (
    <Link
      href={`/gamingcategories/games/${game.id}`}
      className="group block"
    >
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
        {/* Game Image/Video Thumbnail */}
        <div className="relative aspect-[3/2] overflow-hidden bg-black">
          {game.videoUrl ? (
            <div className="relative w-full h-full">
              <video
                src={game.videoUrl}
                className="w-full h-full object-contain"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <PlayCircle className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ) : (
            <Image
              src={game.images[0]}
              alt={game.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          )}

          {/* Platform Badge */}
          {game.isPlatform && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-500/90 text-white border-0 font-black uppercase tracking-wider">
                Platform
              </Badge>
            </div>
          )}
        </div>

        {/* Game Info */}
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-blue-500 transition-colors">
              {game.name}
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
              {game.tagline}
            </p>
            <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
              {game.overview}
            </p>
          </div>

          {/* View Details Link */}
          <div className="flex items-center text-sm font-black uppercase tracking-widest text-blue-500 group-hover:gap-3 gap-2 transition-all pt-2">
            View Details <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
