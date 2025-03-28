/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import type { Metadata } from 'next';

import Providers from '@/components/general/Providers';

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
  metadataBase: new URL('https://www.yourdomain.com'), // Replace with actual domain
  manifest: '/site.webmanifest',
  title: {
    default: 'YourDomain: Your Tagline Here',
    template: '%s | YourDomain',
  },
  description: 'YourDomain is a powerful platform that enhances user experience with cutting-edge features. Optimize performance, track analytics, and maximize engagement effortlessly.',
  keywords: [
    'YourDomain',
    'SEO',
    'analytics',
    'performance tracking',
    'optimization',
  ],
  authors: [{ name: 'YourDomain Team' }],
  creator: 'YourDomain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.yourdomain.com',
    siteName: 'YourDomain',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'YourDomain - Your Tagline Here',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YourDomain: Your Tagline Here',
    description: 'YourDomain is a powerful platform that enhances user experience with cutting-edge features.',
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
      url: '/icon.png',
    },
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
              'name': 'YourDomain',
              'url': 'https://www.yourdomain.com', // Replace with actual domain
              'logo': 'https://www.yourdomain.com/icon.png', // Replace with actual logo URL
              'description': 'YourDomain is a powerful platform that enhances user experience with cutting-edge features. Optimize performance, track analytics, and maximize engagement effortlessly.',
              'sameAs': [
                'https://twitter.com/yourdomain',
                'https://facebook.com/yourdomain',
                'https://linkedin.com/company/yourdomain',
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
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''} />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
