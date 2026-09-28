import {next} from '@vercel/edge';
import {OUTREACH_SESSION_COOKIE,clearOutreachSessionCookie,createOutreachSessionToken,outreachSecretConfigured,outreachSessionCookie,readCookie,sameRequestOrigin,validOutreachSession} from './lib/outreach-auth';

const LOGIN='/admin/outreach/login';
const LOGOUT='/admin/outreach/logout';

function privateHeaders(response:Response){const headers=new Headers(response.headers);headers.set('Cache-Control','private, no-store, max-age=0');headers.set('X-Robots-Tag','noindex, nofollow, noarchive');return new Response(response.body,{status:response.status,statusText:response.statusText,headers});}

export default async function middleware(request:Request){
 const url=new URL(request.url);const secret=process.env.OUTREACH_ADMIN_PASSWORD;
 if(!outreachSecretConfigured(secret))return new Response('Outreach admin is not configured.',{status:503,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive'}});
 const secure=url.protocol==='https:';
 if(url.pathname===LOGIN&&request.method==='POST'){
  if(!sameRequestOrigin(request))return new Response('Forbidden',{status:403,headers:{'Cache-Control':'no-store'}});
  const form=await request.formData();const passwordValue=form.get('password');const password=typeof passwordValue==='string'?passwordValue:'';
  const valid=await validOutreachSession(secret,await createOutreachSessionToken(password));
  if(!valid){await new Promise(resolve=>setTimeout(resolve,650));return privateHeaders(Response.redirect(new URL(`${LOGIN}?error=1`,url),303));}
  const response=privateHeaders(Response.redirect(new URL('/admin/outreach',url),303));response.headers.append('Set-Cookie',outreachSessionCookie(await createOutreachSessionToken(secret),secure));return response;
 }
 if(url.pathname===LOGOUT&&request.method==='POST'){
  if(!sameRequestOrigin(request))return new Response('Forbidden',{status:403,headers:{'Cache-Control':'no-store'}});
  const response=privateHeaders(Response.redirect(new URL(LOGIN,url),303));response.headers.append('Set-Cookie',clearOutreachSessionCookie(secure));return response;
 }
 const token=readCookie(request.headers.get('cookie'),OUTREACH_SESSION_COOKIE);const authenticated=await validOutreachSession(secret,token);
 if(url.pathname===LOGIN){if(authenticated)return privateHeaders(Response.redirect(new URL('/admin/outreach',url),303));return privateHeaders(next());}
 if(!authenticated)return privateHeaders(Response.redirect(new URL(LOGIN,url),307));
 return privateHeaders(next());
}

export const config={matcher:'/admin/outreach/:path*'};
