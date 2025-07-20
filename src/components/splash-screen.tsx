"use client";

import { QrCode } from "lucide-react";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animated opacity-70"></div>
      <div className="absolute inset-0 bg-grid-cyan-500/10 bg-grid-14 [mask-image:radial-gradient(ellipse_at_center,white,transparent_50%)]"></div>
      
      <div className="text-center z-10">
        <div className="flex justify-center items-center gap-4 mb-8 opacity-0 animate-title-fade-in">
          <QrCode className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-300" />
          <h1 className="text-5xl sm:text-7xl font-bold text-white">
            QR Genie
          </h1>
        </div>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold glitch opacity-0 animate-fade-in animation-delay-500" data-text="Welcome">
          <span aria-hidden="true">Welcome</span>
          Welcome
          <span aria-hidden="true">Welcome</span>
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl mt-6 opacity-0 animate-fade-in animation-delay-[1s]">
          from Kishan Patel
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
