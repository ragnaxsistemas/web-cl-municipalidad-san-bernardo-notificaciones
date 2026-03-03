import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { OperadorUploadComponent } from './features/operador-upload/operador-upload.component';
import { EjecutivoDashboardComponent } from './features/ejecutivo-dashboard/ejecutivo-dashboard.component';
import { OperadorExitoComponent } from './features/operador-exito/operador-exito.component';

export const routes: Routes = [
  // Ruta para el Login (sin el panel principal)
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // <--- ¡Esto protege todas las rutas hijas!
    children: [
      { path: 'operador', component: OperadorUploadComponent },
      { path: 'operador/exito', component: OperadorExitoComponent },
      { path: 'ejecutivo', component: EjecutivoDashboardComponent },
      { path: '', redirectTo: 'operador', pathMatch: 'full' }
    ]
  },
  // Rutas protegidas (dentro del panel principal)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'operador', component: OperadorUploadComponent },
      { path: 'operador/exito', component: OperadorExitoComponent },
      { path: 'ejecutivo', component: EjecutivoDashboardComponent },
      // Redirección por defecto al entrar
      { path: '', redirectTo: 'operador', pathMatch: 'full' }
    ]
  },

  // Atrapa-todo: si la ruta no existe, va al login
  { path: '**', redirectTo: 'login' }
];