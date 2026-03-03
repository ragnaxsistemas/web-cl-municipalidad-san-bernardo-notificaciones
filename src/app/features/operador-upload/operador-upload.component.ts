import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importante para el logout
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-operador-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
  
    <div style="padding: 40px; font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: auto;">
      <div style="background: #f8f9fa; border: 2px dashed #004a99; border-radius: 10px; padding: 30px; text-align: center;">
        <h2 style="color: #004a99; margin-top: 0;">Carga de Archivos Excel</h2>
        <p style="color: #666;">Seleccione el archivo de consolidado para procesar en el servidor.</p>
        
        <div style="margin: 20px 0;">
          <input type="file" (change)="select($event)" accept=".xlsx, .xls" style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; background: white;">
        </div>

        <button [disabled]="!file || cargando" (click)="subir()" 
                [style.background]="!file || cargando ? '#ccc' : '#28a745'"
                style="color: white; border: none; padding: 12px 30px; border-radius: 5px; font-size: 1.1em; cursor: pointer;">
          {{ cargando ? '🚀 Enviando...' : '📤 Enviar al Servidor' }}
        </button>
        
        <p *ngIf="msg" style="color: red; margin-top: 15px; font-weight: bold;">{{msg}}</p>
      </div>

      @if (cargando) {
      <div style="
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
        background: rgba(0, 74, 153, 0.7); /* Azul San Bernardo con transparencia */
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center;
        z-index: 99999; /* Super alto para que tape todo */
        backdrop-filter: blur(5px); /* Efecto de desenfoque al fondo */
      ">
        
        <div style="
          background: white; 
          padding: 30px; 
          border-radius: 15px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          text-align: center;
        ">
          <img src="loading_imsb.gif" alt="Cargando..." style="width: 100px; margin-bottom: 15px;">
          <h3 style="color: #004a99; margin: 0;">Procesando Datos</h3>
          <p style="color: #666;">Por favor, no cierre la ventana...</p>
          
          <div style="width: 200px; height: 6px; background: #eee; border-radius: 10px; margin: 15px auto; overflow: hidden;">
            <div class="progress-bar-animation" style="height: 100%; background: #004a99; width: 50%;"></div>
          </div>
        </div>
      </div>
}
    </div>
  `
})
export class OperadorUploadComponent {
  file: File | null = null;
  msg: string = '';
  cargando: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router // Inyectamos el router
  ) {}

  // --- FUNCIÓN QUE FALTABA ---
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  select(event: any) {
    this.file = event.target.files[0];
    this.msg = '';
  }

  // operador-upload.component.ts

subir() {
  if (!this.file) return;

  // 1. Iniciamos el estado de carga
  this.cargando = true;
  this.msg = '';
  
  // Guardamos el momento en que empezamos
  const tiempoInicio = Date.now();

  this.dataService.subirExcel(this.file).subscribe({
    next: (res: any) => {
      // 2. Calculamos cuánto ha pasado
      const tiempoTranscurrido = Date.now() - tiempoInicio;
      const tiempoRestante = Math.max(0, 2000 - tiempoTranscurrido);

      // 3. Esperamos lo que falte para completar los 2 segundos
      setTimeout(() => {
        this.msg = '✅ Archivo procesado correctamente.';
        this.cargando = false;
        this.file = null;
      }, tiempoRestante);
    },
    error: (err: any) => {
      // En caso de error, también esperamos para que no sea un salto brusco
      setTimeout(() => {
        this.msg = '❌ Error al subir el archivo.';
        this.cargando = false;
        console.error(err);
      }, 1000);
    }
  });
}
}