import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bin-mansoor-carpet.vercel.app'),
  title: { default: 'TAYYAM CARPET & BIN MANSOOR CARPET', template: '%s — TAYYAM CARPET & BIN MANSOOR CARPET' },
  description: 'Two partner carpet companies in Gaziantep, Türkiye, presenting modern, modern classic and heritage carpet collections for business and projects.',
  applicationName: 'TAYYAM CARPET & BIN MANSOOR CARPET',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
