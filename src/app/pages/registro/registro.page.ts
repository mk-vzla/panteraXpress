import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    telefono: ''
  };

  toggleSeleccion: string = 'register';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  // Método para mostrar una alerta genérica
  async mostrarAlerta(mensaje: string) {
    const alerta = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();
  }

  // Método para mostrar un toast de éxito
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
  registrarUsuario() {
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.rut || !this.usuario.email) {
      this.mostrarAlerta('Por favor, completa todos los campos obligatorios.');
      return;
    }
    // Validación simple de RUT (puedes mejorarla)
    if (!/^\d{7,8}-[0-9kK]$/.test(this.usuario.rut)) {
      this.mostrarAlerta('El RUT debe tener el formato 12345678-9');
      return;
    }
    // Validación simple de email
    if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(this.usuario.email)) {
      this.mostrarAlerta('El email no es válido.');
      return;
    }
    // Si pasa validaciones
    this.mostrarToast('¡Registro exitoso!');
    this.router.navigate(['/login'], { state: { email: this.usuario.email } });
  }

  ngOnInit() {

  }

  // Método para navegar a la página de inicio de sesión
  irALogin() {
    this.router.navigate(['/login']).then(() => { location.reload(); });
  }



}
