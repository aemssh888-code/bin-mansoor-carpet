export type Locale = 'ar' | 'en' | 'tr';
export type Category = 'modern' | 'modern-classic' | 'classic';

export type LocalizedText = Record<Locale, string>;

export type ProductVariant = {
  id: string;
  name: LocalizedText;
  image: string;
  swatch: string;
};

export type Product = {
  slug: string;
  code: string;
  category: Category;
  name: LocalizedText;
  description: LocalizedText;
  variants: ProductVariant[];
  classificationStatus: 'approved' | 'needs-review';
  featured?: boolean;
};

const media = (slug: string, variant: string) =>
  `/media/products/${slug}/${variant}.webp`;

export const products: Product[] = [
  {
    slug: 'rhythm-12', code: '12', category: 'modern', featured: true,
    classificationStatus: 'approved',
    name: { ar: 'إيقاع', en: 'Rhythm', tr: 'Ritim' },
    description: {
      ar: 'تكوين هندسي هادئ بخطوط متوازنة وتباين معاصر.',
      en: 'A composed geometric study with balanced lines and contemporary contrast.',
      tr: 'Dengeli çizgiler ve çağdaş kontrastla sakin bir geometrik çalışma.',
    },
    variants: [
      { id: 'grey', name: { ar: 'رمادي', en: 'Grey', tr: 'Gri' }, image: media('rhythm-12', 'grey'), swatch: '#9b9b96' },
      { id: 'ivory', name: { ar: 'عاجي', en: 'Ivory', tr: 'Fildişi' }, image: media('rhythm-12', 'ivory'), swatch: '#e6e0d2' },
      { id: 'graphite', name: { ar: 'جرافيت', en: 'Graphite', tr: 'Grafit' }, image: media('rhythm-12', 'graphite'), swatch: '#4b4b48' },
    ],
  },
  {
    slug: 'terra-13', code: '13', category: 'modern', featured: true,
    classificationStatus: 'approved',
    name: { ar: 'تيرا', en: 'Terra', tr: 'Terra' },
    description: {
      ar: 'طبقات عضوية بدرجات طبيعية تمنح المساحة عمقًا بصريًا رقيقًا.',
      en: 'Organic layers in natural tones bring a quiet visual depth to interiors.',
      tr: 'Doğal tonlardaki organik katmanlar mekâna sakin bir derinlik katar.',
    },
    variants: [
      { id: 'sage', name: { ar: 'مريمي', en: 'Sage', tr: 'Adaçayı' }, image: media('terra-13', 'sage'), swatch: '#8d9786' },
      { id: 'natural', name: { ar: 'طبيعي', en: 'Natural', tr: 'Doğal' }, image: media('terra-13', 'natural'), swatch: '#c8bba3' },
      { id: 'stone', name: { ar: 'حجري', en: 'Stone', tr: 'Taş' }, image: media('terra-13', 'stone'), swatch: '#aaa69d' },
    ],
  },
  {
    slug: 'flow-14', code: '14', category: 'modern', featured: true,
    classificationStatus: 'approved',
    name: { ar: 'فلو', en: 'Flow', tr: 'Akış' },
    description: {
      ar: 'مسارات منحنية جريئة تستلهم حركة الماء وتدرجات العمق.',
      en: 'Bold curved paths inspired by moving water and layered depth.',
      tr: 'Suyun hareketinden ve katmanlı derinlikten ilham alan cesur kıvrımlar.',
    },
    variants: [
      { id: 'petrol', name: { ar: 'بترولي', en: 'Petrol', tr: 'Petrol' }, image: media('flow-14', 'petrol'), swatch: '#087c7a' },
      { id: 'ivory', name: { ar: 'عاجي', en: 'Ivory', tr: 'Fildişi' }, image: media('flow-14', 'ivory'), swatch: '#e8e4dc' },
      { id: 'charcoal', name: { ar: 'فحمي', en: 'Charcoal', tr: 'Antrasit' }, image: media('flow-14', 'charcoal'), swatch: '#363a3a' },
    ],
  },
  {
    slug: 'coast-1007a', code: '1007A', category: 'modern',
    classificationStatus: 'approved',
    name: { ar: 'كوست', en: 'Coast', tr: 'Kıyı' },
    description: {
      ar: 'لغة تجريدية مستوحاة من تقاطع الرمل والماء.',
      en: 'An abstract language inspired by the meeting of sand and water.',
      tr: 'Kum ve suyun buluşmasından ilham alan soyut bir dil.',
    },
    variants: [
      { id: 'sand', name: { ar: 'رملي', en: 'Sand', tr: 'Kum' }, image: media('coast-1007a', 'sand'), swatch: '#c08e5e' },
      { id: 'ocean', name: { ar: 'محيطي', en: 'Ocean', tr: 'Okyanus' }, image: media('coast-1007a', 'ocean'), swatch: '#587b88' },
    ],
  },
  {
    slug: 'contour-1007d', code: '1007D', category: 'modern', featured: true,
    classificationStatus: 'approved',
    name: { ar: 'كونتور', en: 'Contour', tr: 'Kontur' },
    description: {
      ar: 'أشكال محيطية ناعمة وتفاصيل دقيقة لفراغات معاصرة.',
      en: 'Soft contour forms and fine detail for contemporary spaces.',
      tr: 'Çağdaş mekânlar için yumuşak kontur formları ve ince detaylar.',
    },
    variants: [
      { id: 'light-beige', name: { ar: 'بيج فاتح', en: 'Light beige', tr: 'Açık bej' }, image: media('contour-1007d', 'light-beige'), swatch: '#cbbba6' },
      { id: 'grey', name: { ar: 'رمادي', en: 'Grey', tr: 'Gri' }, image: media('contour-1007d', 'grey'), swatch: '#a5a7a4' },
      { id: 'vizon', name: { ar: 'فيزون', en: 'Vizon', tr: 'Vizon' }, image: media('contour-1007d', 'vizon'), swatch: '#9b856f' },
      { id: 'blue', name: { ar: 'أزرق', en: 'Blue', tr: 'Mavi' }, image: media('contour-1007d', 'blue'), swatch: '#517387' },
    ],
  },
  {
    slug: 'frame-0105a', code: '0105A', category: 'modern-classic',
    classificationStatus: 'approved',
    name: { ar: 'فريم', en: 'Frame', tr: 'Çerçeve' },
    description: {
      ar: 'حدود معمارية متدرجة بزوايا مقوسة وتكوين مركزي هادئ.',
      en: 'Layered architectural borders with curved corners and a quiet centre.',
      tr: 'Kavisli köşeler ve sakin bir merkezle katmanlı mimari bordürler.',
    },
    variants: [
      { id: 'black', name: { ar: 'أسود', en: 'Black', tr: 'Siyah' }, image: media('frame-0105a', 'black'), swatch: '#161616' },
      { id: 'cream', name: { ar: 'كريمي', en: 'Cream', tr: 'Krem' }, image: media('frame-0105a', 'cream'), swatch: '#e8dfce' },
      { id: 'grey', name: { ar: 'رمادي', en: 'Grey', tr: 'Gri' }, image: media('frame-0105a', 'grey'), swatch: '#a8aaa7' },
      { id: 'light-beige', name: { ar: 'بيج فاتح', en: 'Light beige', tr: 'Açık bej' }, image: media('frame-0105a', 'light-beige'), swatch: '#c9bba4' },
      { id: 'vizon', name: { ar: 'فيزون', en: 'Vizon', tr: 'Vizon' }, image: media('frame-0105a', 'vizon'), swatch: '#9c8b75' },
    ],
  },
  ...[
    ['palace-415', '415', 'بالاس', 'Palace', 'Saray', 'cream', 'كريمي', 'Cream', 'Krem', '#d8c5a4'],
    ['heritage-0534a', '0534A', 'هيريتج', 'Heritage', 'Miras', 'classic', 'كلاسيكي', 'Classic', 'Klasik', '#907b5e'],
    ['medallion-648', '648', 'ميداليون', 'Medallion', 'Madalyon', 'beige', 'بيج', 'Beige', 'Bej', '#b99d77'],
    ['burgundy-palace-672', '672', 'قصر بورغندي', 'Burgundy Palace', 'Bordo Saray', 'red', 'أحمر', 'Red', 'Kırmızı', '#6f1f28'],
    ['ivory-700', '700', 'آيفوري', 'Ivory', 'Fildişi', 'ivory', 'عاجي', 'Ivory', 'Fildişi', '#ded5c2'],
    ['vine-844', '844', 'فاين', 'Vine', 'Asma', 'cherry', 'كرزي', 'Cherry', 'Kiraz', '#762d32'],
    ['royal-1003', '1003', 'رويال', 'Royal', 'Kraliyet', 'beige', 'بيج', 'Beige', 'Bej', '#b6a289'],
  ].map((item) => {
    const [slug, code, ar, en, tr, variant, varAr, varEn, varTr, swatch] = item;
    return {
      slug, code, category: 'classic' as const, classificationStatus: 'approved' as const,
      name: { ar, en, tr },
      description: {
        ar: 'تفاصيل زخرفية متوازنة تستلهم مفردات السجاد الكلاسيكي.',
        en: 'Balanced ornamental detail informed by classic carpet traditions.',
        tr: 'Klasik halı geleneğinden beslenen dengeli süsleme detayları.',
      },
      variants: [{ id: variant, name: { ar: varAr, en: varEn, tr: varTr }, image: media(slug, variant), swatch }],
    } satisfies Product;
  }),
];

export const categories: Category[] = ['modern', 'modern-classic', 'classic'];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

