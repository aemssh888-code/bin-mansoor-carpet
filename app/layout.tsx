import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bin-mansoor-carpet.deep-bee-1082.chatgpt.site'),
  title: { default: 'BIN MANSOOR CARPET', template: '%s — BIN MANSOOR CARPET' },
  description: 'B2B carpet manufacturer in Gaziantep, Türkiye. Modern, modern classic and heritage carpet collections.',
  applicationName: 'BIN MANSOOR CARPET',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}

