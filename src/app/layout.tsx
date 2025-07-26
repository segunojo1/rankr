import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: 'Rankr - Create and Share Rankings',
    template: '%s | Rankr',
  },
  description: 'Create, share, and vote on rankings with Rankr. The ultimate platform for collaborative decision making and preferences.',
  keywords: ['rankings', 'voting', 'decision making', 'polls', 'preferences', 'collaboration'],
  authors: [{ name: 'Rankr Team' }],
  creator: 'Rankr',
  publisher: 'Rankr',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://userankr.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rankr - Create and Share Rankings',
    description: 'The ultimate platform for collaborative decision making and preferences.',
    url: 'https://userankr.vercel.app',
    siteName: 'Rankr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rankr - Create and Share Rankings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rankr - Create and Share Rankings',
    description: 'The ultimate platform for collaborative decision making and preferences.',
    images: ['/og-image.png'],
    creator: '@segun0x',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased instrument-sans bg-[#fafafa]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
        <NextTopLoader
          color="#000000" />
          <Toaster />
      </body>
    </html>
  );
}
