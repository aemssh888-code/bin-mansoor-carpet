import test from 'node:test';
import assert from 'node:assert/strict';
import {OUTREACH_SESSION_COOKIE,createOutreachSessionToken,outreachSecretConfigured,outreachSessionCookie,readCookie,sameRequestOrigin,validOutreachSession} from '../lib/outreach-auth.ts';
import {createLead,exportLeadCsv,generateOutreachEmail,gmailComposeUrl,interpolateTemplate,markLeadSent,parseLeadCsv,validateBackup} from '../lib/outreach.ts';

const lead=(patch={})=>createLead({companyName:'TEST Riyadh Projects',email:'buyer@example.test',contactName:'Amina',jobTitle:'Procurement Manager',city:'Riyadh',country:'Saudi Arabia',sector:'Contractors',source:'Manual Research',language:'en',...patch});

test('authentication tokens are server-secret derived and cookies are hardened',async()=>{
 const secret='a-strong-test-secret';const token=await createOutreachSessionToken(secret);
 assert.equal(await validOutreachSession(secret,token),true);assert.equal(await validOutreachSession('different-secret',token),false);assert.equal(outreachSecretConfigured(''),false);assert.equal(outreachSecretConfigured('configured'),true);
 const cookie=outreachSessionCookie(token,true);assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Strict/);assert.match(cookie,/Secure/);assert.equal(readCookie(`${OUTREACH_SESSION_COOKIE}=${token}; other=1`,OUTREACH_SESSION_COOKIE),token);
 assert.equal(sameRequestOrigin(new Request('https://binmansoor.com/admin/outreach',{method:'POST',headers:{origin:'https://binmansoor.com'}})),true);
 assert.equal(sameRequestOrigin(new Request('https://binmansoor.com/admin/outreach',{method:'POST',headers:{origin:'https://example.com'}})),false);
});

test('CSV import keeps valid rows and reports invalid rows',()=>{
 const csv='companyName,contactName,jobTitle,email,phone,city,country,sector,website,source,language,notes\nTEST One,Amina,,amina@example.test,,Riyadh,Saudi Arabia,Contractors,,Manual Research,en,Priority\nMissing,,,,,,,,,,,\nBad Email,,,not-an-email,,,,,,,,\nTEST Two,,,two@example.test,,Doha,Qatar,Hospitality / Hotels,,Referral,ar,';
 const result=parseLeadCsv(csv);assert.equal(result.leads.length,2);assert.equal(result.errors.length,2);assert.equal(result.leads[0].companyName,'TEST One');assert.equal(result.leads[1].language,'ar');
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
 const updated={...lead(),status:'REPLIED',lastContactedAt:'2026-09-28T12:00:00Z',nextFollowUpAt:'2026-10-02',notes:'Asked for options'};const csv=exportLeadCsv([updated]);assert.match(csv,/companyName,contactName/);assert.match(csv,/REPLIED/);assert.match(csv,/Asked for options/);
 const restored=validateBackup({version:1,leads:[updated]});assert.equal(restored.length,1);assert.equal(restored[0].status,'REPLIED');
});
