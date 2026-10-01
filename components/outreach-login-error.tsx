'use client';

import {useSyncExternalStore} from 'react';

export function OutreachLoginError(){
 const visible=useSyncExternalStore(()=>()=>{},()=>new URLSearchParams(window.location.search).has('error'),()=>false);
 return visible?<p role="alert">كلمة المرور غير صحيحة.</p>:null;
}
