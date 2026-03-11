import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { GameCard } from "@/components/ui/game-card"
import { ArrowLeft } from "lucide-react"
import { getCategoryBySlug, getGamesByCategory, type CategoryId } from "@/lib/games-data"
import WaveBackground from "@/components/ui/waveBackground"

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    notFound();
  }

  const games = getGamesByCategory(category.id as CategoryId);

  // Color mapping for the UI
  const colorMap: Record<string, { bg: string; text: string; border: string; accent: string; dotColor: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", accent: "bg-blue-500", dotColor: "#1c82c2" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/20", accent: "bg-violet-500", dotColor: "#8b5cf6" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/20", accent: "bg-cyan-500", dotColor: "#06b6d4" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", accent: "bg-amber-500", dotColor: "#f59e0b" },
    green: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20", accent: "bg-green-500", dotColor: "#10b981" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/20", accent: "bg-pink-500", dotColor: "#ec4899" },
  };

  const colors = colorMap[category.color] || colorMap.blue;

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-muted/30 border-b border-border">
        {/* Wave Background Animation */}
        <div className="absolute inset-0 z-0">
          <WaveBackground
            lineColor={`${colors.dotColor.replace(')', ', 0.3)')}`}
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
            Back to All Categories
          </Link>

          <div className="max-w-4xl text-left">
            <Badge className={`mb-6 ${colors.bg} ${colors.text} ${colors.border} font-black uppercase tracking-widest px-4 py-1`}>
              Functional Domain
            </Badge>
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
              {category.title}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              <span className="font-bold text-foreground">Core function:</span> {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* GAMES SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {games.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                  Available Games & Systems
                </h2>
                <p className="text-lg text-muted-foreground font-medium">
                  {games.length} {games.length === 1 ? 'game' : 'games'} in this category
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} categorySlug={params.categorySlug} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colors.bg} ${colors.text} mb-6`}>
                <div className={`w-2 h-2 rounded-full ${colors.accent}`} />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-4">Games Coming Soon</h2>
              <p className="text-lg text-muted-foreground font-medium max-w-md mx-auto">
                We're currently developing interactive systems for this functional domain. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
