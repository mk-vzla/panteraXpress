import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.page.html',
  styleUrls: ['./reportar.page.scss'],
  standalone: false
})
export class ReportarPage implements OnInit {
  descripcion: string = '';
  foto: string | null = null;
  enviando: boolean = false;

  constructor() { }

  ngOnInit() {}

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.foto = image.dataUrl ?? null;
    } catch (err) {
      // Usuario canceló o error
    }
  }

  enviarReporte() {
    this.enviando = true;
    // Aquí iría la lógica para enviar el reporte
    setTimeout(() => {
      this.enviando = false;
      this.descripcion = '';
      this.foto = null;
      alert('¡Reporte enviado!');
    }, 1200);
  }
}
