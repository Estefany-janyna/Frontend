import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leccion } from '../models/leccion.model';
import { Cuestionario } from '../models/cuestionario';
import { Usuario } from '../models/user.model';
import { DataLoginService } from './data-login.service';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {
    private apiUrl = 'http://localhost:4000/api/leccion';

    constructor(private http: HttpClient, private authService: DataLoginService) { }

    private getHttpOptions() {
        const headers = this.authService.getAuthorizationHeaders();
        return { headers };
    }

    
    getLecciones(): Observable<Leccion[]> {
        return this.http.get<Leccion[]>(`${this.apiUrl}/`, this.getHttpOptions());
      }
    
      getLeccionById(id: string): Observable<Leccion> {
        return this.http.get<Leccion>(`${this.apiUrl}/${id}`, this.getHttpOptions());
      }
    
      createLeccion(formData: FormData): Observable<Leccion> {
        return this.http.post<Leccion>(this.apiUrl, formData, this.getHttpOptions());
      }
    
      updateLeccion(id: string, leccion: Leccion): Observable<Leccion> {
        return this.http.put<Leccion>(`${this.apiUrl}/${id}`, leccion, this.getHttpOptions());
      }
    
      deleteLeccion(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
      }
    
      addCuestionariosToLeccion(id: string, CuestionarioIds: string[]): Observable<Leccion> {
        return this.http.post<Leccion>(`${this.apiUrl}/${id}/cuestionarios`, { CuestionarioIds }, this.getHttpOptions());
      }
    
      obtenerCuestionariosDeLeccion(id: string): Observable<Cuestionario[]> {
        return this.http.get<Cuestionario[]>(`${this.apiUrl}/${id}/cuestionarios`, this.getHttpOptions());
      }
    
      obtenerEstudiantes(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl}/estudiantes`, this.getHttpOptions());
      }
    
      eliminarCuestionario(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/cuestionario/${id}`, this.getHttpOptions());
      }
    
      bloquearEstudiante(id: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/bloquear-estudiante/${id}`, {}, this.getHttpOptions());
      }
    
      desbloquearEstudiante(id: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/desbloquear-estudiante/${id}`, {}, this.getHttpOptions());
      }
    
      subirCuestionario(id: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/subir-cuestionario`, { id }, this.getHttpOptions());
      }

      getLeccionesPorNivel(nivel: string): Observable<Leccion[]> {
        return this.http.get<Leccion[]>(`${this.apiUrl}/nivel/${nivel}`);
      }
}
