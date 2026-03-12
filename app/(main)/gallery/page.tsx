"use client"
import { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, Users, Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

// Event data structure
interface Event {
  id: string
  title: string
  subtitle: string
  date: string
  location: string
  description: string
  images: string[]
  videos: string[]
  category: "workshop" | "event" | "collaboration"
}

const events: Event[] = [
  {
    id: "clarke-anubhav-2024",
    title: "Anubhav",
    subtitle: "Inclusive Innovation Showcase",
    date: "December 2024",
    location: "The Clarke School for the Deaf, Chennai",
    description: "An interactive technology and learning experience event introducing children and educators to innovative assistive technologies and rehabilitation games. Students explored gesture-based interactive games and AI-assisted learning activities designed to support motor development, cognitive engagement, and inclusive learning experiences.",
    images: [
      "/images/gallery/clarke anubhav event/1.jpg",
      "/images/gallery/clarke anubhav event/2.jpg",
      "/images/gallery/clarke anubhav event/3.jpg",
      "/images/gallery/clarke anubhav event/4.jpg",
      "/images/gallery/clarke anubhav event/5.jpg",
      "/images/gallery/clarke anubhav event/6.jpg",
      "/images/gallery/clarke anubhav event/7.jpg",
      "/images/gallery/clarke anubhav event/8.jpg",
      "/images/gallery/clarke anubhav event/9.jpg",
      "/images/gallery/clarke anubhav event/IMG_20251218_120956.jpg"
    ],
    videos: [
      "/images/gallery/clarke anubhav event/blur_faces.mp4",
      "/images/gallery/clarke anubhav event/blur_faces2.mp4",
      "/images/gallery/clarke anubhav event/blur_faces3.mp4",
      "/images/gallery/clarke anubhav event/blur_faces4.mp4"
    ],
    category: "collaboration"
  }
]

export default function GalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const photoScrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const videoScrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})


  const openLightbox = (event: Event, index: number) => {
    setSelectedEvent(event)
    setSelectedMediaIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const nextMedia = () => {
    if (selectedEvent) {
      const totalMedia = selectedEvent.images.length + selectedEvent.videos.length
      setSelectedMediaIndex((prev) => (prev + 1) % totalMedia)
    }
  }

  const prevMedia = () => {
    if (selectedEvent) {
      const totalMedia = selectedEvent.images.length + selectedEvent.videos.length
      setSelectedMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia)
    }
  }

  const getCurrentMedia = () => {
    if (!selectedEvent) return null
    const allMedia = [...selectedEvent.images, ...selectedEvent.videos]
    return allMedia[selectedMediaIndex]
  }

  const isVideo = (url: string) => url.endsWith('.mp4') || url.endsWith('.webm')

  // Auto-scroll effect for photo and video rows
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    const isPaused: { [key: string]: boolean } = {};

    events.forEach(event => {
      // Auto-scroll for photos
      const photoScrollContainer = photoScrollRefs.current[`${event.id}-photos`];
      if (photoScrollContainer) {
        const autoScrollPhotos = () => {
          if (isPaused[`${event.id}-photos`]) return;

          const maxScroll = photoScrollContainer.scrollWidth - photoScrollContainer.clientWidth;
          const currentScroll = photoScrollContainer.scrollLeft;

          if (currentScroll >= maxScroll) {
            photoScrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            photoScrollContainer.scrollBy({ left: 1, behavior: 'auto' });
          }
        };

        intervals[`${event.id}-photos`] = setInterval(autoScrollPhotos, 30);

        const handleMouseEnter = () => { isPaused[`${event.id}-photos`] = true; };
        const handleMouseLeave = () => { isPaused[`${event.id}-photos`] = false; };
        const handleUserScroll = () => {
          isPaused[`${event.id}-photos`] = true;
          setTimeout(() => { isPaused[`${event.id}-photos`] = false; }, 2000);
        };

        photoScrollContainer.addEventListener('mouseenter', handleMouseEnter);
        photoScrollContainer.addEventListener('mouseleave', handleMouseLeave);
        photoScrollContainer.addEventListener('wheel', handleUserScroll);
        photoScrollContainer.addEventListener('touchstart', handleUserScroll);
      }

      // Auto-scroll for videos
      const videoScrollContainer = videoScrollRefs.current[`${event.id}-videos`];
      if (videoScrollContainer) {
        const autoScrollVideos = () => {
          if (isPaused[`${event.id}-videos`]) return;

          const maxScroll = videoScrollContainer.scrollWidth - videoScrollContainer.clientWidth;
          const currentScroll = videoScrollContainer.scrollLeft;

          if (currentScroll >= maxScroll) {
            videoScrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            videoScrollContainer.scrollBy({ left: 1, behavior: 'auto' });
          }
        };

        intervals[`${event.id}-videos`] = setInterval(autoScrollVideos, 30);

        const handleMouseEnter = () => { isPaused[`${event.id}-videos`] = true; };
        const handleMouseLeave = () => { isPaused[`${event.id}-videos`] = false; };
        const handleUserScroll = () => {
          isPaused[`${event.id}-videos`] = true;
          setTimeout(() => { isPaused[`${event.id}-videos`] = false; }, 2000);
        };

        videoScrollContainer.addEventListener('mouseenter', handleMouseEnter);
        videoScrollContainer.addEventListener('mouseleave', handleMouseLeave);
        videoScrollContainer.addEventListener('wheel', handleUserScroll);
        videoScrollContainer.addEventListener('touchstart', handleUserScroll);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-violet-500/10 text-violet-500 border-violet-500/20 font-black uppercase tracking-widest px-4 py-1">
            Events & Initiatives
          </Badge>
          <h1 className="mb-8 text-4xl md:text-7xl lg:text-7xl font-black tracking-tighter leading-[1.1] py-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            Capturing moments of innovation, collaboration, and impact
          </p>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          {events.map((event) => (
            <div key={event.id} className="space-y-8">

                {/* Event Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`
                        ${event.category === 'collaboration' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' : ''}
                        ${event.category === 'workshop' ? 'bg-green-500/10 text-green-500 border-green-500/30' : ''}
                        ${event.category === 'event' ? 'bg-violet-500/10 text-violet-500 border-violet-500/30' : ''}
                        font-bold uppercase text-xs tracking-wider
                      `}
                    >
                      {event.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                      {event.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                {/* Event Description - Concise */}
                <div className="max-w-4xl">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Photo Album - Netflix Style Horizontal Scroll */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <div className="h-1 w-8 bg-violet-500 rounded-full" />
                    Photo Album
                  </h3>

                  {/* Horizontal Scrollable Photos */}
                  <div className="relative group">
                    <div
                      ref={(el) => (photoScrollRefs.current[`${event.id}-photos`] = el)}
                      className="overflow-x-auto overflow-y-hidden scrollbar-thin pb-4"
                    >
                      <div className="flex gap-6" style={{ width: 'max-content' }}>
                        {event.images.map((image, idx) => (
                          <div
                            key={idx}
                            onClick={() => openLightbox(event, idx)}
                            className="relative w-[400px] h-[300px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group/image bg-muted border border-border hover:border-violet-500/50 transition-all hover:scale-[1.02]"
                          >
                            <Image
                              src={image}
                              alt={`${event.title} photo ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="400px"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Highlights - Netflix Style Horizontal Scroll */}
                {event.videos.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <div className="h-1 w-8 bg-cyan-500 rounded-full" />
                      Video Highlights
                    </h3>

                    {/* Horizontal Scrollable Videos */}
                    <div className="relative group">
                      <div
                        ref={(el) => (videoScrollRefs.current[`${event.id}-videos`] = el)}
                        className="overflow-x-auto overflow-y-hidden scrollbar-thin pb-4"
                      >
                        <div className="flex gap-6" style={{ width: 'max-content' }}>
                          {event.videos.map((video, idx) => (
                            <div
                              key={idx}
                              className="relative w-[500px] h-[281px] flex-shrink-0 rounded-xl overflow-hidden bg-muted border border-border hover:border-cyan-500/50 transition-all"
                            >
                              <video
                                src={video}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Acknowledgment */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 md:p-8 max-w-4xl">
                  <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-medium">
                    We are grateful to The Clarke School for their collaboration in hosting this event and their remarkable role in providing quality education for children with hearing and speech challenges.
                  </p>
                </div>

              </div>
            ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-24 text-center py-20 border-t border-border">
          <div className="inline-flex p-6 rounded-full bg-muted/50 border border-border mb-6">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4">
            More Events Coming Soon
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay tuned for more collaborations, workshops, and initiatives as we continue our mission
            to make technology accessible and empowering for everyone.
          </p>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {isLightboxOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevMedia}
            className="absolute left-4 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextMedia}
            className="absolute right-4 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Media Display */}
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {getCurrentMedia() && isVideo(getCurrentMedia()!) ? (
              <video
                src={getCurrentMedia()!}
                controls
                autoPlay
                className="max-w-full max-h-full"
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={getCurrentMedia()!}
                  alt="Gallery item"
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm font-medium">
            {selectedMediaIndex + 1} / {selectedEvent.images.length + selectedEvent.videos.length}
          </div>
        </div>
      )}

    </div>
  )
}
