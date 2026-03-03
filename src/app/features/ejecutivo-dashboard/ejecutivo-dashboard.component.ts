import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importante para el logout
import { DataService } from '../../services/data.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-ejecutivo-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejecutivo-dashboard.component.html',
  styleUrls: ['./ejecutivo-dashboard.component.css']
})
export class EjecutivoDashboardComponent implements OnInit {
  // Variables de datos
  carpetas: string[] = [];
  archivos: string[] = [];
  tipoActual: string = '';
  carpetaSeleccionada: string = '';
  
  // Variables de filtrado y paginación
  filtro: string = '';
  paginaActual: number = 0;
  pageSize: number = 10;

  constructor(
    private dataService: DataService,
    private router: Router // Inyectamos el router aquí
  ) {}

  ngOnInit(): void {}

  // --- FUNCIÓN QUE FALTABA ---
  logout() {
    localStorage.clear(); // Limpia datos de sesión
    this.router.navigate(['/login']); // Redirige al login
  }

  // --- LÓGICA DE CARPETAS ---
  onTipoChange(event: any) {
  this.tipoActual = event.target.value;
  this.carpetaSeleccionada = '';
  this.paginaActual = 0;
  this.archivos = []; // Limpiamos archivos previos
  this.carpetas = []; // Limpiamos carpetas previas

  if (this.tipoActual) {
    this.dataService.listarCarpetas(this.tipoActual).subscribe(res => {
      // Si el backend devuelve archivos directamente (como en 'upload')
      if (res.archivos && res.archivos.length > 0 && this.tipoActual === 'upload') {
        this.archivos = res.archivos;
        this.carpetaSeleccionada = 'Raíz'; // Marcamos como seleccionada para mostrar la tabla de archivos
      } else {
        this.carpetas = res.carpetas;
      }
    });
  }
}

  verCarpeta(nombre: string) {
    this.carpetaSeleccionada = nombre;
    this.paginaActual = 0;
    this.dataService.listarArchivos(this.tipoActual, nombre).subscribe(res => {
      this.archivos = res.archivos;
    });
  }

  volver() {
    this.carpetaSeleccionada = '';
    this.archivos = [];
    this.paginaActual = 0;
  }

  descargar(archivo: string) {
  // Si la carpeta es 'Raíz', significa que el archivo está directo en el tipo (ej: upload/archivo.xlsx)
  if (this.carpetaSeleccionada === 'Raíz') {
    this.dataService.descargarArchivoDirecto(this.tipoActual, archivo);
  } else {
    this.dataService.descargarArchivo(this.tipoActual, this.carpetaSeleccionada, archivo);
  }
}

  // --- LÓGICA DE PAGINACIÓN Y FILTRADO ---
  get carpetasFiltradas() {
    return this.carpetas.filter(c => c.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  get carpetasPaginadas() {
    const inicio = this.paginaActual * this.pageSize;
    return this.carpetasFiltradas.slice(inicio, inicio + this.pageSize);
  }

  get archivosFiltrados() {
    return this.archivos.filter(a => a.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  get archivosPaginados() {
    const inicio = this.paginaActual * this.pageSize;
    return this.archivosFiltrados.slice(inicio, inicio + this.pageSize);
  }

  obtenerTotal() {
    return this.carpetaSeleccionada ? this.archivosFiltrados.length : this.carpetasFiltradas.length;
  }

  filtrar(event: any) {
    this.filtro = event.target.value;
    this.paginaActual = 0;
  }

  cambiarPagina(delta: number) {
    this.paginaActual += delta;
  }

  esUltimaPagina() {
    const total = this.obtenerTotal();
    return (this.paginaActual + 1) * this.pageSize >= total;
  }
}