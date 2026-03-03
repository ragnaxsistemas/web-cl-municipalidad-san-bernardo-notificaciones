import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operador-exito',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 50px;">
      <h2 style="color: green;">✔ Archivo Procesado con Éxito</h2>
      <p>El archivo ya se encuentra en el servidor de la Municipalidad.</p>
      <button (click)="volver()" style="padding: 10px 20px; cursor: pointer;">
        Volver a Cargar Otro Archivo
      </button>
    </div>
  `
})
export class OperadorExitoComponent {
  constructor(private router: Router) {}
  volver() { this.router.navigate(['/operador']); }
}