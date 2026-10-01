import {OutreachLoginError} from '@/components/outreach-login-error';

export const dynamic='force-static';

export default function OutreachLogin(){
 return <main className="outreach-login"><section><p className="outreach-kicker">خاص · إدارة المبيعات</p><h1>مساعد المبيعات</h1><p>الدخول للمصرّح لهم فقط. تبقى بيانات الشركات محفوظة في هذا المتصفح.</p><form method="post" action="/admin/outreach/login"><label>كلمة مرور المسؤول<input name="password" type="password" autoComplete="current-password" required/></label><OutreachLoginError/><button type="submit">تسجيل الدخول</button></form></section></main>;
}
