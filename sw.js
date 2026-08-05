self.LALA_RELEASE = "2026-08-05-login-fix-1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const windows = await self.clients.matchAll({ type: "window" });
      await Promise.all(
        windows.map((client) => {
          const url = new URL(client.url);
          if (url.origin !== self.location.origin) return undefined;

          url.searchParams.set("release", self.LALA_RELEASE);
          return client.navigate(url.href);
        }),
      );
    })(),
  );
});
