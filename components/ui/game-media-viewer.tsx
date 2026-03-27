"use client"
import Image from "next/image"

interface GameMediaViewerProps {
  videoUrl?: string | null;
  imageUrl: string;
  gameName: string;
  gameId: string;
}

export function GameMediaViewer({ videoUrl, imageUrl, gameName, gameId }: GameMediaViewerProps) {
  return (
    <div className="mb-16">
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black max-w-5xl mx-auto">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full object-contain" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={gameName}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
