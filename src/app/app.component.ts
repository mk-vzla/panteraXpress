import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { LocalDBService } from './services/local-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  usuario: string | null = null;

  constructor(private menu: MenuController, private router: Router, private toastController: ToastController
    , private localDBService: LocalDBService // Inyecta el servicio de base de datos local
  ) {
    this.usuario = localStorage.getItem('email');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.usuario = localStorage.getItem('email');
      }
    });
  }

    async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
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

  async exitNow(): Promise<void> {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.menu.close();
    localStorage.removeItem('email');
    await this.mostrarToast('Conexión Cerrada ');
  }
}