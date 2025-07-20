import { QrCode, Home as HomeIcon, Info } from 'lucide-react';
import QRGenieApp from '@/components/qr-genie-app';
import ThemeToggle from '@/components/theme-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gradient-animated text-foreground">
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

      <header className="w-full pt-20 pb-12 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-cyan-500/10 bg-grid-14 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"></div>
        <div className="relative z-10">
          <div className="inline-block p-4 bg-card/50 dark:bg-black/20 border border-border dark:border-white/10 rounded-2xl mb-6 shadow-lg backdrop-blur-sm">
            <QrCode className="w-12 h-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight font-headline sm:text-6xl lg:text-7xl">
            QR Genie
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto sm:text-xl">
            Create beautiful, custom QR codes in seconds. Instantly generate, customize, and download QR codes for your projects.
          </p>
        </div>
      </header>

      <main className="w-full flex-grow relative z-10">
        <QRGenieApp />
      </main>

      <footer className="w-full py-6 text-center text-muted-foreground mt-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <p>&copy; {new Date().getFullYear()} QR Genie. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <p>Designed & Developed by Kishan Patel</p>
            <span className="text-gray-500">|</span>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
