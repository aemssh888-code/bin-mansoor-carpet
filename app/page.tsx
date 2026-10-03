'use client';

import { useEffect } from 'react';
import {readLanguagePreference} from '@/lib/language-preference';

export default function LanguageGateway() {
  useEffect(() => {
    const saved=readLanguagePreference();
    const language = navigator.language.toLowerCase();
    const locale = saved==='ar'||saved==='en'||saved==='tr'?saved:language.startsWith('ar')?'ar':language.startsWith('tr')?'tr':language.startsWith('en')?'en':'ar';
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f5f0] p-6 text-center">
      <div>
        <output className="text-sm text-black/55">جارٍ فتح الموقع · Opening the site · Site açılıyor…</output>
        <noscript>
          <p className="mt-4 text-sm">اختر لغتك · Choose your language · Dilinizi seçin</p>
          <nav className="mt-3 flex justify-center gap-4" aria-label="Language">
            <a href="/ar" lang="ar">العربية</a>
            <a href="/en" lang="en">English</a>
            <a href="/tr" lang="tr">Türkçe</a>
          </nav>
        </noscript>
      </div>
    </main>
  );
}
