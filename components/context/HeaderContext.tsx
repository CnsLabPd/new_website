"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

const HeaderContext = createContext({
  bannerActive: true,
  setBannerActive: (val: boolean) => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [bannerActive, setBannerActive] = useState(false); // Default false for SSR

  useEffect(() => {
    const dismissed = localStorage.getItem('neurogati_workshop_banner_dismissed') === 'true';
    setBannerActive(!dismissed);
  }, []);

  return (
    <HeaderContext.Provider value={{ bannerActive, setBannerActive }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);