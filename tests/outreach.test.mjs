import test from 'node:test';
import assert from 'node:assert/strict';
import {OUTREACH_SESSION_COOKIE,createOutreachSessionToken,outreachSecretConfigured,outreachSessionCookie,readCookie,sameRequestOrigin,validOutreachSession} from '../lib/outreach-auth.ts';
import {canSendToLead,createLead,emailDomainReview,exportLeadCsv,findDuplicateEmail,findDuplicateLead,generateOutreachEmail,gmailComposeUrl,interpolateTemplate,isValidLeadEmail,markLeadSent,parseLeadCsv,parseLeadRows,researchQueue,selectBestRecipient,validateBackup} from '../lib/outreach.ts';

const lead=(patch={})=>createLead({companyName:'TEST Riyadh Projects',businessEmail:'buyer@example.test',email:'buyer@example.test',researchSourceUrl:'https://example.test/contact',contactVerificationStatus:'VERIFIED',contactName:'Amina',contactJobTitle:'Procurement Manager',city:'Riyadh',country:'Saudi Arabia',sector:'Contractors',source:'Manual Research',language:'en',...patch});

test('authentication tokens are server-secret derived and cookies are hardened',async()=>{
 const secret='a-strong-test-secret';const token=await createOutreachSessionToken(secret);
 assert.equal(await validOutreachSession(secret,token),true);assert.equal(await validOutreachSession('different-secret',token),false);assert.equal(outreachSecretConfigured(''),false);assert.equal(outreachSecretConfigured('configured'),true);
 const cookie=outreachSessionCookie(token,true);assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Strict/);assert.match(cookie,/Secure/);assert.equal(readCookie(`${OUTREACH_SESSION_COOKIE}=${token}; other=1`,OUTREACH_SESSION_COOKIE),token);
 assert.equal(sameRequestOrigin(new Request('https://binmansoor.com/admin/outreach',{method:'POST',headers:{origin:'https://binmansoor.com'}})),true);
 assert.equal(sameRequestOrigin(new Request('https://binmansoor.com/admin/outreach',{method:'POST',headers:{origin:'https://example.com'}})),false);
});

test('CSV import keeps companies without email and reports malformed rows',()=>{
 const csv='companyName,contactName,contactJobTitle,email,phone,city,country,sector,website,source,language,notes\nTEST One,Amina,,amina@example.test,,Riyadh,Saudi Arabia,Contractors,,Manual Research,en,Priority\nMissing Email,,,,,Riyadh,Saudi Arabia,Developers,,Manual Research,en,Research\n,No Company,,,,,,,,,,\nBad Email,,,not-an-email,,,,,,,,\nTEST Two,,,two@example.test,,Doha,Qatar,Hospitality / Hotels,,Referral,ar,';
 const result=parseLeadCsv(csv);assert.equal(result.leads.length,3);assert.equal(result.errors.length,2);assert.equal(result.leads[1].readiness,'NEEDS_CONTACT_RESEARCH');assert.equal(result.leads[2].language,'ar');
});

test('Arabic workbook headers map target role separately and assign readiness',()=>{
 const rows=[['رقم','الشركة','القطاع','المدينة/المنطقة','الدولة','الأولوية (1-5)','سبب الملاءمة','المنصب المستهدف','البريد العام','الموقع','رابط المصدر/التواصل','لغة التواصل','الحالة','جاهز للإيميل؟','الإجراء التالي','ملاحظات'],[1,'Saudi Ready','Developer / Giga-project','Riyadh','Saudi Arabia',5,'Large projects','Procurement / FF&E','sales@example.test','https://example.test','https://example.test/contact','English','New','نعم','Review',''],[2,'Saudi Research','Hotel Operator','Jeddah','Saudi Arabia',4,'Hospitality fit','Procurement','', 'https://hotel.test','https://hotel.test/contact','Arabic','New','لا','Find email','']];
 const result=parseLeadRows(rows);assert.equal(result.totalRows,2);assert.equal(result.leads.length,2);assert.equal(result.leads[0].targetRole,'Procurement / FF&E');assert.equal(result.leads[0].contactName,'');assert.equal(result.leads[0].priority,5);assert.equal(result.leads[0].readiness,'READY_TO_CONTACT');assert.equal(result.leads[1].readiness,'NEEDS_CONTACT_RESEARCH');assert.equal(result.leads[1].language,'ar');
});

test('possible duplicates remain visible in preview and are not silently discarded',()=>{
 const rows=[['الشركة','البريد العام','الموقع'],['First Company','','https://same.example.test'],['Second Company','sales@same.example.test','https://same.example.test']];
 const result=parseLeadRows(rows);assert.equal(result.totalRows,2);assert.equal(result.leads.length,2);assert.equal(result.duplicates.length,1);assert.equal(result.leads.filter(item=>item.readiness==='READY_TO_CONTACT').length,0);
});

test('duplicates use company, website or email and missing email blocks drafts',()=>{
 const original=lead({website:'https://www.example.test/'});assert.equal(findDuplicateLead([original],lead({companyName:'Different',email:'other@example.test',businessEmail:'other@example.test',website:'https://example.test'}))?.id,original.id);assert.equal(isValidLeadEmail(''),false);assert.throws(()=>generateOutreachEmail({lead:lead({email:'',businessEmail:'',generalEmail:'',procurementEmail:'',projectsEmail:''}),type:'FIRST CONTACT'}),/verified public business email/);
});

test('template interpolation never invents missing values',()=>{assert.equal(interpolateTemplate('Hello {{contactName}} at {{companyName}} in {{city}}',lead({contactName:'',city:''})),'Hello  at TEST Riyadh Projects in ');});

test('sector email, product links and Gmail compose URL are encoded',()=>{
 const design={key:'wtw:WTW-015',line:'Wall-to-Wall',code:'WTW-015',name:{en:'Test Linear',ar:'خطي تجريبي'},path:'/wall-to-wall/wtw-015'};
 const draft=generateOutreachEmail({lead:lead(),type:'FIRST CONTACT',personalOpeningLine:'I reviewed {{companyName}}.',includeMoq:true,includeOptOut:true,designs:[design]});
 assert.match(draft.body,/project carpet supply/);assert.match(draft.body,/8,000 m² per design/);assert.match(draft.body,/https:\/\/binmansoor.com\/en\/wall-to-wall\/wtw-015/);assert.match(draft.body,/I will not follow up/);
 const url=new URL(gmailComposeUrl(draft));assert.equal(url.hostname,'mail.google.com');assert.equal(url.searchParams.get('to'),'buyer@example.test');assert.equal(url.searchParams.get('su'),draft.subject);assert.equal(url.searchParams.get('body'),draft.body);
});

test('mark sent records history and stops automatic follow-up after follow-up two',()=>{
 const first=generateOutreachEmail({lead:lead(),type:'FIRST CONTACT'});const sent=markLeadSent(lead(),first,new Date('2026-09-28T12:00:00Z'));assert.equal(sent.status,'CONTACTED');assert.equal(sent.nextFollowUpAt,'2026-10-02');assert.equal(sent.history.length,1);
 const secondDraft=generateOutreachEmail({lead:sent,type:'FOLLOW-UP #2'});const second=markLeadSent(sent,secondDraft,new Date('2026-10-02T12:00:00Z'));assert.equal(second.nextFollowUpAt,'');assert.equal(second.history.at(-1).type,'FOLLOW-UP #2');
});

test('DO NOT CONTACT blocks every outreach template',()=>{assert.throws(()=>generateOutreachEmail({lead:lead({status:'DO NOT CONTACT'}),type:'FOLLOW-UP #1'}),/DO NOT CONTACT/);});

test('CSV export and JSON backup retain updated sales fields',()=>{
 const updated={...lead(),status:'REPLIED',priority:5,targetRole:'Procurement',lastContactedAt:'2026-09-28T12:00:00Z',nextFollowUpAt:'2026-10-02',notes:'Asked for options'};const csv=exportLeadCsv([updated]);assert.match(csv,/companyName,contactName/);assert.match(csv,/READY_TO_CONTACT/);assert.match(csv,/Procurement/);assert.match(csv,/Asked for options/);
 const restored=validateBackup({version:1,leads:[updated]});assert.equal(restored.length,1);assert.equal(restored[0].status,'REPLIED');
});

test('Needs Contact Research becomes Ready only with verified target email and public source',()=>{
 const pending=createLead({companyName:'Research Co'});assert.equal(pending.readiness,'NEEDS_CONTACT_RESEARCH');
 const ready=createLead({...pending,procurementEmail:'procurement@research.test',researchSourceUrl:'https://research.test/suppliers',contactVerificationStatus:'FOUND_TARGET_CONTACT'});
 assert.equal(ready.readiness,'READY_TO_CONTACT');assert.equal(canSendToLead(ready),true);
});

test('invalid or unsupported email does not become Ready',()=>{
 const invalid=createLead({companyName:'Invalid Co',businessEmail:'not-an-email',researchSourceUrl:'https://invalid.test/contact',contactVerificationStatus:'VERIFIED'});
 assert.equal(invalid.readiness,'NEEDS_CONTACT_RESEARCH');assert.equal(canSendToLead(invalid),false);
 const general=createLead({companyName:'General Co',generalEmail:'info@general.test',researchSourceUrl:'https://general.test/contact',contactVerificationStatus:'FOUND_GENERAL_CONTACT'});
 assert.equal(general.readiness,'NEEDS_CONTACT_RESEARCH');
});

test('contact form only becomes Contact Form Available without inventing email',()=>{
 const item=createLead({companyName:'Form Co',contactPageUrl:'https://form.test/contact',preferredContactMethod:'CONTACT_FORM'});
 assert.equal(item.readiness,'CONTACT_FORM_AVAILABLE');assert.equal(selectBestRecipient(item),'');
});

test('supplier portal only becomes Supplier Portal Available',()=>{
 const item=createLead({companyName:'Portal Co',supplierPortalUrl:'https://portal.test/vendors',contactVerificationStatus:'SUPPLIER_PORTAL_FOUND'});
 assert.equal(item.readiness,'SUPPLIER_PORTAL_AVAILABLE');assert.equal(item.preferredContactMethod,'SUPPLIER_PORTAL');
});

test('DO NOT CONTACT remains blocked even with verified email',()=>{
 const blocked=lead({status:'DO NOT CONTACT'});assert.equal(blocked.readiness,'NEEDS_CONTACT_RESEARCH');assert.equal(canSendToLead(blocked),false);assert.throws(()=>generateOutreachEmail({lead:blocked,type:'FIRST CONTACT'}),/DO NOT CONTACT/);
});

test('duplicate email warning finds another lead without merging companies',()=>{
 const first=lead({companyName:'First Co',procurementEmail:'buy@group.test',businessEmail:''});const second=lead({companyName:'Second Co',projectsEmail:'buy@group.test',businessEmail:''});
 assert.equal(findDuplicateEmail([first,second],second,second.id)?.companyName,'First Co');assert.notEqual(first.id,second.id);
});

test('best recipient follows procurement, projects, business then general order',()=>{
 const item=lead({procurementEmail:'procurement@example.test',projectsEmail:'projects@example.test',businessEmail:'sales@example.test',generalEmail:'info@example.test'});
 assert.equal(selectBestRecipient(item),'procurement@example.test');assert.equal(generateOutreachEmail({lead:item,type:'FIRST CONTACT'}).to,'procurement@example.test');assert.equal(emailDomainReview({...item,website:'https://example.test'}),'MATCH');
});

test('Save & Next ordering uses highest priority then company name',()=>{
 const queue=researchQueue([createLead({companyName:'Zeta',priority:4}),createLead({companyName:'Beta',priority:5}),createLead({companyName:'Alpha',priority:5}),lead({companyName:'Already Ready',priority:5})]);
 assert.deepEqual(queue.map(item=>item.companyName),['Alpha','Beta','Zeta']);
});
