import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

function registerServiceWorker(swName: string) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`/staging/${swName}.js`)
      .then(reg => {
        console.log('Successful service worker registration', reg);
      })
      .catch(err =>
        console.error('Service worker registration failed', err)
      );
  } else {
    console.error('Service Worker API is not supported in current browser');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: false })
    .then(() => { registerServiceWorker('service-worker') })
    .catch(err => console.error(err));
});
