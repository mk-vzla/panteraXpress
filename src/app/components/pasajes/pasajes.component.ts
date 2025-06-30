import { Component, OnInit, ViewChildren, ElementRef, QueryList, Output, EventEmitter } from '@angular/core';
import { LocalDBService } from '../../services/local-db.service';
import * as QRCode from 'qrcode-generator';

@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.scss'],
  standalone: false,
})
export class PasajesComponent implements OnInit {
  pasajes: any[] = [];
  @ViewChildren('qrCanvas') qrCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;
  modalQRVisible = false;
  pasajeQR: any = null;
  pasajeQRIndex: number | null = null;

  @Output() irAMapa = new EventEmitter<{origen: string, destino: string}>();

  constructor(private localDB: LocalDBService) { }

  ngOnInit() {
    this.cargarPasajes();
  }

  cargarPasajes() {
    this.localDB.bd.executeSql('SELECT * FROM resumen_viaje', []).then(res => {
      this.pasajes = [];
      for (let i = res.rows.length - 1; i >= 0; i--) {
        this.pasajes.push(res.rows.item(i));
      }
    }).catch(err => {
      console.error('Error al cargar pasajes', err);
      this.pasajes = [];
    });
  }

  guardarOrigenDestino(pasaje: any) {
    localStorage.setItem('origenSeleccionado', pasaje.origen);
    localStorage.setItem('destinoSeleccionado', pasaje.destino);
    this.irAMapa.emit({origen: pasaje.origen, destino: pasaje.destino});
  }

  mostrarQRModal(pasaje: any, index: number) {
    // Asigna el pasaje y el índice seleccionados para mostrar el QR
    this.pasajeQR = pasaje;
    this.pasajeQRIndex = index;
    // Espera a que el canvas esté en el DOM antes de generar el QR
    setTimeout(() => {
      const canvasRef = this.qrCanvases.toArray()[index];
      // Si se encuentra el canvas, genera el QR
      if (canvasRef) {
        // Prepara los datos que se codificarán en el QR
        const qrData = JSON.stringify({
          id_pasaje: pasaje.id_pasaje,
          origen: pasaje.origen,
          destino: pasaje.destino,
          salida: pasaje.salida,
          asientos: pasaje.asientos
        });
        this.generarQR(qrData, canvasRef.nativeElement);
      }
    }, 100);
  }

  cerrarQRModal() {
    // Cierra el modal del QR
    this.pasajeQR = null;
    this.pasajeQRIndex = null;
  }

  generarQR(data: string, canvas?: HTMLCanvasElement) {
    // Obtiene el canvas destino
    const targetCanvas = canvas || (this.qrCanvases.first && this.qrCanvases.first.nativeElement);
    if (!targetCanvas) return;
    // Obtiene el contexto 2D del canvas
    const ctx = targetCanvas.getContext('2d');
    const size = 256;
    if (!ctx) return;
    // Limpia el canvas y pinta el fondo
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#fffbe6';
    ctx.fillRect(0, 0, size, size);
    // Instancia el generador de QR compatible con ambos tipos de export
    const qr = (QRCode as any).default ? (QRCode as any).default(0, 'L') : (QRCode as any)(0, 'L');
    // Agrega los datos al QR
    qr.addData(data);
    // Genera la matriz del QR
    qr.make();
    // Calcula el tamaño de cada celda del QR
    const tileW = size / qr.getModuleCount();
    const tileH = size / qr.getModuleCount();
    // Dibuja el QR en el canvas
    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        ctx.fillStyle = qr.isDark(row, col) ? '#000000' : '#ffffff';
        ctx.fillRect(col * tileW, row * tileH, tileW, tileH);
      }
    }
  }
}
