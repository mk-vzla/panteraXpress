import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
  standalone: false
})
export class ResumenPage {
  origen = '';
  destino = '';
  duracion = '';
  precio = '';
  salida = '';
  fecha = '';
  asientosSeleccionados = '';
  totalPagar = '';
  llegadaFecha: Date = new Date();
  llegadaHora = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || '';
      this.destino = params['destino'] || '';
      this.duracion = params['duracion'] || '';
      this.precio = params['precio'] || '';
      this.salida = params['salida'] || '';
      this.fecha = params['fecha'] || '';
      this.asientosSeleccionados = params['asientos'] || '';

      this.calcularTotal();
      this.calcularLlegada();
    });
  }

  // Método para calcular el total a pagar
  private calcularTotal() {
    if (this.precio && this.asientosSeleccionados) {
      const precioUnitario = parseInt(this.precio.replace(/[\$\.]/g, ''));
      const cantidad = this.asientosSeleccionados.split(',').filter(a => a.trim()).length;
      const total = precioUnitario * cantidad;
      this.totalPagar = '$' + total.toLocaleString('es-CL');
    } else {
      this.totalPagar = '-';
    }
  }

  // Método para calcular la fecha y hora de llegada
  private calcularLlegada() {
    if (!this.fecha || !this.salida || !this.duracion) {
      this.llegadaFecha = new Date('');
      this.llegadaHora = '';
      return;
    }
    try {
      const [hora, minuto] = this.salida.split(':').map(Number);
      const fechaSalida = new Date(this.fecha);
      fechaSalida.setHours(hora, minuto, 0, 0);

      // Extraer horas y minutos de duración
      const match = this.duracion.match(/(\d+)h\s*(\d+)?m?/i);
      let horas = 0, minutos = 0;
      if (match) {
        horas = parseInt(match[1], 10);
        minutos = match[2] ? parseInt(match[2], 10) : 0;
      }

      // Sumar duración
      fechaSalida.setHours(fechaSalida.getHours() + horas);
      fechaSalida.setMinutes(fechaSalida.getMinutes() + minutos);

      this.llegadaFecha = fechaSalida;
      this.llegadaHora = fechaSalida.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      this.llegadaFecha = new Date('');
      this.llegadaHora = '';
    }
  }
}