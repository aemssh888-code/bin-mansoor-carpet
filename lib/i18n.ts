import type { Locale } from './products';
import { business } from './business';

export const locales: Locale[] = ['ar', 'en', 'tr'];

export const languageNames: Record<Locale, string> = {
  ar: 'العربية', en: 'English', tr: 'Türkçe',
};

export const dictionaries = {
  ar: {
    a11y: { skip: 'تخطي إلى المحتوى', primaryNav: 'التنقل الرئيسي', language: 'اللغة', openMenu: 'فتح القائمة', mobileNav: 'قائمة الهاتف', closeMenu: 'إغلاق القائمة' },
    nav: { home: 'الرئيسية', products: 'المنتجات', about: 'المصنع', contact: 'تواصل معنا' },
    common: {
      explore: 'استكشف المجموعة', enquire: 'اطلب عرضًا', view: 'عرض الموديل', all: 'الكل',
      code: 'كود الموديل', category: 'التصنيف', variants: 'المعاينات اللونية', back: 'العودة للمنتجات',
      whatsapp: 'تواصل عبر واتساب', directions: 'الاتجاهات على الخريطة', call: 'اتصل بالمصنع',
      review: 'بحاجة للمراجعة', approved: 'معتمد', learnMore: 'اعرف المزيد',
    },
    hero: {
      eyebrow: 'صناعة سجاد • غازي عنتاب',
      title: 'تصاميم سجاد للأعمال والمشاريع، من غازي عنتاب.',
      body: 'كتالوج معتمد لطلبات الجملة والمشاريع، مع تنسيق مباشر لاختيار الموديلات وتفاصيل الطلب.',
      note: 'تصاميم السجاد | غازي عنتاب، تركيا',
    },
    home: {
      collectionsEyebrow: 'ثلاثة اتجاهات تصميمية', collectionsTitle: 'تفاصيل مختلفة. رؤية واحدة.',
      featuredEyebrow: 'مختارات', featuredTitle: 'موديلات بارزة من الكتالوج.',
      factoryEyebrow: 'حقائق عن المصنع', factoryTitle: 'شريك تصنيع واضح ومباشر.',
      factoryBody: 'من غازي عنتاب، ننسّق استفسارات الأعمال واختيار الموديلات ومتطلبات الطلب ضمن مسار واضح.',
      machines: 'ماكينات', moq: 'الحد الأدنى للطلب', established: 'تأسست', sqm: 'م²',
      ctaTitle: 'لديك طلب جملة أو مشروع؟', ctaBody: 'أرسل الموديلات والكميات المطلوبة لبدء المحادثة.',
    },
    products: {
      eyebrow: 'الكتالوج', title: 'مجموعات السجاد',
      body: 'تصفّح الموديلات المعتمدة، ثم افتح صفحة الموديل لرؤية المعاينات اللونية وإرسال استفسار مباشر.',
      count: 'موديلًا', empty: 'لا توجد موديلات ضمن هذا التصنيف.',
    },
    categories: { modern: 'مودرن', 'modern-classic': 'مودرن كلاسيك', 'classic-heritage': 'كلاسيك وتراثي' },
    categoryDescriptions: {
      modern: 'أشكال تجريدية وخطوط هادئة للمساحات المعاصرة.',
      'modern-classic': 'توازن بين البنية الحديثة وتفاصيل الإطار الكلاسيكي.',
      'classic-heritage': 'زخارف متوارثة وميداليات وتفاصيل غنية.',
    },
    detail: {
      enquiryTitle: 'استفسر عن هذا الموديل', enquiryBody: 'أرسل الكود واللون والكمية التقريبية، وسنرتّب الخطوة التالية.',
      specs: 'معلومات الطلب', spec1: 'استفسارات أعمال وجملة', spec2: 'الحد الأدنى الإجمالي 8,000 م²', spec3: 'التفاصيل الفنية مع عرض السعر',
    },
    about: {
      eyebrow: 'عن الشركة', title: 'مصنّع سجاد من غازي عنتاب.',
      intro: 'BIN MANSOOR CARPET هي علامة تابعة لشركة BINMANSOOR HALI TEKSTİL İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ، تأسست عام 2023.',
      storyTitle: 'تركيزنا', storyBody: 'نقدّم كتالوجًا متنوعًا لعملاء الأعمال، من التصاميم الحديثة إلى الخطوط الكلاسيكية والتراثية.',
      workflowTitle: 'مسار التعاون', workflow: ['مشاركة الاحتياج', 'اختيار الموديلات', 'تأكيد التفاصيل الفنية', 'تنسيق الطلب والإنتاج'],
      addressTitle: 'المصنع', factsTitle: 'حقائق أساسية',
    },
    contact: {
      eyebrow: 'تواصل', title: 'لنبدأ بطلبك.', body: 'أرسل أكواد الموديلات والكميات التقريبية والوجهة المطلوبة. نرد عبر الهاتف أو واتساب.',
      phone: 'الهاتف وواتساب', address: 'العنوان', legal: 'الاسم القانوني',
    },
    footer: { line: 'سجاد للأعمال والمشاريع، من غازي عنتاب.', rights: 'BIN MANSOOR CARPET' },
  },
  en: {
    a11y: { skip: 'Skip to content', primaryNav: 'Primary navigation', language: 'Language', openMenu: 'Open menu', mobileNav: 'Mobile navigation', closeMenu: 'Close menu' },
    nav: { home: 'Home', products: 'Products', about: 'Factory', contact: 'Contact' },
    common: {
      explore: 'Explore the collection', enquire: 'Request a quote', view: 'View model', all: 'All',
      code: 'Model code', category: 'Category', variants: 'Colour previews', back: 'Back to products',
      whatsapp: 'Chat on WhatsApp', directions: 'Open in Maps', call: 'Call the factory',
      review: 'Needs review', approved: 'Approved', learnMore: 'Learn more',
    },
    hero: {
      eyebrow: 'Carpet manufacturing • Gaziantep', title: 'Carpet design for business and projects, from Gaziantep.',
      body: 'An approved catalogue for wholesale and project enquiries, with direct coordination on model selection and order details.',
      note: 'Carpet designs | Gaziantep, Türkiye',
    },
    home: {
      collectionsEyebrow: 'Three design directions', collectionsTitle: 'Distinct details. One perspective.',
      featuredEyebrow: 'Selected works', featuredTitle: 'Featured models from the catalogue.',
      factoryEyebrow: 'Factory facts', factoryTitle: 'A clear, direct production partner.',
      factoryBody: 'From Gaziantep, we coordinate business enquiries, model selection and order requirements through a straightforward process.',
      machines: 'Machines', moq: 'Minimum order', established: 'Established', sqm: 'm²',
      ctaTitle: 'Planning a wholesale or project order?', ctaBody: 'Send your preferred models and target quantities to begin.',
    },
    products: {
      eyebrow: 'Catalogue', title: 'Carpet collections',
      body: 'Browse approved models, open any product for colour previews, and send a direct enquiry.',
      count: 'models', empty: 'No models in this category yet.',
    },
    categories: { modern: 'Modern', 'modern-classic': 'Modern Classic', 'classic-heritage': 'Classic & Heritage' },
    categoryDescriptions: {
      modern: 'Abstract forms and quieter lines for contemporary interiors.',
      'modern-classic': 'Modern structure balanced with a classic framed language.',
      'classic-heritage': 'Inherited ornament, medallions and richly detailed compositions.',
    },
    detail: {
      enquiryTitle: 'Enquire about this model', enquiryBody: 'Send the code, colour and approximate quantity, and we will coordinate the next step.',
      specs: 'Order information', spec1: 'Business and wholesale enquiries', spec2: 'Total MOQ: 8,000 m²', spec3: 'Technical details supplied with quotation',
    },
    about: {
      eyebrow: 'About the company', title: 'A carpet manufacturer from Gaziantep.',
      intro: 'BIN MANSOOR CARPET is operated by BINMANSOOR HALI TEKSTİL İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ, established in 2023.',
      storyTitle: 'Our focus', storyBody: 'We present a varied catalogue for business clients, spanning modern compositions and classic heritage lines.',
      workflowTitle: 'Working together', workflow: ['Share your brief', 'Select models', 'Confirm technical details', 'Coordinate order and production'],
      addressTitle: 'Factory', factsTitle: 'Key facts',
    },
    contact: {
      eyebrow: 'Contact', title: 'Let’s begin with your brief.', body: 'Send model codes, approximate quantities and the required destination. Reach us by phone or WhatsApp.',
      phone: 'Phone & WhatsApp', address: 'Address', legal: 'Legal name',
    },
    footer: { line: 'Carpets for business and projects, from Gaziantep.', rights: 'BIN MANSOOR CARPET' },
  },
  tr: {
    a11y: { skip: 'İçeriğe geç', primaryNav: 'Ana navigasyon', language: 'Dil', openMenu: 'Menüyü aç', mobileNav: 'Mobil navigasyon', closeMenu: 'Menüyü kapat' },
    nav: { home: 'Ana sayfa', products: 'Ürünler', about: 'Fabrika', contact: 'İletişim' },
    common: {
      explore: 'Koleksiyonu keşfet', enquire: 'Teklif iste', view: 'Modeli incele', all: 'Tümü',
      code: 'Model kodu', category: 'Kategori', variants: 'Renk ön izlemeleri', back: 'Ürünlere dön',
      whatsapp: 'WhatsApp’tan yazın', directions: 'Haritada aç', call: 'Fabrikayı ara',
      review: 'İncelenmeli', approved: 'Onaylı', learnMore: 'Daha fazla',
    },
    hero: {
      eyebrow: 'Halı üretimi • Gaziantep', title: 'Gaziantep’ten iş ve projeler için halı tasarımları.',
      body: 'Toptan ve proje talepleri için onaylı katalog; model seçimi ve sipariş detaylarında doğrudan koordinasyon.',
      note: 'Halı tasarımları | Gaziantep, Türkiye',
    },
    home: {
      collectionsEyebrow: 'Üç tasarım yaklaşımı', collectionsTitle: 'Farklı detaylar. Ortak bir bakış.',
      featuredEyebrow: 'Seçkiler', featuredTitle: 'Katalogdan öne çıkan modeller.',
      factoryEyebrow: 'Fabrika bilgileri', factoryTitle: 'Açık ve doğrudan bir üretim ortağı.',
      factoryBody: 'Gaziantep’ten iş taleplerini, model seçimini ve sipariş ihtiyaçlarını anlaşılır bir süreçle koordine ediyoruz.',
      machines: 'Makine', moq: 'Minimum sipariş', established: 'Kuruluş', sqm: 'm²',
      ctaTitle: 'Toptan veya proje siparişi mi planlıyorsunuz?', ctaBody: 'Başlamak için tercih ettiğiniz modelleri ve hedef miktarı gönderin.',
    },
    products: {
      eyebrow: 'Katalog', title: 'Halı koleksiyonları',
      body: 'Onaylı modelleri inceleyin, renk ön izlemelerini görün ve doğrudan talep gönderin.',
      count: 'model', empty: 'Bu kategoride henüz model yok.',
    },
    categories: { modern: 'Modern', 'modern-classic': 'Modern Klasik', 'classic-heritage': 'Klasik & Miras' },
    categoryDescriptions: {
      modern: 'Çağdaş iç mekânlar için soyut formlar ve sakin çizgiler.',
      'modern-classic': 'Modern strüktür ile klasik çerçeve dilinin dengesi.',
      'classic-heritage': 'Geleneksel motifler, madalyonlar ve zengin detaylar.',
    },
    detail: {
      enquiryTitle: 'Bu model için bilgi alın', enquiryBody: 'Kod, renk ve yaklaşık miktarı gönderin; sonraki adımı birlikte planlayalım.',
      specs: 'Sipariş bilgisi', spec1: 'Kurumsal ve toptan talepler', spec2: 'Toplam minimum: 8.000 m²', spec3: 'Teknik detaylar teklifle paylaşılır',
    },
    about: {
      eyebrow: 'Şirket hakkında', title: 'Gaziantep’ten bir halı üreticisi.',
      intro: 'BIN MANSOOR CARPET, 2023 yılında kurulan BINMANSOOR HALI TEKSTİL İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ tarafından işletilmektedir.',
      storyTitle: 'Odağımız', storyBody: 'Kurumsal müşteriler için modern kompozisyonlardan klasik miras çizgilerine uzanan çeşitli bir katalog sunuyoruz.',
      workflowTitle: 'Birlikte çalışma', workflow: ['İhtiyacı paylaşın', 'Modelleri seçin', 'Teknik detayları doğrulayın', 'Sipariş ve üretimi koordine edin'],
      addressTitle: 'Fabrika', factsTitle: 'Temel bilgiler',
    },
    contact: {
      eyebrow: 'İletişim', title: 'Talebinizle başlayalım.', body: 'Model kodlarını, yaklaşık miktarları ve hedef ülkeyi gönderin. Telefon veya WhatsApp üzerinden bize ulaşın.',
      phone: 'Telefon & WhatsApp', address: 'Adres', legal: 'Ticari unvan',
    },
    footer: { line: 'Gaziantep’ten iş ve proje halıları.', rights: 'BIN MANSOOR CARPET' },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export const company = business;

export function whatsappUrl(locale: Locale, code?: string) {
  const messages = {
    ar: code ? `مرحباً، أرغب في الاستفسار عن موديل ${code} من BIN MANSOOR CARPET.` : 'مرحباً، أرغب في الاستفسار عن منتجات BIN MANSOOR CARPET.',
    en: code ? `Hello, I would like to enquire about model ${code} from BIN MANSOOR CARPET.` : 'Hello, I would like to enquire about BIN MANSOOR CARPET products.',
    tr: code ? `Merhaba, BIN MANSOOR CARPET ${code} modeli hakkında bilgi almak istiyorum.` : 'Merhaba, BIN MANSOOR CARPET ürünleri hakkında bilgi almak istiyorum.',
  };
  return `https://wa.me/${company.phoneHref.replace('+', '')}?text=${encodeURIComponent(messages[locale])}`;
}
