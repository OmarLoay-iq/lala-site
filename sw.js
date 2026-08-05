self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (name) {
            return caches.delete(name);
          }),
        );
      })
      .then(function () {
        return self.registration.unregister();
      }),
  );
});
