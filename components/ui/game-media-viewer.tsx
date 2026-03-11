"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface GameMediaViewerProps {
  videoUrl?: string | null;
  imageUrl: string;
  gameName: string;
  gameId: string;
}

export function GameMediaViewer({ videoUrl, imageUrl, gameName, gameId }: GameMediaViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max 3x zoom
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1)); // Min 1x zoom
  };

  const handleReset = () => {
    setZoomLevel(1);
  };

  return (
    <div className="mb-16">
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl bg-black max-w-5xl mx-auto">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full object-contain" />
        ) : (
          <div
            className="relative w-full h-full flex items-center justify-center overflow-auto"
            style={{
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.3s ease"
            }}
          >
            <Image
              src={imageUrl}
              alt={gameName}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Zoom Controls - Only show for images, not videos */}
      {!videoUrl && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            variant="outline"
            size="sm"
            className="h-10 px-4 font-bold"
          >
            <ZoomOut className="h-4 w-4 mr-2" />
            Zoom Out
          </Button>

          <div className="text-sm font-bold text-muted-foreground min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </div>

          <Button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            variant="outline"
            size="sm"
            className="h-10 px-4 font-bold"
          >
            <ZoomIn className="h-4 w-4 mr-2" />
            Zoom In
          </Button>

          {zoomLevel !== 1 && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="h-10 px-4 font-bold"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
