import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: false
})
export class ResumenPage implements OnInit {
  origen: string = '';
  destino: string = '';
  duracion: string = '';
  precio: string = '';
  salida: string = '';
  asientosSeleccionados: string = '';
  totalPagar: string = '';

  ngOnInit() {
  }

  // Constructor que recibe los parámetros de la ruta
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || '';
      this.destino = params['destino'] || '';
      this.duracion = params['duracion'] || '';
      this.precio = params['precio'] || '';
      this.salida = params['salida'] || '';
      this.asientosSeleccionados = params['asientos'] || '';
      // Calcular total
      if (this.precio && this.asientosSeleccionados) {
        const precioUnitario = parseInt(this.precio.replace(/[\$\.]/g, ''));
        const cantidad = this.asientosSeleccionados.split(',').filter(a => a.trim()).length;
        const total = precioUnitario * cantidad;
        this.totalPagar = '$' + total.toLocaleString('es-CL');
      } else {
        this.totalPagar = '-';
      }
    });
  }
}
