var appVersion = 'v1.012';
 var  files =[
    './',
    './index.html',
    './assets/css/style.css',
    './assets/img/bhg.jpg'

 ]
//  install
 self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(appVersion)
        .then(cache=>{
            return cache.addAll(files)
        })
        .catch(err=>{
            console.error('error adding files chches,', err)
        })
    )
    console.info('sw installed');
    self.skipWaiting()
 })
//  active
self.addEventListener('activte',event=>{
    event.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== appVersion){
                        console.info('deleting old cache,',cache)
                        return cache.delete(cache)

                    }
                })
            )
        })
    )
    return self.clients.claim()
})
// fetch
self.addEventListener('fetch',event=>{
    console.info('sw fetch', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            return res ||fetch(event.request)
        })
    )
})