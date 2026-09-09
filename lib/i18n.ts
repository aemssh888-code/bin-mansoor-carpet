import type { Locale } from './products';
import { business } from './business';

export const locales: Locale[] = ['ar', 'en', 'tr'];

export const languageNames: Record<Locale, string> = {
  ar: 'العربية', en: 'English', tr: 'Türkçe',
};

export const dictionaries = {
  ar: {
    a11y: { skip: 'تخطي إلى المحتوى', primaryNav: 'التنقل الرئيسي', language: 'اللغة', openMenu: 'فتح القائمة', mobileNav: 'قائمة الهاتف', closeMenu: 'إغلاق القائمة' },
    nav: { home: 'الرئيسية', products: 'المنتجات', about: 'الشراكة', contact: 'تواصل معنا' },
    common: {
      explore: 'استكشف المجموعة', enquire: 'اطلب عرضًا', view: 'عرض الموديل', all: 'الكل',
      code: 'كود الموديل', category: 'التصنيف', variants: 'المعاينات اللونية', back: 'العودة للمنتجات',
      whatsapp: 'تواصل عبر واتساب', directions: 'الاتجاهات على الخريطة', call: 'اتصل بالمصنع',
      review: 'بحاجة للمراجعة', approved: 'معتمد', learnMore: 'اعرف المزيد', exploreDesign: 'استكشف التصميم',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET × BIN MANSOOR CARPET',
      title: 'تصاميم سجاد\nللأعمال والمشاريع.',
      body: 'شراكة TAYYAM CARPET و BIN MANSOOR CARPET من غازي عنتاب.',
      note: 'تصاميم السجاد | غازي عنتاب، تركيا',
    },
    home: {
      partnerEyebrow: 'شركتان شريكتان', partnerTitle: 'هوية مشتركة. خبرتان متكاملتان.', partnerBody: 'تلتقي TAYYAM CARPET وBIN MANSOOR CARPET في حضور واحد لعرض التصاميم وخدمة طلبات الأعمال والمشاريع.',
      collectionsEyebrow: 'ثلاثة عوالم تصميمية', collectionsTitle: 'من المعاصر الهادئ إلى التفاصيل التراثية.',
      editorialEyebrow: 'تصميم مختار', editorialTitle: 'تفصيل يتحوّل إلى مشهد.',
      featuredEyebrow: 'مختارات', featuredTitle: 'ثمانية تصاميم ذات حضور مميز.',
      factoryEyebrow: 'الشراكة والتصنيع', factoryTitle: 'مسار واضح من اختيار التصميم إلى تنسيق الطلب.',
      factoryBody: 'من غازي عنتاب، تعمل الشركتان معًا لتقديم كتالوج واضح وخدمة مباشرة لطلبات الأعمال والمشاريع.',
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
      specs: 'معلومات الطلب', spec1: 'استفسارات أعمال وجملة', spec2: 'الحد الأدنى الإجمالي 8,000 م²', spec3: 'التفاصيل الفنية مع عرض السعر',
    },
    about: {
      eyebrow: 'عن الشراكة', title: 'شراكة في صناعة السجاد من غازي عنتاب.',
      intro: 'يمثّل هذا الموقع شركتين شريكتين تعملان معًا في تقديم تصاميم السجاد وخدمة طلبات الأعمال والمشاريع.',
      partnersEyebrow: 'الشركات الشريكة', partnersTitle: 'شركتان. حضور واحد.',
      storyTitle: 'تركيزنا', storyBody: 'نقدّم كتالوجًا متنوعًا لعملاء الأعمال، من التصاميم الحديثة إلى الخطوط الكلاسيكية والتراثية.',
      workflowTitle: 'مسار التعاون', workflow: ['مشاركة الاحتياج', 'اختيار الموديلات', 'تأكيد التفاصيل الفنية', 'تنسيق الطلب والإنتاج'],
      addressTitle: 'بيانات التواصل المشتركة', factsTitle: 'حقائق موثقة تخص BIN MANSOOR CARPET',
    },
    contact: {
      eyebrow: 'تواصل', title: 'لنبدأ بطلبك.', body: 'أرسل أكواد الموديلات والكميات التقريبية والوجهة المطلوبة. نرد عبر الهاتف أو واتساب.',
      phone: 'الهاتف وواتساب', address: 'العنوان', legal: 'الأسماء القانونية', shared: 'بيانات التواصل المشتركة للموقع', partners: 'الشركات الشريكة',
    },
    footer: { line: 'شراكة في صناعة وتصميم السجاد من غازي عنتاب.', rights: 'تايام كاربت و بن منصور كاربت' },
  },
  en: {
    a11y: { skip: 'Skip to content', primaryNav: 'Primary navigation', language: 'Language', openMenu: 'Open menu', mobileNav: 'Mobile navigation', closeMenu: 'Close menu' },
    nav: { home: 'Home', products: 'Products', about: 'Partnership', contact: 'Contact' },
    common: {
      explore: 'Explore the collection', enquire: 'Request a quote', view: 'View model', all: 'All',
      code: 'Model code', category: 'Category', variants: 'Colour previews', back: 'Back to products',
      whatsapp: 'Chat on WhatsApp', directions: 'Open in Maps', call: 'Call the factory',
      review: 'Needs review', approved: 'Approved', learnMore: 'Learn more', exploreDesign: 'Explore design',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET × BIN MANSOOR CARPET', title: 'Carpet Design\nfor Business & Projects.',
      body: 'A partnership between TAYYAM CARPET and BIN MANSOOR CARPET in Gaziantep.',
      note: 'Carpet designs | Gaziantep, Türkiye',
    },
    home: {
      partnerEyebrow: 'Two partner companies', partnerTitle: 'One presence. Two complementary perspectives.', partnerBody: 'TAYYAM CARPET and BIN MANSOOR CARPET come together to present design collections and serve business and project enquiries.',
      collectionsEyebrow: 'Three collection worlds', collectionsTitle: 'From quiet contemporary form to heritage detail.',
      editorialEyebrow: 'Featured design', editorialTitle: 'Detail, scaled into a landscape.',
      featuredEyebrow: 'Selected designs', featuredTitle: 'Eight designs with a distinctive presence.',
      factoryEyebrow: 'Partnership & production', factoryTitle: 'A clear path from design selection to order coordination.',
      factoryBody: 'From Gaziantep, the two companies work together to present a clear catalogue and direct service for business and project enquiries.',
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
      specs: 'Order information', spec1: 'Business and wholesale enquiries', spec2: 'Total MOQ: 8,000 m²', spec3: 'Technical details supplied with quotation',
    },
    about: {
      eyebrow: 'About the partnership', title: 'A carpet partnership from Gaziantep.',
      intro: 'This website represents two partner companies working together to present carpet designs and serve business and project enquiries.',
      partnersEyebrow: 'Partner companies', partnersTitle: 'Two companies. One presence.',
      storyTitle: 'Our focus', storyBody: 'We present a varied catalogue for business clients, spanning modern compositions and classic heritage lines.',
      workflowTitle: 'Working together', workflow: ['Share your brief', 'Select models', 'Confirm technical details', 'Coordinate order and production'],
      addressTitle: 'Shared contact details', factsTitle: 'Verified BIN MANSOOR CARPET facts',
    },
    contact: {
      eyebrow: 'Contact', title: 'Let’s begin with your brief.', body: 'Send model codes, approximate quantities and the required destination. Reach us by phone or WhatsApp.',
      phone: 'Phone & WhatsApp', address: 'Address', legal: 'Legal company names', shared: 'Shared website contact details', partners: 'Partner companies',
    },
    footer: { line: 'A partnership in carpet design and manufacturing from Gaziantep.', rights: 'TAYYAM CARPET & BIN MANSOOR CARPET' },
  },
  tr: {
    a11y: { skip: 'İçeriğe geç', primaryNav: 'Ana navigasyon', language: 'Dil', openMenu: 'Menüyü aç', mobileNav: 'Mobil navigasyon', closeMenu: 'Menüyü kapat' },
    nav: { home: 'Ana sayfa', products: 'Ürünler', about: 'Ortaklık', contact: 'İletişim' },
    common: {
      explore: 'Koleksiyonu keşfet', enquire: 'Teklif iste', view: 'Modeli incele', all: 'Tümü',
      code: 'Model kodu', category: 'Kategori', variants: 'Renk ön izlemeleri', back: 'Ürünlere dön',
      whatsapp: 'WhatsApp’tan yazın', directions: 'Haritada aç', call: 'Fabrikayı ara',
      review: 'İncelenmeli', approved: 'Onaylı', learnMore: 'Daha fazla', exploreDesign: 'Tasarımı keşfet',
    },
    hero: {
      eyebrow: 'TAYYAM CARPET × BIN MANSOOR CARPET', title: 'İş ve Projeler İçin\nHalı Tasarımları.',
      body: "Gaziantep'te TAYYAM CARPET ve BIN MANSOOR CARPET ortaklığı.",
      note: 'Halı tasarımları | Gaziantep, Türkiye',
    },
    home: {
      partnerEyebrow: 'İki ortak şirket', partnerTitle: 'Tek bir temsil. Birbirini tamamlayan iki bakış.', partnerBody: 'TAYYAM CARPET ve BIN MANSOOR CARPET, tasarım koleksiyonlarını sunmak ve kurumsal proje taleplerine hizmet vermek için bir araya geliyor.',
      collectionsEyebrow: 'Üç koleksiyon dünyası', collectionsTitle: 'Sakin çağdaş formlardan miras detaylarına.',
      editorialEyebrow: 'Öne çıkan tasarım', editorialTitle: 'Detaydan güçlü bir görsel sahneye.',
      featuredEyebrow: 'Seçili tasarımlar', featuredTitle: 'Kendine özgü duruşa sahip sekiz tasarım.',
      factoryEyebrow: 'Ortaklık ve üretim', factoryTitle: 'Tasarım seçiminden sipariş koordinasyonuna açık bir yol.',
      factoryBody: 'Gaziantep’te iki şirket, açık bir katalog ve kurumsal proje talepleri için doğrudan hizmet sunmak üzere birlikte çalışıyor.',
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
      specs: 'Sipariş bilgisi', spec1: 'Kurumsal ve toptan talepler', spec2: 'Toplam minimum: 8.000 m²', spec3: 'Teknik detaylar teklifle paylaşılır',
    },
    about: {
      eyebrow: 'Ortaklık hakkında', title: "Gaziantep'ten bir halı ortaklığı.",
      intro: 'Bu web sitesi, halı tasarımlarını sunmak ve kurumsal proje taleplerine hizmet vermek için birlikte çalışan iki ortak şirketi temsil eder.',
      partnersEyebrow: 'Ortak şirketler', partnersTitle: 'İki şirket. Tek bir temsil.',
      storyTitle: 'Odağımız', storyBody: 'Kurumsal müşteriler için modern kompozisyonlardan klasik miras çizgilerine uzanan çeşitli bir katalog sunuyoruz.',
      workflowTitle: 'Birlikte çalışma', workflow: ['İhtiyacı paylaşın', 'Modelleri seçin', 'Teknik detayları doğrulayın', 'Sipariş ve üretimi koordine edin'],
      addressTitle: 'Ortak iletişim bilgileri', factsTitle: 'BIN MANSOOR CARPET için doğrulanmış bilgiler',
    },
    contact: {
      eyebrow: 'İletişim', title: 'Talebinizle başlayalım.', body: 'Model kodlarını, yaklaşık miktarları ve hedef ülkeyi gönderin. Telefon veya WhatsApp üzerinden bize ulaşın.',
      phone: 'Telefon & WhatsApp', address: 'Adres', legal: 'Ticari unvanlar', shared: 'Ortak web sitesi iletişim bilgileri', partners: 'Ortak şirketler',
    },
    footer: { line: "Gaziantep'ten halı tasarımı ve üretiminde güçlü bir ortaklık.", rights: 'TAYYAM CARPET & BIN MANSOOR CARPET' },
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
