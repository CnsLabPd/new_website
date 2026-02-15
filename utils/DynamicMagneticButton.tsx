// src/utils/DynamicMagneticButton.tsx

import dynamic from 'next/dynamic';

// This dynamically imports your MagneticButton component.
// The ssr: false flag tells Next.js to replace this component with a placeholder 
// (or nothing) during server-side rendering, eliminating the hydration conflict.
export const DynamicMagneticButton = dynamic(
  () => import('@/components/ui/magnetic-button').then(mod => mod.MagneticButton),
  { 
    ssr: false, 
    loading: () => <div className="p-4 rounded-full bg-gray-700 animate-pulse">Loading...</div> // Optional: shows something while loading
  } 
);