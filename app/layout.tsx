import type { Metadata } from 'next';
import './globals.css';

const siteUrl = new URL('https://paroli.michail-karnas.chatgpt.site');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Παρόλι — Σουβλάκι κατευθείαν στην πόρτα σου',
  description: 'Παράγγειλε online τα αγαπημένα σου από το Παρόλι, απευθείας από εμάς.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: siteUrl,
    siteName: 'Παρόλι',
    title: 'Παρόλι — Σουβλάκι κατευθείαν στην πόρτα σου',
    description: 'Παράγγειλε online από Νίκαια, Πασαλιμάνι ή Δραπετσώνα, χωρίς marketplace.',
    images: [
      {
        url: new URL('/og.png', siteUrl).toString(),
        width: 1730,
        height: 909,
        alt: 'Παρόλι — Από εμάς, κατευθείαν σε εσένα.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Παρόλι — Σουβλάκι κατευθείαν στην πόρτα σου',
    description: 'Παράγγειλε online από το Παρόλι, χωρίς marketplace.',
    images: [new URL('/og.png', siteUrl).toString()],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
