import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Παρόλι — Σουβλάκι κατευθείαν στην πόρτα σου',
  description: 'Παράγγειλε online τα αγαπημένα σου από το Παρόλι, απευθείας από εμάς.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
