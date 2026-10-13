const CACHE='mukt-library-v1';
const ASSETS=['./','./index.html','./style.css','./app.js','./ram.json','./chhinna.json','./bhagavat.json','./paigam.json','./themes.json','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{await self.clients.claim();for(const c of await self.clients.matchAll())c.postMessage({offlineReady:true});})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith((async()=>{const hit=await caches.match(e.request,{ignoreSearch:true});if(hit)return hit;try{return await fetch(e.request);}catch(err){if(e.request.mode==='navigate')return caches.match('./index.html');throw err;}})());});
