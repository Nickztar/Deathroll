const staticCacheName = "static-" + Date.now();
const dynamicCacheName = "dynamic-" + Date.now();
const assets = [
    "/",
    "/index.html",
    "/global.css",
    "/build/extra.css",
    "/build/bundle.css",
    "/build/bundle.js",
];

self.addEventListener("install", async (e) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assets);
    return self.skipWaiting();
});

self.addEventListener("activate", async (e) => {
    await clients.claim();
    const cacheKeys = await caches.keys();
    const badCaches = cacheKeys.filter((key) => {
        return key != staticCacheName && key != dynamicCacheName;
    });
    badCaches.forEach(async (key) => {
        await caches.delete(key);
    });
    return self.skipWaiting();
});

self.addEventListener("fetch", async (e) => {
    const req = e.request;
    const url = new URL(req.url);
    if (req.method === "GET") {
        if (url.origin === location.origin) {
            e.respondWith(cacheFirst(req));
        } else {
            e.respondWith(networkAndCache(req));
        }
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(staticCacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}
