import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="padding: 20px;">
      <h2>Login Municipalidad San Bernardo</h2>
      <input [(ngModel)]="user" placeholder="Usuario"><br><br>
      <input [(ngModel)]="pass" type="password" placeholder="Contraseña"><br><br>
      <button (click)="entrar()">Entrar</button>
      <p style="color:red" *ngIf="error">{{error}}</p>
      @if (error) {
        <p style="color:red">{{error}}</p>
      }
    </div>
  `
})
export class LoginComponent {
  user = ''; pass = ''; error = '';
  constructor(private router: Router) {}

  entrar() {
  // Limpiamos errores previos
  this.error = '';

  // 1. Validación Usuario Operador
  if (this.user === 'operadorIMuniSanBernardo1' && this.pass === 'e#NV7!t6V918') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'operador'); // Guardamos el perfil por si lo necesitas
    this.router.navigate(['/operador']);
  } 
  
  // 2. Validación Usuario Ejecutivo
  else if (this.user === 'ejecutivoIMuniSanBernardo1' && this.pass === '1k7#UR!9#Ad') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'ejecutivo');
    this.router.navigate(['/ejecutivo']);
  } 
  
  // 3. Validación Usuario Administrador (También va a Ejecutivo según tu requerimiento)
  else if (this.user === 'administradorIMuniSanBernardo1' && this.pass === '5K7$51$S$Qpt') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'administrador');
    this.router.navigate(['/ejecutivo']);
  } 
  
  // 4. Credenciales incorrectas
  else {
    this.error = 'Usuario o contraseña incorrecta. Por favor, intente de nuevo.';
    // Opcional: limpiar los campos para seguridad
    this.pass = ''; 
  }
}
}