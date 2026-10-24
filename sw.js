// Guarda só a "casca" do app (esta página, ícones e manifest).
// O Data-Cred em si vem sempre do Google Apps Script, nunca do cache.
const CACHE_NAME = "datacred-shell-v1";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-48.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      const nomes = await caches.keys();
      await Promise.all(
        nomes
          .filter(function (nome) {
            return nome.startsWith("datacred-shell-") && nome !== CACHE_NAME;
          })
          .map(function (nome) {
            return caches.delete(nome);
          })
      );
      await self.clients.claim();
    })()
  );
});

// Rede primeiro; se estiver sem internet, usa a casca guardada.
self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(function (resp) {
        const copia = resp.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(req, copia);
        });
        return resp;
      })
      .catch(function () {
        return caches.match(req).then(function (r) {
          return r || caches.match("./index.html");
        });
      })
  );
});
