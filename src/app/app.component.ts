import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <h1>angular-demo</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/lazy">Lazy</a>
    <a routerLink="/lazy/nested">Lazy-Nested</a>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
