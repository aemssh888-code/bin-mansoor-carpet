import {OutreachDashboard} from '@/components/outreach-dashboard';
import {products} from '@/lib/products';
import {wtwModels} from '@/lib/wtw';
import type {OutreachDesign} from '@/lib/outreach';

export const dynamic='force-static';

const designs:OutreachDesign[]=[
 ...products.map(product=>({key:`rug:${product.binMansoorCode}`,line:'Rug' as const,code:product.binMansoorCode,name:{en:product.name.en,ar:product.name.ar},path:`/products/${product.slug}`})),
 ...wtwModels.map(model=>({key:`wtw:${model.code}`,line:'Wall-to-Wall' as const,code:model.code,name:{en:model.name.en,ar:model.name.ar},path:`/wall-to-wall/${model.slug}`})),
];

export default function OutreachPage(){return <OutreachDashboard designs={designs}/>;}
