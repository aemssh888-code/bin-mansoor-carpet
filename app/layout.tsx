import type { Metadata } from 'next';
import {siteUrl} from '@/lib/site-origin.mjs';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'TAYYAM CARPET & BIN MANSOOR CARPET', template: '%s — TAYYAM CARPET & BIN MANSOOR CARPET' },
  description: 'Carpet design and manufacturing from Gaziantep, Türkiye, with modern, modern classic and heritage collections for business and projects.',
  applicationName: 'TAYYAM CARPET & BIN MANSOOR CARPET',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
