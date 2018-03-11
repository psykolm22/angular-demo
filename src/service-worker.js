// Workbox service worker

// TODO: workaround using CopyWebpackPlugin or CDN
importScripts('workbox-sw.prod.js');

const workboxSW = new self.WorkboxSW({ clientsClaim: true });
workboxSW.precache([]);

// Used for App Shell Model
workboxSW.router.registerNavigationRoute("index.html");

// Cache all Google Fonts requests (up to a maximum of 20 cache entries)
workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
    workboxSW.strategies.cacheFirst({
        cacheName: 'google-apis',
        cacheExpiration: {
            maxEntries: 20
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);

// Cache all images using an extension whitelist
workboxSW.router.registerRoute(/\.(?:png|gif|jpg|svg)$/,
    workboxSW.strategies.cacheFirst({
        cacheName: 'images-cache',
        cacheExpiration: {
            maxEntries: 50
        }
    })
);

// Cache all scripts and stylesheets using an extension whitelist
workboxSW.router.registerRoute(/\.(?:js|css)$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'static-resources',
        cacheExpiration: {
            maxAgeSeconds: 1440
        }
    })
);

// Cache all requests from multiple origins
workboxSW.router.registerRoute(/.*(?:gstatic)\.com.*$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: 'gstatic-cache'
    })
);