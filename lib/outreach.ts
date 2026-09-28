export const OUTREACH_SECTORS=['Hospitality / Hotels','Contractors','Fit-Out / Interior Contracting','Developers','Carpet Distributors / Importers','Mosque / Religious Project Suppliers','Government / Institutional Projects','Other'] as const;
export const OUTREACH_COUNTRIES=['Saudi Arabia','UAE','Qatar','Kuwait','Bahrain','Oman','Other'] as const;
export const SAUDI_CITIES=['Riyadh','Jeddah','Makkah','Madinah','Dammam','Khobar','AlUla','Tabuk','Abha','Taif','Other'] as const;
export const OUTREACH_STATUSES=['NEW','READY TO CONTACT','CONTACTED','FOLLOW-UP DUE','REPLIED','QUOTE REQUESTED','SAMPLE REQUESTED','NEGOTIATION','WON','LOST','DO NOT CONTACT'] as const;
export const OUTREACH_SOURCES=['Company Website','Public Business Directory','Referral','Trade Fair','Existing Contact','Supplier Directory','Manual Research','Other'] as const;
export const OUTREACH_LANGUAGES=['en','ar'] as const;
export const OUTREACH_EMAIL_TYPES=['FIRST CONTACT','FOLLOW-UP #1','FOLLOW-UP #2','CATALOG REQUEST RESPONSE','QUOTE INTEREST RESPONSE','DISTRIBUTOR INTRODUCTION'] as const;

export type OutreachSector=typeof OUTREACH_SECTORS[number];
export type OutreachStatus=typeof OUTREACH_STATUSES[number];
export type OutreachSource=typeof OUTREACH_SOURCES[number];
export type OutreachLanguage=typeof OUTREACH_LANGUAGES[number];
export type OutreachEmailType=typeof OUTREACH_EMAIL_TYPES[number];

export type OutreachDesign={key:string;line:'Rug'|'Wall-to-Wall';code:string;name:{en:string;ar:string};path:string};
export type ContactHistoryEntry={id:string;type:OutreachEmailType;subject:string;at:string};
export type Lead={
 id:string;companyName:string;contactName:string;jobTitle:string;email:string;phone:string;city:string;country:string;sector:OutreachSector;website:string;source:OutreachSource;language:OutreachLanguage;status:OutreachStatus;lastContactedAt:string;nextFollowUpAt:string;notes:string;history:ContactHistoryEntry[];createdAt:string;updatedAt:string;
};
export type EmailDraft={to:string;subject:string;body:string;type:OutreachEmailType};
export type CsvImportResult={leads:Lead[];errors:{row:number;message:string}[]};

const CSV_COLUMNS=['companyName','contactName','jobTitle','email','phone','city','country','sector','website','source','language','notes'] as const;
const CSV_EXPORT_COLUMNS=['companyName','contactName','jobTitle','email','country','city','sector','website','source','language','status','lastContactedAt','nextFollowUpAt','notes'] as const;
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function csvRows(text:string){
 const rows:string[][]=[];let row:string[]=[];let field='';let quoted=false;
 for(let index=0;index<text.length;index++){
  const char=text[index];
  if(quoted){if(char==='"'&&text[index+1]==='"'){field+='"';index++;}else if(char==='"')quoted=false;else field+=char;continue;}
  if(char==='"'){quoted=true;continue;}
  if(char===','){row.push(field);field='';continue;}
  if(char==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field='';continue;}
  field+=char;
 }
 row.push(field.replace(/\r$/,''));if(row.some(value=>value.trim()))rows.push(row);
 return rows;
}

function validChoice<T extends readonly string[]>(value:string,choices:T,fallback:T[number]){return (choices as readonly string[]).includes(value)?value as T[number]:fallback;}
function nowIso(){return new Date().toISOString();}

export function createLead(input:Partial<Lead>&Pick<Lead,'companyName'|'email'>):Lead{
 const now=nowIso();
 return {id:input.id??crypto.randomUUID(),companyName:input.companyName.trim(),contactName:input.contactName?.trim()??'',jobTitle:input.jobTitle?.trim()??'',email:input.email.trim().toLowerCase(),phone:input.phone?.trim()??'',city:input.city?.trim()??'',country:input.country?.trim()||'Saudi Arabia',sector:validChoice(input.sector??'',OUTREACH_SECTORS,'Other'),website:input.website?.trim()??'',source:validChoice(input.source??'',OUTREACH_SOURCES,'Manual Research'),language:validChoice(input.language??'',OUTREACH_LANGUAGES,'en'),status:validChoice(input.status??'',OUTREACH_STATUSES,'NEW'),lastContactedAt:input.lastContactedAt??'',nextFollowUpAt:input.nextFollowUpAt??'',notes:input.notes?.trim()??'',history:Array.isArray(input.history)?input.history:[],createdAt:input.createdAt??now,updatedAt:now};
}

export function parseLeadCsv(text:string):CsvImportResult{
 const rows=csvRows(text.replace(/^\uFEFF/,''));
 if(!rows.length)return {leads:[],errors:[{row:1,message:'The CSV file is empty.'}]};
 const headers=rows[0].map(value=>value.trim());
 const missing=['companyName','email'].filter(column=>!headers.includes(column));
 if(missing.length)return {leads:[],errors:[{row:1,message:`Missing required columns: ${missing.join(', ')}`}]} ;
 const leads:Lead[]=[];const errors:CsvImportResult['errors']=[];const seen=new Set<string>();
 rows.slice(1).forEach((values,index)=>{
  const rowNumber=index+2;const raw=Object.fromEntries(headers.map((header,column)=>[header,values[column]?.trim()??'']));
  if(!raw.companyName||!raw.email){errors.push({row:rowNumber,message:'companyName and email are required.'});return;}
  if(!EMAIL.test(raw.email)){errors.push({row:rowNumber,message:`Invalid email: ${raw.email}`});return;}
  const email=raw.email.toLowerCase();if(seen.has(email)){errors.push({row:rowNumber,message:`Duplicate email in import: ${raw.email}`});return;}seen.add(email);
  leads.push(createLead({companyName:raw.companyName,email,...Object.fromEntries(CSV_COLUMNS.filter(column=>!['companyName','email'].includes(column)).map(column=>[column,raw[column]??'']))}));
 });
 return {leads,errors};
}

function csvCell(value:unknown){const text=value==null?'':typeof value==='string'?value:typeof value==='number'||typeof value==='boolean'?String(value):JSON.stringify(value);return /[",\n\r]/.test(text)?`"${text.replace(/"/g,'""')}"`:text;}
export function exportLeadCsv(leads:Lead[]){return [CSV_EXPORT_COLUMNS.join(','),...leads.map(lead=>CSV_EXPORT_COLUMNS.map(column=>csvCell(lead[column])).join(','))].join('\r\n');}

export function interpolateTemplate(template:string,lead:Lead){
 const values:Record<string,string>={contactName:lead.contactName,companyName:lead.companyName,jobTitle:lead.jobTitle,city:lead.city,sector:lead.sector};
 return template.replace(/{{(contactName|companyName|jobTitle|city|sector)}}/g,(_,key:string)=>values[key]??'');
}

export function defaultIncludeMoq(sector:OutreachSector){return ['Contractors','Fit-Out / Interior Contracting','Carpet Distributors / Importers'].includes(sector);}
export function effectiveLeadStatus(lead:Lead,now=new Date()):OutreachStatus{
 if(lead.status==='CONTACTED'&&lead.nextFollowUpAt&&new Date(lead.nextFollowUpAt)<=now)return 'FOLLOW-UP DUE';
 return lead.status;
}

const sectorCopy={
 en:{
  'Hospitality / Hotels':'We support hospitality and large interior projects with wall-to-wall carpet and rug design options suited to project quantities.',
  Contractors:'We support contractors with project carpet supply, design selection, quotation support and wall-to-wall solutions for large-volume requirements.',
  'Fit-Out / Interior Contracting':'We support fit-out teams with design selection, quotation support and wall-to-wall carpet solutions for large commercial interiors.',
  Developers:'We support developers with coordinated carpet design options for large residential, hospitality and mixed-use project requirements.',
  'Carpet Distributors / Importers':'We are interested in direct factory relationships for catalogue-based, large-order and ongoing commercial carpet supply.',
  'Mosque / Religious Project Suppliers':'We support large-area carpet projects with respectful design selection, project coordination and quotation support.',
  'Government / Institutional Projects':'We support institutional project requirements with design selection, large-area carpet options and structured quotation support.',
  Other:'We supply rug designs and wall-to-wall carpet for large commercial and project requirements.',
 },
 ar:{
  'Hospitality / Hotels':'نوفّر خيارات موكيت وتصاميم سجاد لمشاريع الضيافة والمساحات الداخلية الواسعة وبكميات المشاريع.',
  Contractors:'ندعم المقاولين في توريد سجاد المشاريع واختيار التصاميم وإعداد عروض الأسعار وحلول الموكيت للكميات الكبيرة.',
  'Fit-Out / Interior Contracting':'ندعم فرق التجهيز الداخلي في اختيار التصاميم وعروض الأسعار وحلول الموكيت للمساحات التجارية الواسعة.',
  Developers:'نوفّر للمطورين خيارات تصاميم سجاد منسّقة لمتطلبات المشاريع السكنية والضيافة والمشاريع متعددة الاستخدام.',
  'Carpet Distributors / Importers':'نبحث عن علاقات توريد مباشرة من المصنع تشمل تنوع الكتالوج والطلبات الكبيرة والتوريد التجاري المستمر.',
  'Mosque / Religious Project Suppliers':'ندعم مشاريع المساحات الواسعة باختيار التصاميم المناسبة وتنسيق المتطلبات وإعداد عرض السعر.',
  'Government / Institutional Projects':'ندعم متطلبات المشاريع المؤسسية بخيارات للمساحات الواسعة واختيار التصاميم وإعداد عروض واضحة.',
  Other:'نوفّر تصاميم سجاد وموكيت للكميات الكبيرة ومتطلبات المشاريع التجارية.',
 },
};

function greeting(lead:Lead,language:OutreachLanguage){return lead.contactName?(language==='ar'?`مرحبًا ${lead.contactName}،`:`Hello ${lead.contactName},`):(language==='ar'?'مرحبًا،':'Hello,');}
function designLinks(designs:OutreachDesign[],language:OutreachLanguage){
 if(!designs.length)return '';
 const heading=language==='ar'?'تصاميم مختارة:':'Selected designs:';
 return `${heading}\n${designs.map(design=>`${design.name[language]} — ${design.code}\nhttps://binmansoor.com/${language}${design.path}`).join('\n')}`;
}
function signature(language:OutreachLanguage){return language==='ar'?'مع التحية،\nفريق مبيعات BIN MANSOOR CARPET\nGaziantep, Türkiye\nsales@binmansoor.com\n+90 530 351 30 37':'Best regards,\nBIN MANSOOR CARPET Sales\nGaziantep, Türkiye\nsales@binmansoor.com\n+90 530 351 30 37';}

export function generateOutreachEmail({lead,type,personalOpeningLine='',includeMoq=defaultIncludeMoq(lead.sector),includeOptOut=type==='FIRST CONTACT',designs=[]}:{lead:Lead;type:OutreachEmailType;personalOpeningLine?:string;includeMoq?:boolean;includeOptOut?:boolean;designs?:OutreachDesign[]}):EmailDraft{
 if(lead.status==='DO NOT CONTACT')throw new Error('This lead is marked DO NOT CONTACT. Re-enable it before preparing outreach.');
 const language=lead.language;const arabic=language==='ar';const company=lead.companyName;const opening=interpolateTemplate(personalOpeningLine.trim(),lead);const links=designLinks(designs.slice(0,3),language);
 const moq=includeMoq?(arabic?'الحد الأدنى للطلب هو 8,000 م² لكل تصميم.':'Minimum order is 8,000 m² per design.'):'';
 const optOut=includeOptOut?(arabic?'إذا لم يكن هذا مناسبًا لفريقكم، يرجى إبلاغي ولن أتابع التواصل.':'If this is not relevant to your team, please let me know and I will not follow up.'):'';
 const subjects:Record<OutreachEmailType,string>={
  'FIRST CONTACT':arabic?`توريد سجاد المشاريع — ${company}`:`Project carpet supply — ${company}`,
  'FOLLOW-UP #1':arabic?`متابعة: حلول سجاد المشاريع — ${company}`:`Follow-up: project carpet solutions — ${company}`,
  'FOLLOW-UP #2':arabic?`متابعة أخيرة — ${company}`:`Final follow-up — ${company}`,
  'CATALOG REQUEST RESPONSE':arabic?`روابط كتالوج BIN MANSOOR CARPET`:`BIN MANSOOR CARPET catalogue links`,
  'QUOTE INTEREST RESPONSE':arabic?`متطلبات عرض السعر — ${company}`:`Quotation requirements — ${company}`,
  'DISTRIBUTOR INTRODUCTION':arabic?`تعاون توريد سجاد تجاري — ${company}`:`Commercial carpet supply — ${company}`,
 };
 const bodyParts:string[]=[greeting(lead,language)];if(opening)bodyParts.push(opening);
 if(type==='FIRST CONTACT')bodyParts.push(sectorCopy[language][lead.sector],arabic?'BIN MANSOOR CARPET شركة مصنّعة في غازي عنتاب، تركيا، وتقدّم تصاميم سجاد وموكيت للمشاريع. يسعدنا معرفة متطلبات مشاريعكم الحالية أو القادمة ومشاركة الخيارات المناسبة.':'BIN MANSOOR CARPET is based in Gaziantep, Türkiye, offering rug designs and wall-to-wall carpet for project requirements. I would be glad to learn about your current or upcoming needs and share relevant options.');
 if(type==='FOLLOW-UP #1')bodyParts.push(arabic?'أتابع رسالتي السابقة بخصوص احتياجات السجاد والموكيت للمشاريع. إذا كان لديكم مشروع قائم أو قادم، يسعدني إرسال خيارات مناسبة ومناقشة الكميات المطلوبة.':'I am following up on my earlier note about rug and wall-to-wall carpet requirements. If you have a current or upcoming project, I would be glad to share relevant options and discuss the required quantities.');
 if(type==='FOLLOW-UP #2')bodyParts.push(arabic?'متابعة أخيرة لمعرفة ما إذا كانت حلول سجاد المشاريع لدينا ذات صلة باحتياجاتكم الحالية. يمكنني إرسال روابط تصاميم مناسبة عند الحاجة.':'A final follow-up to see whether our project carpet options are relevant to your current needs. I can share a short selection of suitable design links if useful.');
 if(type==='CATALOG REQUEST RESPONSE')bodyParts.push(arabic?'شكرًا لاهتمامكم. تجدون أدناه روابط التصاميم المختارة من مجموعات السجاد والموكيت لدينا. أخبرونا بالتصاميم والكميات التقريبية لنساعدكم في الخطوة التالية.':'Thank you for your interest. Below are links to the selected designs from our rug and wall-to-wall ranges. Please share the preferred designs and approximate quantities so we can support the next step.');
 if(type==='QUOTE INTEREST RESPONSE')bodyParts.push(arabic?'يسعدنا إعداد عرض سعر. يرجى تزويدنا بكود كل تصميم، والكمية التقريبية، والوجهة، وأي متطلبات للمشروع حتى نراجع الطلب بدقة.':'We would be pleased to prepare a quotation. Please share each design code, approximate quantity, destination and any project requirements so we can review the request accurately.');
 if(type==='DISTRIBUTOR INTRODUCTION')bodyParts.push(arabic?'نتواصل لبحث علاقة توريد مباشرة من المصنع تشمل تصاميم السجاد والموكيت للطلبات التجارية الكبيرة والتوريد المستمر. يمكننا مشاركة روابط مختارة ومناقشة احتياجات السوق لديكم.':'I am reaching out to explore a direct factory supply relationship covering rug designs and wall-to-wall carpet for large commercial orders and ongoing supply. We can share a focused design selection and discuss your market requirements.');
 if(moq)bodyParts.push(moq);if(links)bodyParts.push(links);if(optOut)bodyParts.push(optOut);bodyParts.push(signature(language));
 return {to:lead.email,subject:subjects[type],body:bodyParts.filter(Boolean).join('\n\n'),type};
}

export function gmailComposeUrl(draft:EmailDraft){const params=new URLSearchParams({view:'cm',fs:'1',to:draft.to,su:draft.subject,body:draft.body});return `https://mail.google.com/mail/?${params}`;}
export function copyableEmail(draft:EmailDraft){return `${draft.subject}\n\n${draft.body}`;}

export function markLeadSent(lead:Lead,draft:EmailDraft,at=new Date()):Lead{
 const next=new Date(at);next.setDate(next.getDate()+4);
 return {...lead,status:'CONTACTED',lastContactedAt:at.toISOString(),nextFollowUpAt:draft.type==='FOLLOW-UP #2'?'':next.toISOString().slice(0,10),history:[...lead.history,{id:crypto.randomUUID(),type:draft.type,subject:draft.subject,at:at.toISOString()}],updatedAt:at.toISOString()};
}

export function suggestedFollowUpType(lead:Lead):OutreachEmailType{
 return lead.history.some(entry=>entry.type==='FOLLOW-UP #1')?'FOLLOW-UP #2':'FOLLOW-UP #1';
}

export function validateBackup(value:unknown):Lead[]{
 if(!value||typeof value!=='object'||!Array.isArray((value as {leads?:unknown}).leads))throw new Error('Invalid backup file.');
 return (value as {leads:unknown[]}).leads.map((item,index)=>{
  if(!item||typeof item!=='object')throw new Error(`Invalid lead at position ${index+1}.`);
  const lead=item as Partial<Lead>;
  if(!lead.companyName||!lead.email||!EMAIL.test(lead.email))throw new Error(`Invalid lead at position ${index+1}.`);
  return createLead(lead as Partial<Lead>&Pick<Lead,'companyName'|'email'>);
 });
}
