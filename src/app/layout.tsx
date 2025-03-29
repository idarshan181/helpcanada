/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { Metadata } from 'next';

import Hydration from '@/components/general/Hydration';

import Providers from '@/components/general/Providers';

import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://helpcanada.vercel.app'),
  manifest: '/site.webmanifest',
  title: {
    default: 'HelpCanada: Discover Canadian Products',
    template: '%s | HelpCanada',
  },
  description:
    'HelpCanada is your go-to platform for discovering and shopping high-quality Canadian-made products in grocery, health, beauty, and more.',
  keywords: [
    'HelpCanada',
    'Canadian products',
    'Made in Canada',
    'Buy Canadian',
    'Grocery',
    'Health',
    'Beauty',
    'Local products',
  ],
  authors: [{ name: 'HelpCanada Team' }],
  creator: 'HelpCanada',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://helpcanada.vercel.app',
    siteName: 'HelpCanada',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'HelpCanada - Discover Canadian Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelpCanada: Discover Canadian Products',
    description:
      'Find high-quality Canadian products curated for grocery, health, and lifestyle needs. Support local businesses with HelpCanada.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'HelpCanada',
              'url': 'https://helpcanada.vercel.app',
              'logo': 'https://helpcanada.vercel.app/icon.png',
              'description':
        'HelpCanada helps users discover and shop high-quality Canadian-made products across grocery, health, beauty, and pharmacy categories.',
              'sameAs': [
                'https://twitter.com/helpcanada',
                'https://facebook.com/helpcanada',
                'https://linkedin.com/company/helpcanada',
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster richColors closeButton />
          <Hydration />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''} />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
