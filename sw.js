self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification && event.notification.data && event.notification.data.url) || (self.registration.scope + '#comments');
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      try {
        const href = client.url || '';
        if (href && href.split('#')[0] === url.split('#')[0]) {
          client.focus();
          client.postMessage({ type: 'navigate', url });
          return;
        }
      } catch (_) {}
    }
    await clients.openWindow(url);
  })());
});

self.addEventListener('message', function(_){});

