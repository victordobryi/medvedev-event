import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#171614',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body>
        {' '}
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
