import { QrCode } from 'lucide-react';
import QRGenieApp from '@/components/qr-genie-app';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 bg-background">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <QrCode className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl">
            QR Genie
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Instant QR Code Generator
        </p>
      </header>
      <main className="w-full">
        <QRGenieApp />
      </main>
    </div>
  );
}
