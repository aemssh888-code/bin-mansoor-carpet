'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { categories, type Category, type Locale, type Product } from '@/lib/products';

export function CatalogTabs({
  products, locale, labels, viewLabel,
}: {
  products: Product[];
  locale: Locale;
  labels: Record<Category | 'all', string>;
  viewLabel: string;
}) {
  const grid = (items: Product[]) => (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => <ProductCard key={product.slug} product={product} locale={locale} viewLabel={viewLabel} />)}
    </div>
  );

  return (
    <Tabs defaultValue="all" className="gap-10">
      <div className="overflow-x-auto pb-2">
        <TabsList variant="line" className="h-auto gap-6 border-b border-black/10 p-0">
          <TabsTrigger value="all" className="h-11 px-0 text-sm">{labels.all}</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="h-11 px-0 text-sm">{labels[category]}</TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value="all">{grid(products)}</TabsContent>
      {categories.map((category) => (
        <TabsContent key={category} value={category}>{grid(products.filter((product) => product.category === category))}</TabsContent>
      ))}
    </Tabs>
  );
}

