import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  usuario: string | null = null;

  constructor(private menu: MenuController, private router: Router) {
    this.usuario = localStorage.getItem('email');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.usuario = localStorage.getItem('email');
      }
    });
  }

  cerrarMenu() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.menu.close();
  }

  quitarFoco() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  exitNow(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.menu.close();
    localStorage.removeItem('email');
  }
}