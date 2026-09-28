import type {Lead} from './outreach';

const DB_NAME='bin-mansoor-sales-outreach';
const STORE='leads';

function database(){
 return new Promise<IDBDatabase>((resolve,reject)=>{
  const request=indexedDB.open(DB_NAME,1);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE,{keyPath:'id'});};
  request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error('Unable to open the local lead database.'));
 });
}
function transaction<T>(mode:IDBTransactionMode,run:(store:IDBObjectStore,resolve:(value:T)=>void,reject:(reason?:unknown)=>void)=>void){
 return database().then(db=>new Promise<T>((resolve,reject)=>{const tx=db.transaction(STORE,mode);run(tx.objectStore(STORE),resolve,reject);tx.oncomplete=()=>db.close();tx.onerror=()=>reject(new Error('Local lead database operation failed.'));}));
}
export function loadLeads(){return transaction<Lead[]>('readonly',(store,resolve,reject)=>{const request=store.getAll();request.onsuccess=()=>resolve(request.result as Lead[]);request.onerror=()=>reject(request.error);});}
export function saveLead(lead:Lead){return transaction<void>('readwrite',(store,resolve,reject)=>{const request=store.put(lead);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);});}
export function saveLeads(leads:Lead[]){return transaction<void>('readwrite',(store,resolve,reject)=>{for(const lead of leads)store.put(lead);const request=store.count();request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);});}
export function removeLead(id:string){return transaction<void>('readwrite',(store,resolve,reject)=>{const request=store.delete(id);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);});}
export function replaceLeads(leads:Lead[]){return transaction<void>('readwrite',(store,resolve,reject)=>{const clear=store.clear();clear.onerror=()=>reject(clear.error);clear.onsuccess=()=>{for(const lead of leads)store.put(lead);resolve();};});}
