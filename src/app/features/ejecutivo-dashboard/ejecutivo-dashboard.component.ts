import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el selector de cantidad
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ejecutivo-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejecutivo-dashboard.component.html'
})
export class EjecutivoDashboardComponent {
  tipoActual = '';
  carpetaSeleccionada = '';
  
  carpetas: string[] = [];
  carpetasFiltradas: string[] = [];
  
  archivos: string[] = [];
  archivosFiltrados: string[] = [];
  
  // Configuración de visualización
  paginaActual = 0;
  pageSize = 100; // Valor por defecto
  terminoBusqueda = '';

  constructor(private dataService: DataService) {}

  onTipoChange(event: any) {
    const tipo = event.target.value;
    if (!tipo) return;
    
    this.tipoActual = tipo;
    this.carpetaSeleccionada = '';
    this.paginaActual = 0;
    this.dataService.listar(tipo).subscribe({
  next: (res: any) => {
    // Extraemos el array 'carpetas' del objeto JSON que recibimos
    this.carpetas = res.carpetas || []; 
    this.carpetasFiltradas = [...this.carpetas];
    this.paginaActual = 0;
  },
  error: (err) => {
    console.error('Error:', err);
    this.carpetas = [];
    this.carpetasFiltradas = [];
  }
});
  }

  verCarpeta(nombre: string) {
    this.carpetaSeleccionada = nombre;
    this.paginaActual = 0;
    this.terminoBusqueda = '';

    this.dataService.listarCarpeta(this.tipoActual, nombre).subscribe({
      next: (res: any) => {
        this.archivos = res.archivos || [];
        this.archivosFiltrados = [...this.archivos];
        
        // Si el tamaño de página actual es mayor al total de archivos, 
        // bajamos a 100 o 10 para que la vista sea cómoda
        if (this.pageSize > this.archivosFiltrados.length && this.archivosFiltrados.length > 0) {
            // Si tiene pocos archivos, ajustamos el selector automáticamente
            this.pageSize = this.archivosFiltrados.length > 10 ? 100 : 10;
        }
      }
    });
  }

  filtrar(event: any) {
    this.terminoBusqueda = event.target.value.toLowerCase();
    this.paginaActual = 0;

    if (!this.carpetaSeleccionada) {
      this.carpetasFiltradas = this.carpetas.filter(c => 
        c.toLowerCase().includes(this.terminoBusqueda)
      );
    } else {
      this.archivosFiltrados = this.archivos.filter(a => 
        a.toLowerCase().includes(this.terminoBusqueda)
      );
    }
  }

  // Lógica de Paginación Dinámica
  get carpetasPaginadas() {
    const inicio = this.paginaActual * this.pageSize;
    return this.carpetasFiltradas.slice(inicio, inicio + this.pageSize);
  }

  get archivosPaginados() {
    const inicio = this.paginaActual * this.pageSize;
    return this.archivosFiltrados.slice(inicio, inicio + this.pageSize);
  }

  esUltimaPagina(): boolean {
    const total = this.carpetaSeleccionada ? this.archivosFiltrados.length : this.carpetasFiltradas.length;
    return (this.paginaActual + 1) * this.pageSize >= total;
  }

  cambiarPagina(delta: number) {
    this.paginaActual += delta;
    window.scrollTo(0, 0); // Vuelve arriba al cambiar página
  }

  volver() {
    this.carpetaSeleccionada = '';
    this.archivos = [];
    this.archivosFiltrados = [];
    this.paginaActual = 0;
  }

  descargar(archivo: string) {
    this.dataService.descargar(this.tipoActual, this.carpetaSeleccionada, archivo);
  }

  // Agrega esta función dentro de tu clase EjecutivoDashboardComponent
  obtenerTotal(): number {
  // Si estamos dentro de una carpeta, el total es de archivos filtrados
  if (this.carpetaSeleccionada) {
    return this.archivosFiltrados.length;
  }
  // Si estamos en la raíz del tipo, el total es de carpetas filtradas
  return this.carpetasFiltradas.length;
}
}