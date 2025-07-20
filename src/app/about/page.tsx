import { ArrowLeft, Code, Cpu, Github, Home as HomeIcon, Info, Instagram, Linkedin, Mail, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full bg-background dark:bg-gradient-animated font-body antialiased">
      <div className="absolute inset-0 bg-grid-cyan-500/10 bg-grid-14 [mask-image:radial-gradient(ellipse_at_top_center,white,transparent_70%)]"></div>
      
      <nav className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-foreground dark:text-white hover:bg-accent/50 dark:hover:bg-white/10 dark:hover:text-cyan-300 transition-all duration-300">
            <Link href="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
            </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-foreground dark:text-white hover:bg-accent/50 dark:hover:bg-white/10 dark:hover:text-cyan-300 transition-all duration-300">
            <Link href="/about">
                <Info className="mr-2 h-4 w-4" />
                About
            </Link>
        </Button>
        <ThemeToggle />
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-24">
        {/* Hero Section */}
        <section className="text-center pt-24 pb-12">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground/80 to-foreground animate-fade-in-down dark:from-neutral-50 dark:to-neutral-400">
            QR Genie <span className="text-cyan-400">🔮</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground dark:text-neutral-300 max-w-2xl mx-auto animate-fade-in-up">
            Create stunning QR codes instantly with style.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <Button asChild size="lg" className="btn-gradient hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
              <Link href="/">
                <ArrowLeft className="mr-2" />
                Back to Generator
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 hover:scale-105 transition-all duration-300">
              <a href="https://kishan-patels-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                View Portfolio
              </a>
            </Button>
          </div>
        </section>

        {/* About the Tool */}
        <section className="p-6 sm:p-8 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-cyan-400">About the Tool</h2>
          <p className="text-base sm:text-lg text-muted-foreground dark:text-neutral-300 text-center max-w-3xl mx-auto">
            QR Genie is a smart QR code generator that supports customization, logo embedding, and instant downloads. Built with Next.js, Tailwind CSS, TypeScript, and LocalStorage. Designed for speed and elegance.
          </p>
        </section>

        {/* How to Use */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-400">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:shadow-cyan-500/20">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-cyan-500/10 dark:bg-cyan-900/50 border-2 border-cyan-500 text-cyan-400 dark:text-cyan-300 mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Content</h3>
              <p className="text-muted-foreground dark:text-neutral-400">Input your URL or text into the field.</p>
            </div>
            <div className="p-6 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:shadow-cyan-500/20">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-cyan-500/10 dark:bg-cyan-900/50 border-2 border-cyan-500 text-cyan-400 dark:text-cyan-300 mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customize</h3>
              <p className="text-muted-foreground dark:text-neutral-400">Adjust the color, size, and style to match your brand.</p>
            </div>
            <div className="p-6 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:shadow-cyan-500/20">
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-cyan-500/10 dark:bg-cyan-900/50 border-2 border-cyan-500 text-cyan-400 dark:text-cyan-300 mx-auto mb-4">
                 <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate & Download</h3>
              <p className="text-muted-foreground dark:text-neutral-400">Click generate and download your QR code as a PNG.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-400">Tech Stack</h2>
          <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
            <div className="group flex flex-col items-center gap-2">
              <div className="p-4 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-xl shadow-lg transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                <Layers3 className="h-10 w-10 sm:h-12 sm:w-12 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground dark:text-neutral-400">Next.js</span>
            </div>
            <div className="group flex flex-col items-center gap-2">
              <div className="p-4 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-xl shadow-lg transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                 <svg className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tailwind CSS</title><path fill="currentColor" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>
              </div>
              <span className="text-sm text-muted-foreground dark:text-neutral-400">Tailwind CSS</span>
            </div>
             <div className="group flex flex-col items-center gap-2">
              <div className="p-4 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-xl shadow-lg transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.272c.14-.246.208-.54.208-.885c0-1.018-.54-1.78-1.533-2.227c-.31-.132-1.1-.532-1.157-.55c-.015-.004-.044.03-.044.03c-.02.012-.04.023-.05.03c-.02.012-.03.023-.05.034c-.02.012-.03.023-.04.034c-.02.01-.03.02-.04.03c-.02.01-.03.02-.04.027c-1.28.69-2.012 1.635-2.012 2.85c0 .346.068.64.208.886c.21.363.59.62.97.746c.38.125.86.195 1.35.195c.57 0 1.13-.082 1.6-.25c.47-.168.81-.433 1.02-.793zm-3.41-1.353c0-.42.185-.77.5-.98c.315-.21.734-.316 1.25-.316c.41 0 .76.063 1.05.186c.29.123.5.312.63.562c.13.25.19.55.19.89c0 .42-.18.77-.5.98c-.32.21-.74.315-1.26.315c-.41 0-.76-.062-1.05-.185c-.29-.124-.5-.313-.63-.563c-.13-.25-.18-.55-.18-.89zM8.28 15.633c.437 0 .83-.05 1.18-.15c.35-.1.65-.26.9-.48c.25-.22.45-.5.6-.84c.15-.34.22-.73.22-1.18c0-.45-.07-..84-.22-1.18c-.15-.34-.35-.62-.6-.84c-.25-.22-.55-.38-.9-.48c-.35-.1-.74-.15-1.18-.15c-.43 0-.82.05-1.17.15c-.35.1-.64.26-.89.48c-.25.22-.44.5-.59.84c-.15.34-.22.73-.22 1.18c0 .45.07.84.22 1.18c.15.34.34.62.59.84c.25.22.54.38.89.48c.34.1.73.15 1.17.15zm0-4.43c.27 0 .5-.04.68-.12c.18-.08.33-.2.45-.35c.12-.15.2-.33.25-.54c.05-.2.08-.43.08-.68c0-.25-.03-.48-.08-.68c-.05-.2-.13-.38-.25-.53c-.12-.15-.27-.27-.45-.35c-.18-.08-.4-.12-.68-.12c-.27 0-.5.04-.68-.12c-.18.08-.33.2-.45.35c-.12.15-.2.33-.25.53c-.05.2-.08.43-.08.68c0 .25.03.48.08.68c.05.2.13.38.25.54c.12.15.27.27.45.35c.18.08.4.12.68.12zm-3.19 4.43h1.64c.27 0 .5-.05.68-.15c.18-.1.33-.24.44-.43c.1-.19.16-.42.16-.69V6.033h-2.92v10.03zM15.402 12.443c0 .24-.04.45-.12.63c-.08.18-.2.33-.35.45c-.15.12-.33.2-.54.25c-.2.05-.43.08-.68.08c-.25 0-.48-.03-.68-.08c-.2-.05-.38-.13-.53-.25c-.15-.12-.27-.27-.35-.45c-.08-.18-.12-.39-.12-.63c0-.24.04-.45.12-.63c.08-.18.2-.33.35-.45c.15-.12.33-.2.53-.25c.2-.05.43-.08.68-.08c.25 0 .48-.03.68.08c.2.05.38.13.54.25c.15.12.27.27.35.45c.08.18.12.39.12.63zm-3.19 3.19h1.64c.27 0 .5-.05.68-.15c.18-.1.33-.24.44-.43c.1-.19.16-.42.16-.69V6.033h-2.92v10.03z"/></svg>
              </div>
              <span className="text-sm text-muted-foreground dark:text-neutral-400">JavaScript</span>
            </div>
          </div>
        </section>

        {/* About Developer */}
        <section className="p-6 sm:p-8 bg-card/50 dark:bg-black/20 backdrop-blur-md border border-border dark:border-white/10 rounded-2xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-cyan-400">About the Developer</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
               <img src="/profile.png" alt="Kishan Patel" className="w-full h-full rounded-full border-4 border-cyan-500 shadow-lg object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold">Kishan Patel</h3>
              <p className="text-md sm:text-lg text-cyan-400 mt-1">B.Tech AIML Student & Frontend Developer</p>
              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <a href="https://github.com/Kishan779-art" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-neutral-300 hover:text-cyan-400 transition-colors"><Github size={28} /></a>
                <a href="https://www.instagram.com/kishan_patel_7799_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-neutral-300 hover:text-cyan-400 transition-colors"><Instagram size={28} /></a>
                <a href="https://wa.me/918200094510" target="_blank" rel="noopener noreferrer" className="text-muted-foreground dark:text-neutral-300 hover:text-cyan-400 transition-colors"><Send size={28} /></a>
              </div>
               <Button asChild size="lg" className="mt-8 btn-gradient hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
                <a href="https://kishan-patels-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Visit My Portfolio
                </a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="relative z-10 w-full py-6 text-center text-muted-foreground mt-12 px-4">
          <p>Built with ❤️ by Kishan Patel | QR Genie v1.0</p>
          <Link href="/" className="hover:text-cyan-400 transition-colors mt-2 inline-block">Back to Home</Link>
      </footer>
    </div>
  );
};

export default AboutPage;
