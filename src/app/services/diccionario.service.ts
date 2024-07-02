import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataLoginService } from './data-login.service';
import { Diccionario } from '../models/diccionario.model';

@Injectable({
  providedIn: 'root'
})
export class DiccionarioService {

    private apiUrl = `http://3.239.55.7:4000/api/diccionario`;

    constructor(private http: HttpClient, private authService: DataLoginService) { }
  
    private getHttpOptions() {
      const headers = this.authService.getAuthorizationHeaders();
      return { headers };
    }
  
    getTerminos(): Observable<Diccionario[]> {
      return this.http.get<Diccionario[]>(this.apiUrl, this.getHttpOptions());
    }
  
    getTermino(id: string): Observable<Diccionario> {
      return this.http.get<Diccionario>(`${this.apiUrl}/${id}`, this.getHttpOptions());
    }
  
    addTermino(formData: FormData): Observable<Diccionario> {
      return this.http.post<Diccionario>(this.apiUrl, formData, this.getHttpOptions());
    }
  
    updateTermino(id: string, formData: FormData): Observable<Diccionario> {
      return this.http.put<Diccionario>(`${this.apiUrl}/${id}`, formData, this.getHttpOptions());
    }
  
    deleteTermino(id: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
    }
  
    searchTerminos(query: string): Observable<Diccionario[]> {
      return this.http.get<Diccionario[]>(`${this.apiUrl}/buscar/${query}`, this.getHttpOptions());
    }
}
