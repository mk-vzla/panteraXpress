import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsientosBusService {
  asientos: boolean[] = Array(36).fill(false); // false = libre, true = ocupado

  obtenerAsientos() {
    return this.asientos;
  }

  asignarAsiento(indice: number, ocupado: boolean) {
    if (indice >= 0 && indice < this.asientos.length) {
      this.asientos[indice] = ocupado;
    }
  }

  reiniciarAsientos() {
    this.asientos = Array(36).fill(false);
  }
}


// import { AsientosBusService } from '../services/asientos-bus.service';

// constructor(private asientosBusService: AsientosBusService) {}

// // Obtener todos los asientos
// const asientos = this.asientosBusService.obtenerAsientos();

// // Marcar un asiento como ocupado
// this.asientosBusService.asignarAsiento(5, true);

// // Reiniciar todos los asientos
// this.asientosBusService.reiniciarAsientos();