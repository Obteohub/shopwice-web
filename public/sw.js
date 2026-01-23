self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.registration.unregister()
        .then(() => console.log('Stale Service Worker unregistered'))
        .catch(err => console.error('Failed to unregister SW:', err));
});
