import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import AuthRedirect from "@/components/auth/AuthRedirect";

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
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased instrument-sans bg-[#fafafa] dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
          <AuthRedirect />
        </ThemeProvider>
        <Analytics />
        <NextTopLoader
          color="#000000" />
          <Toaster />
      </body>
    </html>
  );
}
