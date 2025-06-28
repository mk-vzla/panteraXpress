import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable ({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private router: Router) {}

  canActivate(): boolean {
    const email = localStorage.getItem('email');
    const sesionActiva = email !== null && email !== '';
    if (sesionActiva) {
      return true; // Permitir el acceso si la sesión está activa
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay sesión activa
      return false; // Bloquear el acceso
    }
  }
}