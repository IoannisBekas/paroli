import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = new URL('https://ioannisbekas.github.io/paroli/');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Πάρολι — Σουβλάκι κατευθείαν στην πόρτα σου',
  description: 'Παράγγειλε online τα αγαπημένα σου από το Πάρολι, απευθείας από εμάς.',
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: siteUrl,
    siteName: 'Πάρολι',
    title: 'Πάρολι — Σουβλάκι κατευθείαν στην πόρτα σου',
    description: 'Παράγγειλε online από Νίκαια, Πασαλιμάνι ή Δραπετσώνα, χωρίς marketplace.',
    images: [
      {
        url: new URL('/og.png', siteUrl).toString(),
        width: 1730,
        height: 909,
        alt: 'Πάρολι — Από εμάς, κατευθείαν σε εσένα.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Πάρολι — Σουβλάκι κατευθείαν στην πόρτα σου',
    description: 'Παράγγειλε online από το Πάρολι, χωρίς marketplace.',
    images: [new URL('/og.png', siteUrl).toString()],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fff9ed',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
