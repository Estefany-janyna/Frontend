// services/progreso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataLoginService } from './data-login.service';
import { CrearJuegoService } from './crear-juego.service';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private apiUrl = `http://localhost:4000/api/progreso`;

  constructor(private http: HttpClient, private authService: DataLoginService) { }

  private getHttpOptions() {
      const headers = this.authService.getAuthorizationHeaders();
      return { headers };
  }

  getProgresoPorEstudiante(estudianteId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudiante/${estudianteId}`, this.getHttpOptions());
  }

  // actualizarProgreso(id: string, progreso: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, progreso, this.getHttpOptions());
  // }

  // actualizarProgreso(estudianteId: string, leccionId: string): Observable<any> {
  //   const body = { estudianteId, leccionId };
  //   return this.http.put<any>(`${this.apiUrl}`, body, this.getHttpOptions());
  // }
  actualizarProgreso(id: string, progreso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, progreso, this.getHttpOptions());
  }

  getCuestionarios(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(`http://localhost:4000/api/cuestionario`, this.getHttpOptions());
  }
}
