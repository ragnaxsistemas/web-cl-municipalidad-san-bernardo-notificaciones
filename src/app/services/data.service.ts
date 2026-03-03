import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Cuando despliegues en AWS, cambia localhost por 3.140.205.250
  private API_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post(`${this.API_URL}/upload`, formData);
  }

  listar(tipo: string) {
    return this.http.get<any[]>(`${this.API_URL}/listar/${tipo}`);
  }

  listarCarpeta(tipo: string, carpeta: string) {
    return this.http.get<string[]>(`${this.API_URL}/listar/${tipo}/${carpeta}`);
  }

  descargar(tipo: string, carpeta: string, archivo: string) {
    const url = `${this.API_URL}/download/${tipo}/${carpeta}/${archivo}`;
    window.open(url, '_blank');
  }
}