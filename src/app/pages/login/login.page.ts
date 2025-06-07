import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  toggleSeleccion: string = 'login'; // <-- Añadido para activar "Ingresar" por defecto

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();

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


  async conectarseLogin() {
    if (!this.email || !this.password) {
      this.mostrarAlerta('Por favor, completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.mostrarAlerta('Por favor, ingresa un email válido.');
      return;
    }

    if (this.password.length != 4 || /^\d{4}$/.test(this.password) === false) {
      this.mostrarAlerta('La contraseña deben ser: 4 NÚMEROS.');
      this.password = '';
      return;
    }
    // Si las validaciones están bien, conectarse
    console.log('CONECTANDO:', this.email);
    await this.mostrarToast('¡Conexión exitosa!');
    this.router.navigate(['/registro'], { state: { email: this.email } });
  }

  noConectarseLogin() {
    console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  }

  irARegistro() {
    this.router.navigate(['/registro']).then(() => { location.reload(); });
  }

  ngOnInit() {
  }

}