import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Función para subir el Excel
  subirExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post(`${this.url}/upload`, formData);
  }

  // Listar carpetas
  listarCarpetas(tipo: string): Observable<any> {
    return this.http.get(`${this.url}/listar/${tipo}`);
  }

  // Listar archivos
  listarArchivos(tipo: string, carpeta: string): Observable<any> {
    return this.http.get(`${this.url}/listar/${tipo}/${carpeta}`);
  }

  // Descargar (abre en pestaña nueva)
  descargarArchivo(tipo: string, carpeta: string, archivo: string): void {
    window.open(`${this.url}/download/${tipo}/${carpeta}/${archivo}`, '_blank');
  }

  descargarArchivoDirecto(tipo: string, archivo: string): void {
  // Llama a la nueva ruta simplificada del backend
  window.open(`${this.url}/download/${tipo}/${archivo}`, '_blank');
}
}