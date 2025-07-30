"use client";

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import SplashScreen from '@/components/splash-screen';
import { useState, useEffect } from 'react';

const metadata: Metadata = {
  title: 'QR Genie – Instant QR Code Generator',
  description: 'Generate and customize QR codes instantly. Download as PNG, and keep a history of your creations.',
  keywords: ['QR code', 'generator', 'custom QR', 'PNG download', 'free QR code'],
  authors: [{ name: 'Kishan Patel' }],
  openGraph: {
    title: 'QR Genie – Instant QR Code Generator',
    description: 'Generate and customize QR codes instantly. Download as PNG, and keep a history of your creations.',
    url: 'https://qr-genie.vercel.app',
    siteName: 'QR Genie',
    images: [
      {
        url: '/og.png', // Replace with your actual OG image path
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Genie – Instant QR Code Generator',
    description: 'Generate and customize QR codes instantly. Download as PNG, and keep a history of your creations.',
    images: ['/og.png'], // Replace with your actual OG image path
    creator: '@your_twitter_handle', // Replace with your Twitter handle
  },
  metadataBase: new URL('https://qr-genie.vercel.app'),
  themeColor: '#6246EA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-body antialiased">
        {loading ? (
          <SplashScreen />
        ) : (
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
