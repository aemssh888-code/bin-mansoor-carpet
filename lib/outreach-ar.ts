/** Display-only Arabic labels. Stored lead values and filter keys remain unchanged. */
const labels:Record<string,string>={
 'Country':'الدولة','Region':'المنطقة','City':'المدينة','Sector':'القطاع',
 'Status':'الحالة','Language':'اللغة','Source':'المصدر','Contact Method':'طريقة التواصل',
 'READY_TO_CONTACT':'جاهز للتواصل','NEEDS_CONTACT_RESEARCH':'يحتاج بحثًا عن وسيلة تواصل',
 'CONTACT_FORM_AVAILABLE':'نموذج تواصل متاح','SUPPLIER_PORTAL_AVAILABLE':'بوابة موردين متاحة',
 'UNRESEARCHED':'لم يبدأ البحث','FOUND_GENERAL_CONTACT':'وُجد تواصل عام',
 'FOUND_TARGET_CONTACT':'وُجد تواصل مع الجهة المستهدفة','SUPPLIER_PORTAL_FOUND':'وُجدت بوابة موردين',
 'MANUAL_REVIEW':'بحاجة إلى مراجعة يدوية','VERIFIED':'تم التحقق',
 'EMAIL':'البريد الإلكتروني','CONTACT_FORM':'نموذج التواصل','SUPPLIER_PORTAL':'بوابة الموردين',
 'PHONE':'الهاتف','WHATSAPP':'واتساب','LINKEDIN':'لينكدإن','UNKNOWN':'غير محدد',
 'NOT_STARTED':'لم يبدأ','STARTED':'بدأ','REGISTERED':'مُسجل',
 'NEW':'جديد','READY TO CONTACT':'جاهز للتواصل','CONTACTED':'تم التواصل',
 'FOLLOW-UP DUE':'حان موعد المتابعة','REPLIED':'ورد رد','QUOTE REQUESTED':'طُلب عرض سعر',
 'SAMPLE REQUESTED':'طُلبت عينة','NEGOTIATION':'قيد التفاوض','WON':'تم الاتفاق',
 'LOST':'لم تتم الصفقة','DO NOT CONTACT':'ممنوع التواصل',
 'FIRST CONTACT':'تواصل أول','FOLLOW-UP #1':'متابعة أولى','FOLLOW-UP #2':'متابعة ثانية',
 'CATALOG REQUEST RESPONSE':'رد على طلب كتالوج','QUOTE INTEREST RESPONSE':'رد على اهتمام بعرض سعر',
 'DISTRIBUTOR INTRODUCTION':'تعريف للموزع',
 'Hospitality / Hotels':'الضيافة والفنادق','Contractors':'المقاولات',
 'Fit-Out / Interior Contracting':'التجهيزات والديكور الداخلي','Developers':'التطوير العقاري',
 'Carpet Distributors / Importers':'موزعو ومستورِدو السجاد',
 'Mosque / Religious Project Suppliers':'مورّدو مشاريع المساجد',
 'Government / Institutional Projects':'المشاريع الحكومية والمؤسسية','Other':'أخرى',
 'Company Website':'موقع الشركة','Public Business Directory':'دليل أعمال عام',
 'Referral':'ترشيح','Trade Fair':'معرض تجاري','Existing Contact':'جهة اتصال حالية',
 'Supplier Directory':'دليل موردين','Manual Research':'بحث يدوي',
 'Approved first 100 workbook':'ملف أول 100 شركة المعتمد',
 'Muqawil — Saudi Contractors Authority':'مقاول — الهيئة السعودية للمقاولين',
 'Saudi Arabia':'السعودية','UAE':'الإمارات','Qatar':'قطر','Kuwait':'الكويت',
 'Bahrain':'البحرين','Oman':'عُمان',
 'Riyadh':'الرياض','Jeddah':'جدة','Makkah':'مكة المكرمة','Madinah':'المدينة المنورة',
 'Dammam':'الدمام','Khobar':'الخبر','AlUla':'العُلا','Tabuk':'تبوك',
 'Abha':'أبها','Taif':'الطائف','Eastern Province':'المنطقة الشرقية',
 'Asir':'عسير','Bahah':'الباحة','Hail':'حائل','Jawf':'الجوف',
 'Jizan':'جازان','Najran':'نجران','Northern Borders':'الحدود الشمالية',
 'Qassim':'القصيم','Red Sea':'البحر الأحمر','Kingdom-Wide':'جميع أنحاء المملكة',
 'Multiple Cities':'مدن متعددة','Multiple Regions':'مناطق متعددة',
 'en':'الإنجليزية','ar':'العربية','Rug':'سجاد','Wall-to-Wall':'موكيت',
};

export function outreachArLabel(value:string){return labels[value]??value;}
export function outreachPriorityLabel(priority:number|null){return priority?`الأولوية ${priority} · ${'★'.repeat(priority)}`:'الأولوية غير محددة';}

/** Translate validation feedback at the UI boundary without changing import data or rules. */
export function outreachArMessage(message:string){
 const known:Record<string,string>={
  'The import file is empty.':'ملف الاستيراد فارغ.',
  'Missing required companyName / الشركة column.':'عمود اسم الشركة مطلوب في الملف.',
  'Company name is required.':'اسم الشركة مطلوب.',
  'This lead is marked DO NOT CONTACT. Re-enable it before preparing outreach.':'هذه الشركة مميزة بأنها ممنوعة من التواصل. غيّر الحالة قبل إعداد رسالة.',
  'Add a verified public business email and its public source before preparing outreach.':'أضف بريد أعمال عامًا موثقًا ورابط مصدره قبل إعداد رسالة.',
  'Invalid backup file.':'ملف النسخة الاحتياطية غير صالح.',
 };
 if(known[message])return known[message];
 if(message.startsWith('Invalid email: '))return `بريد إلكتروني غير صالح: ${message.slice(15)}`;
 if(message.startsWith('Possible duplicate of '))return `تكرار محتمل للشركة ${message.slice(22)}`;
 const invalid=message.match(/^Invalid lead at position (\d+)\.$/);
 if(invalid)return `سجل غير صالح في الموضع ${invalid[1]}.`;
 return message;
}
