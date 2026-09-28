export const OUTREACH_SESSION_COOKIE='bmc_outreach_session';
export const OUTREACH_SESSION_MAX_AGE=60*60*12;

const encoder=new TextEncoder();

export function outreachSecretConfigured(secret:string|undefined):secret is string{return Boolean(secret&&secret.length>=12);}

export async function createOutreachSessionToken(secret:string){
 const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const signature=await crypto.subtle.sign('HMAC',key,encoder.encode('bin-mansoor-outreach-session:v1'));
 return [...new Uint8Array(signature)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}

export function readCookie(cookieHeader:string|null,name:string){
 if(!cookieHeader)return null;
 for(const pair of cookieHeader.split(';')){
  const index=pair.indexOf('=');
  if(index<0)continue;
  if(pair.slice(0,index).trim()===name)return decodeURIComponent(pair.slice(index+1).trim());
 }
 return null;
}

export function constantTimeEqual(left:string,right:string){
 if(left.length!==right.length)return false;
 let difference=0;
 for(let index=0;index<left.length;index++)difference|=left.charCodeAt(index)^right.charCodeAt(index);
 return difference===0;
}

export async function validOutreachSession(secret:string,candidate:string|null){
 if(!candidate)return false;
 return constantTimeEqual(await createOutreachSessionToken(secret),candidate);
}

export function sameRequestOrigin(request:Request){
 const origin=request.headers.get('origin');
 return Boolean(origin&&origin===new URL(request.url).origin);
}

export function outreachSessionCookie(token:string,secure:boolean){
 return `${OUTREACH_SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/admin/outreach; Max-Age=${OUTREACH_SESSION_MAX_AGE}; HttpOnly; SameSite=Strict${secure?'; Secure':''}`;
}

export function clearOutreachSessionCookie(secure:boolean){
 return `${OUTREACH_SESSION_COOKIE}=; Path=/admin/outreach; Max-Age=0; HttpOnly; SameSite=Strict${secure?'; Secure':''}`;
}
