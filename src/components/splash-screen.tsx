"use client";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold glitch" data-text="Welcome">
          <span aria-hidden="true">Welcome</span>
          Welcome
          <span aria-hidden="true">Welcome</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 opacity-0 animate-fade-in animation-delay-500">
          from Kishan Patel
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
