import {OutreachLoginError} from '@/components/outreach-login-error';

export const dynamic='force-static';

export default function OutreachLogin(){
 return <main className="outreach-login"><section><p className="outreach-kicker">PRIVATE · SALES OPERATIONS</p><h1>Sales Outreach Assistant</h1><p>Authorized access only. Lead information remains stored in this browser.</p><form method="post" action="/admin/outreach/login"><label>Admin password<input name="password" type="password" autoComplete="current-password" required/></label><OutreachLoginError/><button type="submit">Sign in</button></form></section></main>;
}
