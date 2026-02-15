"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from "@/components/ui/card";

interface PartnerCardAnimatedProps {
  children: ReactNode;
  delay: number; 
}

export const PartnerCardAnimated = ({ children, delay }: PartnerCardAnimatedProps) => {
  return (
    <motion.div
      // 1. SCROLL REVEAL 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.15 }}
      viewport={{ once: false, amount: 0.5 }} 

      // 2. HOVER EFFECT
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)" 
      }}
      
      // 3. BASE CARD STYLES 
      className="bg-card border border-border"
    >
      {children}
    </motion.div>
  );
};