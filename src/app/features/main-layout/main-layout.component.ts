import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="main-container">
      <header class="header">
        <div class="header-left">
          <h1 class="app-title">IMSB - Sistema de Generacion de Cartas - I. Municipalidad de San Bernardo</h1>
          
          <nav class="nav-menu">
            @if (perfilUsuario === 'operador') {
              <a routerLink="/operador" routerLinkActive="active-link" class="nav-link">📤 </a>
            }

            @if (perfilUsuario === 'ejecutivo' || perfilUsuario === 'administrador') {
              <a routerLink="/ejecutivo" routerLinkActive="active-link" class="nav-link">📊 Panel Ejecutivo</a>
            }
          </nav>
        </div>

        <div class="header-right">
          <span class="user-info">Perfil: <b>{{ perfilUsuario | uppercase }}</b></span>
          
          <img src="LogoEsquinaSuperiorIzquierda.png" alt="Logo Muni San Bernardo" class="muni-logo">
          
          <button (click)="logout()" class="logout-btn">Salir</button>
        </div>
      </header>

      <main class="content-body">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .main-container { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      display: flex; 
      flex-direction: column; 
      min-height: 100vh; 
    }
    
    .header { 
      background-color: #004a99; 
      color: white; 
      padding: 10px 25px; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.3); 
    }
    
    .header-left { display: flex; align-items: center; gap: 40px; }
    .app-title { margin: 0; font-size: 1.3em; letter-spacing: 1px; }
    
    .nav-menu { display: flex; gap: 15px; }
    .nav-link { 
      color: white; 
      text-decoration: none; 
      padding: 8px 15px; 
      border-radius: 5px; 
      font-weight: 500;
      transition: background 0.3s;
    }
    .nav-link:hover { background-color: rgba(255,255,255,0.15); }
    .active-link { 
      background-color: rgba(255,255,255,0.25); 
      border-bottom: 3px solid #ffcc00; /* Color distintivo San Bernardo */
    }
    
    .header-right { display: flex; align-items: center; gap: 20px; }
    .user-info { font-size: 0.85em; background: rgba(0,0,0,0.2); padding: 5px 10px; border-radius: 15px; }
    
    .muni-logo { height: 55px; width: auto; filter: drop-shadow(0px 0px 2px white); }
    
    .logout-btn { 
      background: #dc3545; 
      border: none; 
      color: white; 
      padding: 7px 15px; 
      cursor: pointer; 
      border-radius: 5px;
      font-weight: bold;
    }
    .logout-btn:hover { background-color: #c82333; }
    
    .content-body { flex: 1; background-color: #f8f9fa; padding: 20px; }
  `]
})
export class MainLayoutComponent implements OnInit {
  perfilUsuario: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtenemos el perfil al iniciar el componente
    this.perfilUsuario = sessionStorage.getItem('perfil');
  }

  logout() {
    // Limpiamos todo rastro de la sesión
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}