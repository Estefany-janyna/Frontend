import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cuestionario } from '../models/cuestionario';
import { Leccion } from '../models/leccion.model'; // Asegúrate de importar el modelo de Lección

@Injectable({
    providedIn: 'root'
})
export class CrearJuegoService {
    // url = 'http://localhost:4000/api/cuestionario';

    // constructor(private http: HttpClient) { }
    // getCuestionario(): Observable<Cuestionario[]> {
    //     return this.http.get<Cuestionario[]>(this.url);
        
    // }

    // addCuestionario(cuestionarioData: FormData): Observable<any> {
    //     return this.http.post<any>(this.url, cuestionarioData)
    // }
    // deleteCuestionario(id: string): Observable<any> {
    //     return this.http.delete<any>(`${this.url}/${id}`);
    // }
    
    // updateCuestionario(cuestionario: Cuestionario): Observable<any> {
    //     return this.http.put<any>(`${this.url}/${cuestionario._id}`, cuestionario);
    // }
    // addCuestionarioToLeccion(leccionId: string, formData: FormData): Observable<any> {
    //     return this.http.post(`${this.url}/leccion/${leccionId}/cuestionarios`, formData);
    //   }

    private apiUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) { }
  
    getCuestionario(): Observable<Cuestionario[]> {
      return this.http.get<Cuestionario[]>(`${this.apiUrl}/cuestionario`);
    }
  
    addCuestionario(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/cuestionario`, formData);
    }
  
    addCuestionarioToLeccion(leccionId: string, formData: FormData): Observable<any> {
      formData.append('leccionId', leccionId);
      return this.http.post(`${this.apiUrl}/cuestionario`, formData);
    }
  
    deleteCuestionario(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/cuestionario/${id}`);
    }
    updateCuestionario(id: string, formData: FormData): Observable<any> {
        return this.http.put(`${this.apiUrl}/cuestionario/${id}`, formData);
    }
    getCuestionarioById(id: string): Observable<Cuestionario> {
        return this.http.get<Cuestionario>(`${this.apiUrl}/cuestionario/${id}`);
      }

      enviarRespuestaCuestionario(payload: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/cuestionario/enviar-respuesta`, payload);
      }
    
      obtenerResultadosCuestionario(cuestionarioId: string, estudianteId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/resultados/${cuestionarioId}/${estudianteId}`);
      }

      obtenerResultadosUsuario(estudianteId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/resultados-usuario/${estudianteId}`);
      }
// 
  // Añadir este método
  getLeccionById(id: string): Observable<Leccion> {
    return this.http.get<Leccion>(`${this.apiUrl}/leccion/${id}`);
}
}