import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LocalDBService } from '../../services/local-db.service'; // Importa el servicio de base de datos local

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  toggleSeleccion: string = 'login'; // <-- Añadido para activar Ingresar por defecto

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private localDBService: LocalDBService // Inyecta el servicio de base de datos local
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

  // Método para cambiar entre "Ingresar" y "Registrarse"
  async conectarseLogin() {
    if (!this.email || !this.password) {
      this.mostrarToast('Por favor, completa todos los campos.');
      return;
    }

    this.email = this.email.trim();
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
    // Quitar el foco del elemento activo antes de navegar
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Si las validaciones están bien, conectarse

    try {
      const usuario = await this.localDBService.validarUsuario(this.email, this.password);
      if (usuario) {
        console.log('CONECTANDO:', this.email);
        await this.mostrarToast('Conexión exitosa: ' + this.email);
        localStorage.setItem('email', this.email); // Guarda el email en localStorage
        this.router.navigate(['/home'], { state: { email: this.email } });
      } else {
        //this.mostrarAlerta('Usuario o contraseña incorrectos.');
        this.password = '';
      }
    } catch (error) {
      const errorMsg = (error instanceof Error) ? error.message : String(error);
      this.mostrarAlerta('Error al conectarse. ' + errorMsg);
    }
  }

  // // Método para no conectarse, solo mostrar en consola
  // noConectarseLogin() {
  //   console.log('NO CONECTANDO, MOSTRANDO EN CONSOLA');
  // }

  // Método para cambiar entre "Ingresar" y "Registrarse"
  irARegistro() {
    this.router.navigate(['/registro']).then(() => { location.reload(); });
  }

  // Método para cambiar entre "Ingresar" y "Registrarse"
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['email']) {
      this.email = navigation.extras.state['email'];
    }
  }

  onEmailChange(value: string) {
    this.email = value.toLowerCase();
  }

}