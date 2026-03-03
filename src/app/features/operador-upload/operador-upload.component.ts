import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-operador-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; position: relative;">
      <h2>Carga de Archivos Excel</h2>
      <input type="file" (change)="select($event)" accept=".xlsx, .xls">
      <button [disabled]="!file || cargando" (click)="subir()">
        {{ cargando ? 'Enviando...' : 'Enviar al Servidor' }}
      </button>
      
      <p style="color: red;">{{msg}}</p>

      @if (cargando) {
        <div style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.8); display: flex; 
          flex-direction: column; align-items: center; justify-content: center;
          z-index: 9999;">
          
          <img src="loading_imsb.gif" alt="Cargando..." style="width: 150px;">
          <p>Procesando archivo, por favor espere...</p>
        </div>
      }
    </div>
  `
})
export class OperadorUploadComponent {
  file: any; 
  msg = '';
  cargando = false; // Controla la visibilidad del GIF

  constructor(private ds: DataService, private router: Router) {}

  select(e: any) { 
    this.file = e.target.files[0]; 
    this.msg = ''; 
  }

  subir() {
    if (!this.file) return;

    this.cargando = true; // Activa el GIF inmediatamente
    
    // Usamos .pipe(delay(2000)) para forzar la espera
    this.ds.uploadFile(this.file).pipe(delay(2000)).subscribe({
      next: (response) => {
        this.cargando = false; 
        this.router.navigate(['/operador/exito']);
      },
      error: (err) => {
        this.cargando = false; 
        this.msg = 'Error al subir el archivo.';
        console.error(err);
      }
    });
  }
}