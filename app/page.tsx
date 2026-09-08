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
        <img src="/media/brand/bin-mansoor-logo.webp" alt="BIN MANSOOR CARPET" width="320" height="185" className="mx-auto mb-10 w-64 mix-blend-multiply" />
        <output className="text-sm text-black/55">جارٍ فتح الموقع · Opening the site · Site açılıyor…</output>
      </div>
    </main>
  );
}
