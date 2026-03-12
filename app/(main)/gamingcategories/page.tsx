"use client"
import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { categories, games, type CategoryId } from "@/lib/games-data"
import WaveBackground from "@/components/ui/waveBackground"
import { GameCard } from "@/components/ui/game-card"
import { ChevronDown, X } from "lucide-react"

// Helper function to get color classes for filter chips
function getColorClasses(color: string) {
  const colorMap: Record<string, { bg: string; border: string; text: string; bgActive: string }> = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-500",
      bgActive: "bg-blue-500"
    },
    violet: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-500",
      bgActive: "bg-violet-500"
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-500",
      bgActive: "bg-cyan-500"
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-500",
      bgActive: "bg-amber-500"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-500",
      bgActive: "bg-green-500"
    },
    pink: {
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
      text: "text-pink-500",
      bgActive: "bg-pink-500"
    },
  };
  return colorMap[color] || colorMap.blue;
}

export default function GamingCategoriesNewPage() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Toggle category selection
  const toggleCategory = (categoryId: CategoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter games based on selected categories
  const filteredGames = selectedCategories.length === 0
    ? games
    : games.filter(game =>
        game.categories.some(cat => selectedCategories.includes(cat))
      );

  // Group games by category - ALWAYS show grouped view with horizontal scroll
  const getGamesByCategory = () => {
    const categoriesToShow = selectedCategories.length === 0
      ? categories.map(c => c.id) // Show all categories by default
      : selectedCategories;

    const grouped = categoriesToShow.map(categoryId => {
      const category = categories.find(c => c.id === categoryId);
      const categoryGames = games.filter(game => game.categories.includes(categoryId));
      return { category, games: categoryGames };
    });

    // Sort by number of games (descending) when showing all categories
    if (selectedCategories.length === 0) {
      return grouped.sort((a, b) => b.games.length - a.games.length);
    }

    return grouped;
  };

  const groupedGames = getGamesByCategory();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll effect for horizontal rows
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    const isPaused: { [key: string]: boolean } = {};

    groupedGames.forEach(({ category }) => {
      if (!category) return;

      const scrollContainer = scrollRefs.current[category.id];
      if (!scrollContainer) return;

      // Auto-scroll function
      const autoScroll = () => {
        if (isPaused[category.id]) return;

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;

        if (currentScroll >= maxScroll) {
          // Reset to beginning smoothly
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll slowly to the right
          scrollContainer.scrollBy({ left: 1, behavior: 'auto' });
        }
      };

      // Start auto-scrolling
      intervals[category.id] = setInterval(autoScroll, 30);

      // Pause on mouse enter
      const handleMouseEnter = () => {
        isPaused[category.id] = true;
      };

      // Resume on mouse leave
      const handleMouseLeave = () => {
        isPaused[category.id] = false;
      };

      // Pause on user scroll
      const handleUserScroll = () => {
        isPaused[category.id] = true;
        // Resume after 2 seconds of no interaction
        setTimeout(() => {
          isPaused[category.id] = false;
        }, 2000);
      };

      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('wheel', handleUserScroll);
      scrollContainer.addEventListener('touchstart', handleUserScroll);
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
      groupedGames.forEach(({ category }) => {
        if (!category) return;
        const scrollContainer = scrollRefs.current[category.id];
        if (scrollContainer) {
          scrollContainer.removeEventListener('mouseenter', () => {});
          scrollContainer.removeEventListener('mouseleave', () => {});
          scrollContainer.removeEventListener('wheel', () => {});
          scrollContainer.removeEventListener('touchstart', () => {});
        }
      });
    };
  }, [groupedGames]);

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-violet-500/10 text-violet-500 border-violet-500/20 font-black uppercase tracking-widest px-4 py-1">
            Interactive Systems
          </Badge>
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Exergames
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            Interactive Systems for Movement, Cognition and Skill
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Neurogati develops interactive games inspired by neuroscience and real-world clinical insight.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Our games are designed to engage specific functional abilities — from motor coordination and balance to attention, spatial skills, and imitation.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Some of our systems have undergone formal clinical evaluation. Others are exploratory tools currently being refined and studied.
          </p>
        </div>
      </section>

      {/* FILTER & GAMES SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">

          {/* Header with Integrated Filter Dropdown */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Exergame Categories
              </h2>

              {/* Dropdown Filter - Integrated */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg bg-card hover:bg-accent transition-colors font-medium text-sm"
                >
                  <span>{selectedCategories.length === 0 ? 'All Categories' : 'Filter'}</span>
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center px-1.5">
                      {selectedCategories.length}
                    </Badge>
                  )}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-sm">Filter by Functional Domain</h3>
                      {selectedCategories.length > 0 && (
                        <button
                          onClick={() => setSelectedCategories([])}
                          className="text-xs text-muted-foreground hover:text-foreground font-medium"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                  <div className="max-h-96 overflow-y-auto">
                    {categories.map((category) => {
                      const isSelected = selectedCategories.includes(category.id);
                      const colors = getColorClasses(category.color);

                      return (
                        <button
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className="w-full px-4 py-3 hover:bg-accent transition-colors text-left flex items-start gap-3 group"
                        >
                          {/* Checkbox */}
                          <div className={`
                            mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                            ${isSelected
                              ? `${colors.bgActive} border-transparent`
                              : 'border-border group-hover:border-foreground/50'
                            }
                          `}>
                            {isSelected && (
                              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          {/* Category Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`h-1 w-6 rounded-full ${colors.bgActive}`} />
                              <h4 className={`font-semibold text-sm ${isSelected ? colors.text : 'text-foreground'}`}>
                                {category.title}
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-base text-muted-foreground">
              {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} available
            </p>
          </div>

          {/* Active Filter Chips */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategories.map((categoryId) => {
                const category = categories.find(c => c.id === categoryId);
                if (!category) return null;
                const colors = getColorClasses(category.color);

                return (
                  <button
                    key={categoryId}
                    onClick={() => toggleCategory(categoryId)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                      ${colors.bg} ${colors.text} border ${colors.border}
                      hover:opacity-80 transition-opacity
                    `}
                  >
                    {category.title}
                    <X className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Games Display - Always Grouped by Category with Horizontal Scroll */}
          <div className="space-y-12">
            {groupedGames.map(({ category, games: categoryGames }) => {
              if (!category || categoryGames.length === 0) return null;
              const colors = getColorClasses(category.color);

              return (
                <div key={category.id} className="space-y-4">
                  {/* Category Header */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className={`h-1 w-12 rounded-full ${colors.bgActive}`} />
                      <h3 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.text}`}>
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 ml-15">
                      <p className="text-base text-muted-foreground">
                        {category.description}
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {categoryGames.length} {categoryGames.length === 1 ? 'game' : 'games'}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Games Row */}
                  <div className="relative group">
                    <div
                      ref={(el) => (scrollRefs.current[category.id] = el)}
                      className="overflow-x-auto overflow-y-hidden scrollbar-thin pb-4"
                    >
                      <div className="flex gap-6" style={{ width: 'max-content' }}>
                        {categoryGames.map((game) => (
                          <div key={game.id} className="w-[350px] flex-shrink-0">
                            <GameCard
                              game={game}
                              categorySlug=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVIDENCE & TRANSPARENCY */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
              Evidence & Transparency
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our portfolio includes:
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="h-1 w-8 bg-blue-500 rounded-full mb-4" />
                  <p className="font-medium text-foreground leading-relaxed">
                    Clinically evaluated systems (with peer-reviewed publications)
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="h-1 w-8 bg-violet-500 rounded-full mb-4" />
                  <p className="font-medium text-foreground leading-relaxed">
                    Pilot-tested tools used in real-world settings
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="h-1 w-8 bg-amber-500 rounded-full mb-4" />
                  <p className="font-medium text-foreground leading-relaxed">
                    In-development prototypes under active refinement
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-8 max-w-3xl mx-auto">
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                Where clinical validation exists, it is clearly referenced. Where it does not, we do not make therapeutic claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Our Philosophy
          </h2>

          <div className="space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We believe structured interaction can be both engaging and measurable.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              By combining thoughtful design with scientific insight, we aim to create games that are enjoyable, purposeful, and continuously evolving.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
