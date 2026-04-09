'use client';

import React, { useState, useRef } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const workshopConfig = {
  active: true,
  message: "Registrations Opening Soon for 'Neurogati Summer School 2026: From Neural Dynamics to Neurotechnology' - June 15-26, 2026",
  link: "/workshops/summer-school-2026",
};

export default function WorkshopBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [overDismiss, setOverDismiss] = useState(false); // New state for boundary
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  if (!workshopConfig.active || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 48, opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        /* Hide system cursor ONLY if we are NOT over the dismiss button */
        className={`relative w-full overflow-hidden group ${isHovered && !overDismiss ? 'cursor-none' : 'cursor-default'}`}
      >
        {/* MAIN CLICKABLE BACKGROUND */}
        <a 
          href={workshopConfig.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-400 transition-all duration-700"
        >
          <p className="text-white text-lg md:text-base font-regular tracking-tight px-12 text-center select-none">
            {workshopConfig.message}
          </p>
        </a>

        {/* CURSOR-FOLLOWING 'REGISTER' PILL */}
        <AnimatePresence>
          {/* Only show if hovered over banner AND NOT over the dismiss button */}
          {isHovered && !overDismiss && (
            <motion.div
              className="pointer-events-none z-50 flex items-center justify-center"
              style={{
                left: cursorX,
                top: cursorY,
                x: "-50%", 
                y: "-50%",
                position: 'absolute'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="bg-white text-[#1c82c2] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-2 whitespace-nowrap">
                Register <ArrowUpRight className="h-3 w-3 stroke-[3]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DISMISS BUTTON - The "Safe Zone" */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(true);
          }} 
          /* Trigger boundary logic */
          onMouseEnter={() => setOverDismiss(true)}
          onMouseLeave={() => setOverDismiss(false)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
