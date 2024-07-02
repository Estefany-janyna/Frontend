import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataLoginService } from './data-login.service'; // Importa tu servicio de login

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://3.239.55.7:4000/api/users/';

  constructor(private http: HttpClient, private dataLoginService: DataLoginService) {}

  checkEmailExists(email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.dataLoginService.getToken()}`
    });

    return this.http.get<any>(`${this.url}check-email/${email}`, { headers }).pipe(
      map((response: any) => {
        return response.exists;
      })
    );
  }
}
