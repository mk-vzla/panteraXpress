import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LocalDBService } from '../../../services/local-db.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
  standalone: false,
})
export class ResumenComponent implements OnChanges {
  @Input() origen = '';
  @Input() destino = '';
  @Input() duracion = '';
  @Input() precio = '';
  @Input() salida = '';
  @Input() fecha = '';
  @Input() asientosSeleccionados = '';

  totalPagar = '';
  llegadaFecha: Date = new Date();
  llegadaHora = '';

  constructor(private localDB: LocalDBService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.calcularTotal();
    this.calcularLlegada();
  }

  onPagar() {
    const confirmado = window.confirm('¿Ha realizado el pago?');
    if (confirmado) {
      // Generar id_pasaje alfanumérico de 20 caracteres
      const id_pasaje = Array.from({length: 20}, () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return chars.charAt(Math.floor(Math.random() * chars.length));
      }).join('');
      // Guardar en la BD local
      this.localDB.bd.executeSql(
        `INSERT INTO resumen_viaje (id_pasaje, origen, destino, salida, asientos) VALUES (?, ?, ?, ?, ?)`,
        [id_pasaje, this.origen, this.destino, this.salida, this.asientosSeleccionados]
      ).then(() => {
        this.localDB['mostrarToast']('COMPRA REALIZADA CON ÉXITO');
        // Guardar origen y destino en localStorage
        localStorage.setItem('origenSeleccionado', this.origen);
        localStorage.setItem('destinoSeleccionado', this.destino);
        // Cambiar segmento a 'resumen' para mostrar pasajes
        window.dispatchEvent(new CustomEvent('abrirPasajesSegmento'));
      }).catch(err => {
        this.localDB['mostrarToast']('Error al guardar el resumen de viaje');
        console.error('Error al guardar resumen_viaje', err);
      });
    }
  }

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
      const match = this.duracion.match(/(\d+)h\s*(\d+)?m?/i);
      let horas = 0, minutos = 0;
      if (match) {
        horas = parseInt(match[1], 10);
        minutos = match[2] ? parseInt(match[2], 10) : 0;
      }
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
