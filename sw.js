const K='sms-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(K).then(c=>c.addAll(['./','index.html','config.js','manifest.json'])).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 const ok=u.origin===location.origin||(/(gstatic|googleapis)\.com$/.test(u.hostname)&&!/^(firestore|identitytoolkit|securetoken|firebase)/.test(u.hostname));
 if(r.method!=='GET'||!ok)return;
 e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(K).then(k=>k.put(r,c));return x}).catch(()=>caches.match(r)))});
