import type { Locale } from './products';
import { business, MIN_ORDER_M2_PER_ITEM } from './business';

const moqWestern = new Intl.NumberFormat('en-US').format(MIN_ORDER_M2_PER_ITEM);
const moqTurkish = new Intl.NumberFormat('tr-TR').format(MIN_ORDER_M2_PER_ITEM);

export const locales: Locale[] = ['ar', 'en', 'tr'];

export const languageNames: Record<Locale, string> = {
  ar: 'العربية', en: 'English', tr: 'Türkçe',
};

export const dictionaries = {
  ar: {
    a11y: { skip: 'تخطي إلى المحتوى', primaryNav: 'التنقل الرئيسي', language: 'اللغة', openMenu: 'فتح القائمة', mobileNav: 'قائمة الهاتف', closeMenu: 'إغلاق القائمة' },
    nav: { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', contact: 'تواصل معنا' },
    common: {
      explore: 'استكشف المجموعة', enquire: 'اطلب عرضًا', view: 'عرض الموديل', all: 'الكل',
      code: 'كود الموديل', category: 'التصنيف', variants: 'المعاينات اللونية', back: 'العودة للمنتجات',
      whatsapp: 'تواصل عبر واتساب', directions: 'الاتجاهات على الخريطة', call: 'اتصل بالمصنع',
      review: 'بحاجة للمراجعة', approved: 'معتمد', learnMore: 'اعرف المزيد', exploreDesign: 'استكشف التصميم',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET & BIN MANSOOR CARPET',
      title: 'تصاميم سجاد\nللأعمال والمشاريع.',
      body: 'من غازي عنتاب، تركيا.',
      note: 'تصاميم السجاد | غازي عنتاب، تركيا',
    },
    home: {
      partnerEyebrow: 'تصميم وصناعة السجاد', partnerTitle: 'تصميم وصناعة السجاد من غازي عنتاب.', partnerBody: 'هوية واحدة لكتالوج مختار يخدم طلبات الأعمال والمشاريع.',
      collectionsEyebrow: 'ثلاثة عوالم تصميمية', collectionsTitle: 'من المعاصر الهادئ إلى التفاصيل التراثية.',
      editorialEyebrow: 'تصميم مختار', editorialTitle: 'تفصيل يتحوّل إلى مشهد.',
      featuredEyebrow: 'مختارات', featuredTitle: 'ثمانية تصاميم ذات حضور مميز.',
      factoryEyebrow: 'من التصميم إلى الإنتاج', factoryTitle: 'مسار واضح من اختيار التصميم إلى تنسيق الطلب.',
      factoryBody: 'من غازي عنتاب، نقدّم كتالوجًا واضحًا وخدمة مباشرة لطلبات الأعمال والمشاريع.',
      machines: 'ماكينات', moq: 'الحد الأدنى للطلب', established: 'تأسست', sqm: 'م²',
      factsEyebrow: 'معلومات موثقة', factsTitle: 'حقائق تخص BIN MANSOOR CARPET.',
      ctaTitle: 'لديك طلب جملة أو مشروع؟', ctaBody: 'كوّن قائمة التصاميم وأرسل الكميات المطلوبة لبدء المحادثة.',
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
      specs: 'معلومات الطلب', spec1: 'استفسارات أعمال وجملة', spec2: `الحد الأدنى لكل تصميم: ${moqWestern} م²`, spec3: 'التفاصيل الفنية مع عرض السعر',
    },
    about: {
      eyebrow: 'من نحن', title: 'تصميم وصناعة السجاد من غازي عنتاب.',
      intro: 'نقدّم تجربة موحّدة لعرض تصاميم السجاد وخدمة طلبات الأعمال والمشاريع.',
      partnersEyebrow: 'هويتنا', partnersTitle: 'تصميم واضح لاحتياجات الأعمال والمشاريع.',
      storyTitle: 'تركيزنا', storyBody: 'كتالوج مختار لعملاء الأعمال، من التصاميم الحديثة إلى الخطوط الكلاسيكية والتراثية.',
      workflowTitle: 'من التصميم إلى طلبك', workflow: ['مشاركة الاحتياج', 'اختيار الموديلات', 'تأكيد التفاصيل الفنية', 'تنسيق الطلب والإنتاج'],
      addressTitle: 'بيانات التواصل', factsTitle: 'المعلومات القانونية',
    },
    contact: {
      eyebrow: 'تواصل', title: 'لنبدأ بطلبك.', body: 'أرسل أكواد الموديلات والكميات التقريبية والوجهة المطلوبة. نرد عبر الهاتف أو واتساب.',
      phone: 'الهاتف وواتساب', address: 'العنوان', legal: 'المعلومات القانونية', shared: 'بيانات التواصل', partners: 'المعلومات القانونية', cta: 'اتصل بنا',
    },
    footer: { line: 'تصميم وصناعة السجاد من غازي عنتاب.', rights: 'تايام كاربت و بن منصور كاربت' },
  },
  en: {
    a11y: { skip: 'Skip to content', primaryNav: 'Primary navigation', language: 'Language', openMenu: 'Open menu', mobileNav: 'Mobile navigation', closeMenu: 'Close menu' },
    nav: { home: 'Home', products: 'Products', about: 'About', contact: 'Contact' },
    common: {
      explore: 'Explore the collection', enquire: 'Request a quote', view: 'View model', all: 'All',
      code: 'Model code', category: 'Category', variants: 'Colour previews', back: 'Back to products',
      whatsapp: 'Chat on WhatsApp', directions: 'Open in Maps', call: 'Call the factory',
      review: 'Needs review', approved: 'Approved', learnMore: 'Learn more', exploreDesign: 'Explore design',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET & BIN MANSOOR CARPET', title: 'Carpet Design\nfor Business & Projects.',
      body: 'From Gaziantep, Türkiye.',
      note: 'Carpet designs | Gaziantep, Türkiye',
    },
    home: {
      partnerEyebrow: 'Carpet design & manufacturing', partnerTitle: 'Carpet Design & Manufacturing from Gaziantep.', partnerBody: 'One identity for a selected catalogue serving business and project enquiries.',
      collectionsEyebrow: 'Three collection worlds', collectionsTitle: 'From quiet contemporary form to heritage detail.',
      editorialEyebrow: 'Featured design', editorialTitle: 'Detail, scaled into a landscape.',
      featuredEyebrow: 'Selected designs', featuredTitle: 'Eight designs with a distinctive presence.',
      factoryEyebrow: 'From design to production', factoryTitle: 'A clear path from design selection to order coordination.',
      factoryBody: 'From Gaziantep, we present a clear catalogue and direct service for business and project enquiries.',
      machines: 'Machines', moq: 'Minimum order', established: 'Established', sqm: 'm²',
      factsEyebrow: 'Verified information', factsTitle: 'Facts specific to BIN MANSOOR CARPET.',
      ctaTitle: 'Planning a wholesale or project order?', ctaBody: 'Build a design list and send your target quantities to begin.',
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
      specs: 'Order information', spec1: 'Business and wholesale enquiries', spec2: `Minimum per design: ${moqWestern} m²`, spec3: 'Technical details supplied with quotation',
    },
    about: {
      eyebrow: 'About', title: 'Carpet Design & Manufacturing from Gaziantep.',
      intro: 'We present one brand experience for carpet design and business and project enquiries.',
      partnersEyebrow: 'Our identity', partnersTitle: 'Clear design for business and project needs.',
      storyTitle: 'Our focus', storyBody: 'A selected catalogue for business clients, spanning modern compositions and classic heritage lines.',
      workflowTitle: 'From design to your brief', workflow: ['Share your brief', 'Select models', 'Confirm technical details', 'Coordinate order and production'],
      addressTitle: 'Contact details', factsTitle: 'Legal Information',
    },
    contact: {
      eyebrow: 'Contact', title: 'Let’s begin with your brief.', body: 'Send model codes, approximate quantities and the required destination. Reach us by phone or WhatsApp.',
      phone: 'Phone & WhatsApp', address: 'Address', legal: 'Legal Information', shared: 'Contact Details', partners: 'Legal Information', cta: 'Contact us',
    },
    footer: { line: 'Carpet design and manufacturing from Gaziantep.', rights: 'TAYYAM CARPET & BIN MANSOOR CARPET' },
  },
  tr: {
    a11y: { skip: 'İçeriğe geç', primaryNav: 'Ana navigasyon', language: 'Dil', openMenu: 'Menüyü aç', mobileNav: 'Mobil navigasyon', closeMenu: 'Menüyü kapat' },
    nav: { home: 'Ana sayfa', products: 'Ürünler', about: 'Hakkımızda', contact: 'İletişim' },
    common: {
      explore: 'Koleksiyonu keşfet', enquire: 'Teklif iste', view: 'Modeli incele', all: 'Tümü',
      code: 'Model kodu', category: 'Kategori', variants: 'Renk ön izlemeleri', back: 'Ürünlere dön',
      whatsapp: 'WhatsApp’tan yazın', directions: 'Haritada aç', call: 'Fabrikayı ara',
      review: 'İncelenmeli', approved: 'Onaylı', learnMore: 'Daha fazla', exploreDesign: 'Tasarımı keşfet',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET & BIN MANSOOR CARPET', title: 'İş ve Projeler İçin\nHalı Tasarımları.',
      body: 'Gaziantep, Türkiye.',
      note: 'Halı tasarımları | Gaziantep, Türkiye',
    },
    home: {
      partnerEyebrow: 'Halı tasarımı ve üretimi', partnerTitle: "Gaziantep'ten Halı Tasarımı ve Üretimi.", partnerBody: 'Kurumsal ve proje taleplerine yönelik seçili bir katalog için tek marka deneyimi.',
      collectionsEyebrow: 'Üç koleksiyon dünyası', collectionsTitle: 'Sakin çağdaş formlardan miras detaylarına.',
      editorialEyebrow: 'Öne çıkan tasarım', editorialTitle: 'Detaydan güçlü bir görsel sahneye.',
      featuredEyebrow: 'Seçili tasarımlar', featuredTitle: 'Kendine özgü duruşa sahip sekiz tasarım.',
      factoryEyebrow: 'Tasarımdan üretime', factoryTitle: 'Tasarım seçiminden sipariş koordinasyonuna açık bir yol.',
      factoryBody: 'Gaziantep’ten kurumsal ve proje talepleri için açık bir katalog ve doğrudan hizmet sunuyoruz.',
      machines: 'Makine', moq: 'Minimum sipariş', established: 'Kuruluş', sqm: 'm²',
      factsEyebrow: 'Doğrulanmış bilgiler', factsTitle: 'BIN MANSOOR CARPET şirketine ait bilgiler.',
      ctaTitle: 'Toptan veya proje siparişi mi planlıyorsunuz?', ctaBody: 'Bir tasarım listesi oluşturun ve hedef miktarları gönderin.',
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
      specs: 'Sipariş bilgisi', spec1: 'Kurumsal ve toptan talepler', spec2: `Tasarım başına minimum: ${moqTurkish} m²`, spec3: 'Teknik detaylar teklifle paylaşılır',
    },
    about: {
      eyebrow: 'Hakkımızda', title: "Gaziantep'ten Halı Tasarımı ve Üretimi.",
      intro: 'Halı tasarımı ile kurumsal ve proje talepleri için tek marka deneyimi sunuyoruz.',
      partnersEyebrow: 'Kimliğimiz', partnersTitle: 'Kurumsal ve proje ihtiyaçları için açık tasarım.',
      storyTitle: 'Odağımız', storyBody: 'Kurumsal müşteriler için modern kompozisyonlardan klasik miras çizgilerine uzanan seçili bir katalog.',
      workflowTitle: 'Tasarımdan talebinize', workflow: ['İhtiyacı paylaşın', 'Modelleri seçin', 'Teknik detayları doğrulayın', 'Sipariş ve üretimi koordine edin'],
      addressTitle: 'İletişim bilgileri', factsTitle: 'Yasal Bilgiler',
    },
    contact: {
      eyebrow: 'İletişim', title: 'Talebinizle başlayalım.', body: 'Model kodlarını, yaklaşık miktarları ve hedef ülkeyi gönderin. Telefon veya WhatsApp üzerinden bize ulaşın.',
      phone: 'Telefon & WhatsApp', address: 'Adres', legal: 'Yasal Bilgiler', shared: 'İletişim Bilgileri', partners: 'Yasal Bilgiler', cta: 'Bize ulaşın',
    },
    footer: { line: "Gaziantep'ten halı tasarımı ve üretimi.", rights: 'TAYYAM CARPET & BIN MANSOOR CARPET' },
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
    ar: code ? `مرحباً، أرغب في الاستفسار عن موديل ${code} من تايام كاربت و بن منصور كاربت.` : 'مرحباً، أرغب في الاستفسار عن منتجات تايام كاربت و بن منصور كاربت.',
    en: code ? `Hello, I would like to enquire about model ${code} from TAYYAM CARPET & BIN MANSOOR CARPET.` : 'Hello, I would like to enquire about TAYYAM CARPET & BIN MANSOOR CARPET products.',
    tr: code ? `Merhaba, TAYYAM CARPET & BIN MANSOOR CARPET ${code} modeli hakkında bilgi almak istiyorum.` : 'Merhaba, TAYYAM CARPET & BIN MANSOOR CARPET ürünleri hakkında bilgi almak istiyorum.',
  };
  return `https://wa.me/${company.phoneHref.replace('+', '')}?text=${encodeURIComponent(messages[locale])}`;
}
