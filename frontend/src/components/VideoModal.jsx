import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Video Container */}
      <div className="relative bg-black rounded-[28px] overflow-hidden max-w-4xl w-full shadow-2xl z-10 border border-zinc-800">
        {/* Top bar controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/10"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/10"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
            poster="/assets/winter-video-banner.png"
          />

          {/* Bottom Overlay Title */}
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <h3 className="text-white text-lg font-bold tracking-widest uppercase">
              MILAN WINTER CAMPAIGN '25
            </h3>
            <p className="text-zinc-400 text-xs tracking-wider uppercase mt-0.5">
              Filmed on Location in Reykjavik & Paris Atelier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
