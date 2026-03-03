import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const isLogged = sessionStorage.getItem('usuario_logueado');
  const perfil = sessionStorage.getItem('perfil');

  // 1. Si no está logueado, al login siempre
  if (isLogged !== 'true') {
    router.navigate(['/login']);
    return false;
  }

  // 2. Control de Roles según la URL a la que intenta entrar
  const url = state.url;

  if (url.includes('/operador') && perfil !== 'operador') {
    alert('Acceso denegado: Solo para Operadores');
    router.navigate(['/ejecutivo']); // Redirige a su área permitida
    return false;
  }

  if (url.includes('/ejecutivo') && (perfil !== 'ejecutivo' && perfil !== 'administrador')) {
    alert('Acceso denegado: Solo para Ejecutivos/Administradores');
    router.navigate(['/operador']); // Redirige a su área permitida
    return false;
  }

  return true; // Si pasa las reglas, permite el acceso
};