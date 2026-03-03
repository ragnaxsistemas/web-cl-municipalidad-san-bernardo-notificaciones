import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importa esto
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="main-container" style="background-color: #004a99; width: 100%; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
      <header class="header" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 25px; min-height: 65px;">
        
        <div class="header-left">
          <h1 class="app-title" style="color: white; margin: 0; font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 1.4rem; font-weight: bold;">
            Sistema de Generacion de Cartas
          </h1>
        </div>

        <div class="header-right">
          <img src="LogoEsquinaSuperiorIzquierda.png" 
               alt="Logo Muni San Bernardo" 
               class="muni-logo" 
               style="height: 45px; width: auto; filter: brightness(0) invert(1);"> 
        </div>

      </header>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6;">
      <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px;">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #004a99; margin-bottom: 10px;">Iniciar Sesión</h2>
          <p style="color: #666;">Ingrese sus credenciales para acceder</p>
        </div>

        <form (submit)="login()">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Usuario</label>
            <input type="text" [(ngModel)]="username" name="username" 
                   style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;" 
                   placeholder="Ej: admin" required>
          </div>

          <div style="margin-bottom: 25px;">
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Contraseña</label>
            <input type="password" [(ngModel)]="password" name="password" 
                   style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;" 
                   placeholder="••••••••" required>
          </div>

          <button type="submit" 
                  style="width: 100%; background: #004a99; color: white; border: none; padding: 12px; border-radius: 5px; font-size: 1.1em; cursor: pointer; font-weight: bold; transition: background 0.3s;"
                  onmouseover="this.style.background='#003366'" 
                  onmouseout="this.style.background='#004a99'">
            Entrar al Sistema
          </button>
        </form>

        <p *ngIf="errorMessage" style="color: #dc3545; text-align: center; margin-top: 20px; font-weight: bold;">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  error = '';
  constructor(private router: Router) {}

  login() {
  // Limpiamos errores previos
  this.error = '';

  // 1. Validación Usuario Operador
  if (this.username === 'operadorIMuniSanBernardo1' && this.password === 'e#NV7!t6V918') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'operador'); // Guardamos el perfil por si lo necesitas
    this.router.navigate(['/operador']);
  } 
  
  // 2. Validación Usuario Ejecutivo
  else if (this.username === 'ejecutivoIMuniSanBernardo1' && this.password === '1k7#UR!9#Ad') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'ejecutivo');
    this.router.navigate(['/ejecutivo']);
  } 
  
  // 3. Validación Usuario Administrador (También va a Ejecutivo según tu requerimiento)
  else if (this.username === 'administradorIMuniSanBernardo1' && this.password === '5K7$51$S$Qpt') {
    sessionStorage.setItem('usuario_logueado', 'true');
    sessionStorage.setItem('perfil', 'administrador');
    this.router.navigate(['/ejecutivo']);
  } 
  
  // 4. Credenciales incorrectas
  else {
    this.error = 'Usuario o contraseña incorrecta. Por favor, intente de nuevo.';
    // Opcional: limpiar los campos para seguridad
    this.password = ''; 
  }
}
}