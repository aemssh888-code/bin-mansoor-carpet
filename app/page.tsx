'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LanguageGateway() {
  useEffect(() => {
    const language = navigator.language.toLowerCase();
    const locale = language.startsWith('ar') ? 'ar' : language.startsWith('tr') ? 'tr' : 'en';
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f5f0] p-6 text-center">
      <div>
        <img src="/media/brand/bin-mansoor-logo.webp" alt="BIN MANSOOR CARPET" width="320" height="185" className="mx-auto mb-10 w-64 mix-blend-multiply" />
        <p className="mb-5 text-sm text-black/55">اختر اللغة · Choose your language · Dil seçin</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/ar" className="border border-black/15 bg-white px-5 py-3 hover:border-black">العربية</Link>
          <Link href="/en" className="border border-black/15 bg-white px-5 py-3 hover:border-black">English</Link>
          <Link href="/tr" className="border border-black/15 bg-white px-5 py-3 hover:border-black">Türkçe</Link>
        </div>
      </div>
    </main>
  );
}
