import type {Metadata} from 'next';
import {LocaleDocument} from '@/components/locale-document';

export const metadata:Metadata={title:'مساعد المبيعات الخاص',robots:{index:false,follow:false,noarchive:true,nocache:true}};

export default function OutreachLayout({children}:{children:React.ReactNode}){return <div className="outreach-root" lang="ar" dir="rtl"><LocaleDocument locale="ar"/>{children}</div>;}
