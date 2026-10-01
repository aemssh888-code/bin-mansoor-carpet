export const OUTREACH_SECTORS=['Hospitality / Hotels','Contractors','Fit-Out / Interior Contracting','Developers','Carpet Distributors / Importers','Mosque / Religious Project Suppliers','Government / Institutional Projects','Other'] as const;
export const OUTREACH_COUNTRIES=['Saudi Arabia','UAE','Qatar','Kuwait','Bahrain','Oman','Other'] as const;
export const SAUDI_CITIES=['Riyadh','Jeddah','Makkah','Madinah','Dammam','Khobar','AlUla','Tabuk','Abha','Taif','Other'] as const;
export const OUTREACH_STATUSES=['NEW','READY TO CONTACT','CONTACTED','FOLLOW-UP DUE','REPLIED','QUOTE REQUESTED','SAMPLE REQUESTED','NEGOTIATION','WON','LOST','DO NOT CONTACT'] as const;
export const OUTREACH_SOURCES=['Company Website','Public Business Directory','Referral','Trade Fair','Existing Contact','Supplier Directory','Manual Research','Other'] as const;
export const OUTREACH_LANGUAGES=['en','ar'] as const;
export const OUTREACH_EMAIL_TYPES=['FIRST CONTACT','FOLLOW-UP #1','FOLLOW-UP #2','CATALOG REQUEST RESPONSE','QUOTE INTEREST RESPONSE','DISTRIBUTOR INTRODUCTION'] as const;
export const OUTREACH_READINESS=['READY_TO_CONTACT','NEEDS_CONTACT_RESEARCH','CONTACT_FORM_AVAILABLE','SUPPLIER_PORTAL_AVAILABLE'] as const;
export const CONTACT_VERIFICATION_STATUSES=['UNRESEARCHED','FOUND_GENERAL_CONTACT','FOUND_TARGET_CONTACT','SUPPLIER_PORTAL_FOUND','MANUAL_REVIEW','VERIFIED'] as const;
export const PREFERRED_CONTACT_METHODS=['EMAIL','CONTACT_FORM','SUPPLIER_PORTAL','PHONE','WHATSAPP','LINKEDIN','UNKNOWN'] as const;
export const SUPPLIER_REGISTRATION_STATUSES=['NOT_STARTED','STARTED','REGISTERED'] as const;
export const DUPLICATE_STATUSES=['UNIQUE','POSSIBLE_DUPLICATE'] as const;

export type OutreachSector=typeof OUTREACH_SECTORS[number];
export type OutreachStatus=typeof OUTREACH_STATUSES[number];
export type OutreachSource=typeof OUTREACH_SOURCES[number];
export type OutreachLanguage=typeof OUTREACH_LANGUAGES[number];
export type OutreachEmailType=typeof OUTREACH_EMAIL_TYPES[number];
export type OutreachReadiness=typeof OUTREACH_READINESS[number];
export type ContactVerificationStatus=typeof CONTACT_VERIFICATION_STATUSES[number];
export type PreferredContactMethod=typeof PREFERRED_CONTACT_METHODS[number];
export type SupplierRegistrationStatus=typeof SUPPLIER_REGISTRATION_STATUSES[number];
export type DuplicateStatus=typeof DUPLICATE_STATUSES[number];

export type OutreachDesign={key:string;line:'Rug'|'Wall-to-Wall';code:string;name:{en:string;ar:string};path:string};
export type ContactHistoryEntry={id:string;type:OutreachEmailType;subject:string;at:string};
export type Lead={
 id:string;sourceRowNumber:string;companyName:string;companyNameNormalized:string;contactName:string;contactJobTitle:string;email:string;businessEmail:string;generalEmail:string;procurementEmail:string;projectsEmail:string;phone:string;whatsapp:string;linkedinCompanyUrl:string;supplierPortalUrl:string;contactPageUrl:string;researchSourceUrl:string;researchNotes:string;researchVerifiedAt:string;contactVerificationStatus:ContactVerificationStatus;preferredContactMethod:PreferredContactMethod;supplierRegistrationStatus:SupplierRegistrationStatus;city:string;region:string;country:string;sector:OutreachSector;subSector:string;website:string;officialDomain:string;sourceUrl:string;source:OutreachSource;sourceName:string;sourceType:string;sourceRetrievedAt:string;registrationIdentifier:string;companySize:string;officialClassification:string;sourceEvidence:string;language:OutreachLanguage;status:OutreachStatus;readiness:OutreachReadiness;priority:1|2|3|4|5|null;leadScore:number;fitReason:string;targetRole:string;nextAction:string;lastContactedAt:string;nextFollowUpAt:string;notes:string;duplicateStatus:DuplicateStatus;duplicateReason:string;history:ContactHistoryEntry[];createdAt:string;updatedAt:string;jobTitle?:string;
};
export type EmailDraft={to:string;subject:string;body:string;type:OutreachEmailType};
export type LeadImportResult={leads:Lead[];errors:{row:number;message:string}[];duplicates:{row:number;message:string}[];totalRows:number};

const CSV_EXPORT_COLUMNS=['sourceRowNumber','id','companyName','companyNameNormalized','contactName','contactJobTitle','sector','subSector','city','region','country','website','officialDomain','priority','leadScore','fitReason','targetRole','email','businessEmail','generalEmail','procurementEmail','projectsEmail','phone','whatsapp','linkedinCompanyUrl','contactPageUrl','supplierPortalUrl','sourceUrl','sourceName','sourceType','sourceRetrievedAt','registrationIdentifier','companySize','officialClassification','preferredContactMethod','contactVerificationStatus','readiness','status','language','nextAction','notes','duplicateStatus','duplicateReason','sourceEvidence','researchSourceUrl','researchNotes','researchVerifiedAt','supplierRegistrationStatus','source','lastContactedAt','nextFollowUpAt'] as const;
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HEADER_ALIASES:Record<string,keyof Lead>={
 'رقم':'sourceRowNumber','source id':'sourceRowNumber','sourcerownumber':'sourceRowNumber','id':'id',
 'الشركة':'companyName','company':'companyName','companyname':'companyName','companynamenormalized':'companyNameNormalized',
 'القطاع':'sector','sector':'sector','subsector':'subSector','المدينة/المنطقة':'city','city':'city','region':'region','الدولة':'country','country':'country',
 'الأولوية (1-5)':'priority','priority':'priority','سبب الملاءمة':'fitReason','fitreason':'fitReason',
 'المنصب المستهدف':'targetRole','targetrole':'targetRole','البريد العام':'email','email':'email',
 'الموقع':'website','website':'website','officialdomain':'officialDomain','رابط المصدر/التواصل':'sourceUrl','sourceurl':'sourceUrl',
 'لغة التواصل':'language','language':'language','الحالة':'status','status':'status','جاهز للإيميل؟':'readiness','readiness':'readiness',
 'الإجراء التالي':'nextAction','nextaction':'nextAction','ملاحظات':'notes','notes':'notes',
 'contactname':'contactName','contactjobtitle':'contactJobTitle','jobtitle':'contactJobTitle','phone':'phone','source':'source',
 'businessemail':'businessEmail','generalemail':'generalEmail','procurementemail':'procurementEmail','projectsemail':'projectsEmail','whatsapp':'whatsapp','linkedincompanyurl':'linkedinCompanyUrl','supplierportalurl':'supplierPortalUrl','contactpageurl':'contactPageUrl','researchsourceurl':'researchSourceUrl','researchnotes':'researchNotes','contactverificationstatus':'contactVerificationStatus','preferredcontactmethod':'preferredContactMethod','supplierregistrationstatus':'supplierRegistrationStatus','researchverifiedat':'researchVerifiedAt',
 'sourcename':'sourceName','sourcetype':'sourceType','sourceretrievedat':'sourceRetrievedAt','registrationidentifier':'registrationIdentifier','companysize':'companySize','officialclassification':'officialClassification','sourceevidence':'sourceEvidence','leadscore':'leadScore','duplicatestatus':'duplicateStatus','duplicatereason':'duplicateReason',
 };

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
function cellText(value:unknown){if(value instanceof Date)return value.toISOString();if(value==null)return '';if(typeof value==='string')return value.trim();if(typeof value==='number'||typeof value==='boolean'||typeof value==='bigint')return String(value).trim();return '';}
export function normalizedCompanyName(value:string){return value.trim().toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\b(company|co|ltd|limited|establishment|est|corporation|corp|group|saudi|arabia|trading|contracting|for|and|the|شركه|شركة|مؤسسة)\b/gu,' ').replace(/\s+/g,' ').trim();}
function normalizedKey(value:string){return value.trim().toLocaleLowerCase().replace(/\s+/g,' ');}
export function normalizedDomain(value:string){if(!value.trim())return '';try{return new URL(/^https?:\/\//i.test(value)?value:`https://${value}`).hostname.replace(/^www\./,'').toLowerCase();}catch{return normalizedKey(value).replace(/^https?:\/\//,'').replace(/^www\./,'').split('/')[0];}}
function normalizedWebsite(value:string){if(!value.trim())return '';try{const url=new URL(/^https?:\/\//i.test(value)?value:`https://${value}`);return `${url.hostname.replace(/^www\./,'')}${url.pathname.replace(/\/$/,'')}`.toLowerCase();}catch{return normalizedKey(value).replace(/^https?:\/\//,'').replace(/^www\./,'').replace(/\/$/,'');}}
function normalizedSector(value:string):OutreachSector{const text=value.toLowerCase();if(!text)return 'Other';if(/mosque|prayer|awqaf|religious/.test(text))return 'Mosque / Religious Project Suppliers';if(/government|institution/.test(text))return 'Government / Institutional Projects';if(/distributor|import|wholesale|flooring|carpet manufacturer|supplier/.test(text))return 'Carpet Distributors / Importers';if(/fit[- ]?out|interior design/.test(text))return 'Fit-Out / Interior Contracting';if(/contractor|\bepc\b/.test(text))return 'Contractors';if(/developer|development/.test(text))return 'Developers';if(/hotel|hospitality|tourism/.test(text))return 'Hospitality / Hotels';return validChoice(value,OUTREACH_SECTORS,'Other');}
function normalizedLanguage(value:string):OutreachLanguage{const text=value.toLowerCase();return text==='ar'||text.includes('arabic')||text.includes('العربية')?'ar':'en';}
function normalizedStatus(value:string):OutreachStatus{const text=value.trim().replaceAll('_',' ').toUpperCase();return validChoice(text,OUTREACH_STATUSES,'NEW');}
function normalizedPriority(value:unknown):Lead['priority']{const parsed=Number(cellText(value));return Number.isInteger(parsed)&&parsed>=1&&parsed<=5?parsed as Lead['priority']:null;}
function normalizedScore(value:unknown){const parsed=Number(cellText(value));return Number.isFinite(parsed)?Math.min(100,Math.max(0,Math.round(parsed))):0;}
export function priorityFromLeadScore(score:number):Exclude<Lead['priority'],null>{return score>=80?5:score>=65?4:score>=50?3:score>=35?2:1;}
export function isValidLeadEmail(value:string){return EMAIL.test(value.trim());}

function cleanEmail(value:unknown){return cellText(value).toLowerCase();}
function firstValidEmail(values:string[]){return values.find(isValidLeadEmail)??'';}
export function selectBestRecipient(lead:Pick<Lead,'procurementEmail'|'projectsEmail'|'businessEmail'|'generalEmail'|'email'>){return firstValidEmail([lead.procurementEmail,lead.projectsEmail,lead.businessEmail,lead.generalEmail,lead.email]);}
export function deriveResearchReadiness(lead:Pick<Lead,'status'|'contactVerificationStatus'|'researchSourceUrl'|'supplierPortalUrl'|'contactPageUrl'|'procurementEmail'|'projectsEmail'|'businessEmail'|'generalEmail'|'email'>):OutreachReadiness{
 if(lead.status!=='DO NOT CONTACT'&&selectBestRecipient(lead)&&lead.researchSourceUrl&&(lead.contactVerificationStatus==='VERIFIED'||lead.contactVerificationStatus==='FOUND_TARGET_CONTACT'))return 'READY_TO_CONTACT';
 if(lead.supplierPortalUrl)return 'SUPPLIER_PORTAL_AVAILABLE';
 if(lead.contactPageUrl)return 'CONTACT_FORM_AVAILABLE';
 return 'NEEDS_CONTACT_RESEARCH';
}
export function canSendToLead(lead:Lead){return lead.status!=='DO NOT CONTACT'&&lead.readiness==='READY_TO_CONTACT'&&isValidLeadEmail(selectBestRecipient(lead));}
export function findDuplicateEmail(leads:Lead[],candidate:Lead,excludeId=''){
 const emails=[candidate.procurementEmail,candidate.projectsEmail,candidate.businessEmail,candidate.generalEmail,candidate.email].filter(isValidLeadEmail);
 if(!emails.length)return undefined;
 return leads.find(lead=>lead.id!==excludeId&&[lead.procurementEmail,lead.projectsEmail,lead.businessEmail,lead.generalEmail,lead.email].some(email=>emails.includes(email)));
}
export function emailDomainReview(lead:Lead):'MATCH'|'REVIEW_DOMAIN'|'UNKNOWN'{
 const email=selectBestRecipient(lead);if(!email||!lead.website)return 'UNKNOWN';
 try{const emailDomain=email.split('@')[1].replace(/^www\./,'');const websiteDomain=new URL(/^https?:\/\//i.test(lead.website)?lead.website:`https://${lead.website}`).hostname.replace(/^www\./,'');return emailDomain===websiteDomain||emailDomain.endsWith(`.${websiteDomain}`)||websiteDomain.endsWith(`.${emailDomain}`)?'MATCH':'REVIEW_DOMAIN';}catch{return 'UNKNOWN';}
}
export function researchQueue(leads:Lead[],sort:'priority'|'sector'|'city'|'company'='priority'){
 const queue=leads.filter(lead=>['NEEDS_CONTACT_RESEARCH','CONTACT_FORM_AVAILABLE','SUPPLIER_PORTAL_AVAILABLE'].includes(lead.readiness)&&lead.status!=='DO NOT CONTACT');
 return [...queue].sort((a,b)=>sort==='priority'?(b.priority??0)-(a.priority??0)||a.companyName.localeCompare(b.companyName):String(a[sort==='company'?'companyName':sort]).localeCompare(String(b[sort==='company'?'companyName':sort]))||((b.priority??0)-(a.priority??0)));
}

export type LeadFilters={search?:string;country?:string;city?:string;region?:string;sector?:string;status?:string;language?:string;sourceName?:string;preferredContactMethod?:string;priority?:string;readiness?:string};
export function filterLeadList(leads:Lead[],filters:LeadFilters){
 const needle=(filters.search??'').trim().toLowerCase();
 return leads.filter(lead=>
  (!needle||[lead.companyName,lead.companyNameNormalized,lead.contactName,selectBestRecipient(lead),lead.website,lead.officialDomain,lead.registrationIdentifier,lead.targetRole].some(value=>value.toLowerCase().includes(needle)))&&
  (!filters.country||lead.country===filters.country)&&(!filters.city||lead.city===filters.city)&&(!filters.region||lead.region===filters.region)&&(!filters.sector||lead.sector===filters.sector)&&
  (!filters.status||effectiveLeadStatus(lead)===filters.status)&&(!filters.language||lead.language===filters.language)&&(!filters.sourceName||lead.sourceName===filters.sourceName)&&
  (!filters.preferredContactMethod||lead.preferredContactMethod===filters.preferredContactMethod)&&(!filters.readiness||lead.readiness===filters.readiness)&&
  (!filters.priority||(filters.priority==='5'?lead.priority===5:(lead.priority??0)>=4))
 );
}
export function paginateLeads(leads:Lead[],page:number,pageSize=100){const safeSize=Math.max(1,Math.min(250,Math.floor(pageSize)||100));const pages=Math.max(1,Math.ceil(leads.length/safeSize));const current=Math.min(pages,Math.max(1,Math.floor(page)||1));return {items:leads.slice((current-1)*safeSize,current*safeSize),page:current,pageSize:safeSize,pages,total:leads.length};}

export function createLead(input:Partial<Lead>&Pick<Lead,'companyName'>):Lead{
 const now=nowIso();
 const legacyEmail=cleanEmail(input.email);const businessEmail=cleanEmail(input.businessEmail)||legacyEmail;const generalEmail=cleanEmail(input.generalEmail);const procurementEmail=cleanEmail(input.procurementEmail);const projectsEmail=cleanEmail(input.projectsEmail);const status=normalizedStatus(input.status??'');const sourceUrl=input.sourceUrl?.trim()??'';const researchSourceUrl=input.researchSourceUrl?.trim()||sourceUrl;const legacyReadiness=String(input.readiness??'').trim().toUpperCase();const hasLegacyVerifiedEvidence=(legacyReadiness==='READY_TO_CONTACT'||legacyReadiness==='READY TO CONTACT'||legacyReadiness==='YES'||legacyReadiness==='نعم')&&isValidLeadEmail(legacyEmail||businessEmail)&&Boolean(researchSourceUrl);const contactVerificationStatus=validChoice(input.contactVerificationStatus??(hasLegacyVerifiedEvidence?'VERIFIED':''),CONTACT_VERIFICATION_STATUSES,hasLegacyVerifiedEvidence?'VERIFIED':'UNRESEARCHED');
 const companyName=input.companyName.trim();const website=input.website?.trim()??'';const leadScore=normalizedScore(input.leadScore)||(normalizedPriority(input.priority)??0)*20;const priority=normalizedPriority(input.priority)??(leadScore?priorityFromLeadScore(leadScore):null);
 const base:Lead={
  id:input.id??crypto.randomUUID(),sourceRowNumber:cellText(input.sourceRowNumber),companyName,companyNameNormalized:input.companyNameNormalized?.trim()||normalizedCompanyName(companyName),
  contactName:input.contactName?.trim()??'',contactJobTitle:input.contactJobTitle?.trim()??input.jobTitle?.trim()??'',email:'',businessEmail,generalEmail,procurementEmail,projectsEmail,phone:input.phone?.trim()??'',whatsapp:input.whatsapp?.trim()??'',
  linkedinCompanyUrl:input.linkedinCompanyUrl?.trim()??'',supplierPortalUrl:input.supplierPortalUrl?.trim()??'',contactPageUrl:input.contactPageUrl?.trim()??'',researchSourceUrl,researchNotes:input.researchNotes?.trim()??'',researchVerifiedAt:input.researchVerifiedAt??'',contactVerificationStatus,
  preferredContactMethod:validChoice(input.preferredContactMethod??'',PREFERRED_CONTACT_METHODS,'UNKNOWN'),supplierRegistrationStatus:validChoice(input.supplierRegistrationStatus??'',SUPPLIER_REGISTRATION_STATUSES,'NOT_STARTED'),
  city:input.city?.trim()??'',region:input.region?.trim()??'',country:input.country?.trim()||'Saudi Arabia',sector:normalizedSector(input.sector??''),subSector:input.subSector?.trim()??'',website,officialDomain:input.officialDomain?.trim()||normalizedDomain(website),
  sourceUrl,source:validChoice(input.source??'',OUTREACH_SOURCES,'Manual Research'),sourceName:input.sourceName?.trim()??'',sourceType:input.sourceType?.trim()??'',sourceRetrievedAt:input.sourceRetrievedAt?.trim()??'',registrationIdentifier:input.registrationIdentifier?.trim()??'',companySize:input.companySize?.trim()??'',officialClassification:input.officialClassification?.trim()??'',sourceEvidence:input.sourceEvidence?.trim()??'',
  language:normalizedLanguage(input.language??''),status,readiness:'NEEDS_CONTACT_RESEARCH',priority,leadScore,fitReason:input.fitReason?.trim()??'',targetRole:input.targetRole?.trim()??'',nextAction:input.nextAction?.trim()??'',lastContactedAt:input.lastContactedAt??'',nextFollowUpAt:input.nextFollowUpAt??'',notes:input.notes?.trim()??'',duplicateStatus:validChoice(input.duplicateStatus??'',DUPLICATE_STATUSES,'UNIQUE'),duplicateReason:input.duplicateReason?.trim()??'',history:Array.isArray(input.history)?input.history:[],createdAt:input.createdAt??now,updatedAt:input.updatedAt??now
 };
 base.email=selectBestRecipient(base);base.readiness=deriveResearchReadiness(base);
 if(base.preferredContactMethod==='UNKNOWN')base.preferredContactMethod=base.readiness==='READY_TO_CONTACT'?'EMAIL':base.readiness==='SUPPLIER_PORTAL_AVAILABLE'?'SUPPLIER_PORTAL':base.readiness==='CONTACT_FORM_AVAILABLE'?'CONTACT_FORM':base.phone?'PHONE':base.whatsapp?'WHATSAPP':base.linkedinCompanyUrl?'LINKEDIN':'UNKNOWN';
 if(!base.researchVerifiedAt&&base.researchSourceUrl&&(base.contactVerificationStatus==='VERIFIED'||base.contactVerificationStatus==='FOUND_TARGET_CONTACT'))base.researchVerifiedAt=now;
 return base;
}

export function findDuplicateLead(leads:Lead[],candidate:Lead){const name=candidate.companyNameNormalized||normalizedCompanyName(candidate.companyName);const website=normalizedWebsite(candidate.website);const domain=candidate.officialDomain||normalizedDomain(candidate.website);const email=selectBestRecipient(candidate);const phone=candidate.phone.replace(/\D/g,'');const registration=candidate.registrationIdentifier.trim();return leads.find(lead=>(registration&&lead.registrationIdentifier===registration)||(name&&(lead.companyNameNormalized||normalizedCompanyName(lead.companyName))===name)||(website&&normalizedWebsite(lead.website)===website)||(domain&&(lead.officialDomain||normalizedDomain(lead.website))===domain)||(phone&&lead.phone.replace(/\D/g,'')===phone)||(email&&[lead.procurementEmail,lead.projectsEmail,lead.businessEmail,lead.generalEmail,lead.email].includes(email)));}

export function mergeImportedLead(existing:Lead,incoming:Lead):Lead{
 const merged={...existing,...incoming,id:existing.id,contactName:incoming.contactName||existing.contactName,contactJobTitle:incoming.contactJobTitle||existing.contactJobTitle,businessEmail:incoming.businessEmail||existing.businessEmail,generalEmail:incoming.generalEmail||existing.generalEmail,procurementEmail:incoming.procurementEmail||existing.procurementEmail,projectsEmail:incoming.projectsEmail||existing.projectsEmail,phone:incoming.phone||existing.phone,website:incoming.website||existing.website,officialDomain:incoming.officialDomain||existing.officialDomain,sourceUrl:incoming.sourceUrl||existing.sourceUrl,researchSourceUrl:incoming.researchSourceUrl||existing.researchSourceUrl,registrationIdentifier:incoming.registrationIdentifier||existing.registrationIdentifier,sourceEvidence:incoming.sourceEvidence||existing.sourceEvidence,createdAt:existing.createdAt,history:existing.history,lastContactedAt:existing.lastContactedAt,nextFollowUpAt:existing.nextFollowUpAt,status:existing.status==='NEW'?incoming.status:existing.status,updatedAt:nowIso()};
 return createLead(merged);
}

export function parseLeadRows(rows:unknown[][]):LeadImportResult{
 if(!rows.length)return {leads:[],errors:[{row:1,message:'The import file is empty.'}],duplicates:[],totalRows:0};
 const mappedHeaders=rows[0].map(value=>HEADER_ALIASES[cellText(value).replace(/^\uFEFF/,'').toLocaleLowerCase()]??null);
 if(!mappedHeaders.includes('companyName'))return {leads:[],errors:[{row:1,message:'Missing required companyName / الشركة column.'}],duplicates:[],totalRows:Math.max(0,rows.length-1)};
 const leads:Lead[]=[];const errors:LeadImportResult['errors']=[];const duplicates:LeadImportResult['duplicates']=[];let totalRows=0;
 rows.slice(1).forEach((values,index)=>{
  if(!values.some(value=>cellText(value)))return;totalRows++;const rowNumber=index+2;const raw:Record<string,unknown>={};mappedHeaders.forEach((key,column)=>{if(key)raw[key]=values[column]??'';});
  const companyName=cellText(raw.companyName);const email=cellText(raw.email).toLowerCase();if(!companyName){errors.push({row:rowNumber,message:'Company name is required.'});return;}if(email&&!isValidLeadEmail(email)){errors.push({row:rowNumber,message:`Invalid email: ${email}`});return;}
  const lead=createLead({
   id:cellText(raw.id)||undefined,companyName,companyNameNormalized:cellText(raw.companyNameNormalized),email,businessEmail:cellText(raw.businessEmail)||email,generalEmail:cellText(raw.generalEmail),procurementEmail:cellText(raw.procurementEmail),projectsEmail:cellText(raw.projectsEmail),
   sourceRowNumber:cellText(raw.sourceRowNumber),contactName:cellText(raw.contactName),contactJobTitle:cellText(raw.contactJobTitle),phone:cellText(raw.phone),whatsapp:cellText(raw.whatsapp),
   city:cellText(raw.city),region:cellText(raw.region),country:cellText(raw.country),sector:cellText(raw.sector) as OutreachSector,subSector:cellText(raw.subSector),website:cellText(raw.website),officialDomain:cellText(raw.officialDomain),
   sourceUrl:cellText(raw.sourceUrl),sourceName:cellText(raw.sourceName),sourceType:cellText(raw.sourceType),sourceRetrievedAt:cellText(raw.sourceRetrievedAt),registrationIdentifier:cellText(raw.registrationIdentifier),companySize:cellText(raw.companySize),officialClassification:cellText(raw.officialClassification),sourceEvidence:cellText(raw.sourceEvidence),
   supplierPortalUrl:cellText(raw.supplierPortalUrl),contactPageUrl:cellText(raw.contactPageUrl),linkedinCompanyUrl:cellText(raw.linkedinCompanyUrl),researchSourceUrl:cellText(raw.researchSourceUrl)||cellText(raw.sourceUrl),researchNotes:cellText(raw.researchNotes),
   contactVerificationStatus:cellText(raw.contactVerificationStatus) as ContactVerificationStatus,preferredContactMethod:cellText(raw.preferredContactMethod) as PreferredContactMethod,supplierRegistrationStatus:cellText(raw.supplierRegistrationStatus) as SupplierRegistrationStatus,researchVerifiedAt:cellText(raw.researchVerifiedAt),
   source:cellText(raw.source) as OutreachSource,language:cellText(raw.language) as OutreachLanguage,status:cellText(raw.status) as OutreachStatus,readiness:cellText(raw.readiness) as OutreachReadiness,priority:normalizedPriority(raw.priority),leadScore:normalizedScore(raw.leadScore),
   fitReason:cellText(raw.fitReason),targetRole:cellText(raw.targetRole),nextAction:cellText(raw.nextAction),notes:cellText(raw.notes),duplicateStatus:cellText(raw.duplicateStatus) as DuplicateStatus,duplicateReason:cellText(raw.duplicateReason)
  });
  const duplicate=findDuplicateLead(leads,lead);if(duplicate)duplicates.push({row:rowNumber,message:`Possible duplicate of ${duplicate.companyName}.`});leads.push(lead);
 });
 return {leads,errors,duplicates,totalRows};
}

export function parseLeadCsv(text:string):LeadImportResult{
 return parseLeadRows(csvRows(text.replace(/^\uFEFF/,'')));
}

function csvCell(value:unknown){const text=value==null?'':typeof value==='string'?value:typeof value==='number'||typeof value==='boolean'?String(value):JSON.stringify(value);return /[",\n\r]/.test(text)?`"${text.replace(/"/g,'""')}"`:text;}
export function exportLeadCsv(leads:Lead[]){return [CSV_EXPORT_COLUMNS.join(','),...leads.map(lead=>CSV_EXPORT_COLUMNS.map(column=>csvCell(lead[column])).join(','))].join('\r\n');}

export function interpolateTemplate(template:string,lead:Lead){
 const values:Record<string,string>={contactName:lead.contactName,companyName:lead.companyName,jobTitle:lead.contactJobTitle,city:lead.city,sector:lead.sector};
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
 const recipient=selectBestRecipient(lead);if(!canSendToLead(lead)||!isValidLeadEmail(recipient))throw new Error('Add a verified public business email and its public source before preparing outreach.');
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
 return {to:recipient,subject:subjects[type],body:bodyParts.filter(Boolean).join('\n\n'),type};
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
  if(!lead.companyName||(lead.email&&!EMAIL.test(lead.email)))throw new Error(`Invalid lead at position ${index+1}.`);
  return createLead(lead as Partial<Lead>&Pick<Lead,'companyName'>);
 });
}
