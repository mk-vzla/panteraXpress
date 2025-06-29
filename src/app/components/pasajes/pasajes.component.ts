import { Component, OnInit } from '@angular/core';
import { LocalDBService } from '../../services/local-db.service';

@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.component.html',
  styleUrls: ['./pasajes.component.scss'],
  standalone: false,
})
export class PasajesComponent implements OnInit {
  pasajes: any[] = [];

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
  }
}
