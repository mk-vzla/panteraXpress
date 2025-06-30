import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDBService {
  public bd!: SQLiteObject;
  // Observable para rastrear si la base de datos está lista
  public bdLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.inicializarBaseDatos();
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


  private inicializarBaseDatos() {
    this.sqlite.create({
      name: 'tarea.db',
      location: 'default'
    }).then((bd: SQLiteObject) => {
      this.bd = bd;
      this.crearTablas();
      this.bdLista.next(true);
      //this.mostrarToast('Base de datos inicializada correctamente');
    }).catch(error => {
      console.error('Error al inicializar la base de datos', error);
    })
  }

  private crearTablas() {
    // Tabla datos_usuario (debe crearse primero por la foreign key)
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS datos_usuario (
        nombre TEXT(15),
        apellido TEXT(15),
        usuario_rut TEXT(10) PRIMARY KEY,
        usuario_email TEXT(30) UNIQUE,
        contrasena TEXT(15),
        telefono TEXT(12)
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla datos_usuario creada correctamente'))
      .catch(error => this.mostrarToast('Error al crear la tabla datos_usuario'));

    // Tabla sesion_data: user_email_session es PRIMARY KEY y FOREIGN KEY de datos_usuario.usuario_email
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS sesion_data (
        user_email_session TEXT(30) PRIMARY KEY,
        active_session INTEGER(1) DEFAULT 0 NOT NULL
      )`, []
    )
      //.then(() => this.mostrarToast('Tabla sesion_data creada correctamente'))
      .catch(error => this.mostrarToast('Error al crear la tabla sesion_data'));

    // Tabla resumen_viaje
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS resumen_viaje (
        id_pasaje TEXT PRIMARY KEY,
        origen TEXT(25),
        destino TEXT(25),
        salida TEXT(5),
        asientos TEXT(100)
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla resumen_viaje creada correctamente'))
      .catch(error => this.mostrarToast('Error al crear la tabla resumen_viaje'));
  }


  // Insertar usuario:
  async insertarUsuario(nombre: string, apellido: string, rut: string, email: string, contrasena: string, telefono: string) {
    try {
      const emailLower = email.toLowerCase();
      await this.bd.executeSql(
        `INSERT INTO datos_usuario (nombre, apellido, usuario_rut, usuario_email, contrasena, telefono)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, rut, emailLower, contrasena, telefono]
      );
      this.mostrarToast('Usuario registrado correctamente');
    } catch (error) {
      this.mostrarToast('Error al registrar el usuario');
      console.error('Error al registrar el usuario', error);
    }
  }

  // Validar usuario:
  async validarUsuario(usuario_email: string, contrasena: string) {
    return this.bd.executeSql(
      `SELECT * FROM datos_usuario WHERE usuario_email = ? AND contrasena = ?`,
      [usuario_email, contrasena]
    ).then(async res => {
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0);
        localStorage.setItem('email', usuario.usuario_email);
        // Crear o actualizar el registro de sesión activa
        await this.bd.executeSql(
          `INSERT OR REPLACE INTO sesion_data (user_email_session, active_session)
           VALUES (?, 1)`,
          [usuario.usuario_email]
        );
        this.mostrarToast('Inicio de sesión exitoso');
        return usuario; // retorna el usuario encontrado
      } else {
        this.mostrarToast('Credenciales incorrectas');
        return null;
      }
    }).catch(error => {
      this.mostrarToast('Error al iniciar sesión: ' + error.message);
      return null;
    });
  }


  getIsBDReady() {
    return this.bdLista.asObservable();
  }

}
