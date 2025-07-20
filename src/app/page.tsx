import { QrCode, Github } from 'lucide-react';
import QRGenieApp from '@/components/qr-genie-app';
import ThemeToggle from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-animated text-foreground">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <header className="w-full pt-16 pb-8 text-center px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <QrCode className="w-12 h-12 text-cyan-400" />
          <h1 className="text-5xl font-bold tracking-tight font-headline sm:text-6xl">
            QR Genie
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create beautiful, custom QR codes in seconds. Instantly generate, customize, and download QR codes for your projects.
        </p>
      </header>

      <main className="w-full flex-grow">
        <QRGenieApp />
      </main>

      <footer className="w-full py-6 text-center text-muted-foreground mt-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <p>Created by Firebase Studio</p>
          <a href="https://github.com/Firebase/studio-samples" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
