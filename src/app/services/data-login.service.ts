
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {
  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSubject.asObservable();

  private userId: string = '';
  private tokenKey = 'userToken';
  private rolesKey = 'userRoles';
  private apiUrl = 'http://3.239.55.7:4000/api/auth/';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService 
  ) {}

  signup(userData: Usuario): Observable<Usuario | null> {
    return this.http.post<Usuario>(`${this.apiUrl}signup`, userData)
  }

  signin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}signin`, userData).pipe(
      map(response => {
        if (response && response.token && response.user && response.user.roles) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.rolesKey, JSON.stringify(response.user.roles));
          localStorage.setItem('userName', response.user.username);
          this.setUserRoles(response.user.roles);
        }
        return response;
      })
    );
  }

  clearLocalStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    this.setUserRoles([]);
  }
  
  logout(): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', `${localStorage.getItem(this.tokenKey)}`);
    return this.http.post<any>(`${this.apiUrl}logout`, {}, { headers }).pipe(
      map(() => {
        this.clearLocalStorage();
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error during logout:', error);
        return of(false);
      })
    );
  }
  

  setUserRoles(roles: string[]): void {
    this.userRolesSubject.next(roles);
  }

  getUserRoles(): Observable<string[]> {
    return this.userRolesSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }
 
  getProfile(): Observable<Usuario | null> {
    const headers = this.getAuthorizationHeaders();
    return this.http.get<Usuario>(`${this.apiUrl}profile`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching profile:', error);
        return of(null);
      })
    );
  }

  updateProfile(user: Usuario): Observable<Usuario | null> {
    const headers = this.getAuthorizationHeaders();
    return this.http.put<Usuario>(`${this.apiUrl}profile`, user, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating profile:', error);
        return of(null);
      })
    );
  }

  // deleteProfile(): Observable<void> {
  //   const headers = this.getAuthorizationHeaders();
  //   return this.http.delete<void>(`${this.apiUrl}profile`, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error deleting profile:', error);
  //       return of(null);
  //     })
  //   );
  // }

  // Aqui se almacena el token es importante tener en cuenta ya que sin ella mueres

  getAuthorizationHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('x-access-token', `${token}`);
  }

  getUserRolesFromStorage(): string[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }
// restablcer contraseñas: 
  sendEmailService(email: string){
    return this.http.post<any>(`${this.apiUrl}forgot-password`, { email }); 
  }
  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${this.apiUrl}reset-password`, resetObj); 
  }


   // Add methods for fetching teachers and students
   getTeachers(): Observable<Usuario[]> {
    const headers = this.getAuthorizationHeaders();
    return this.http.get<Usuario[]>(`${this.apiUrl}teachers`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error);
        return of([]);
      })
    );
  }

  getStudents(): Observable<Usuario[]> {
    const headers = this.getAuthorizationHeaders();
    return this.http.get<Usuario[]>(`${this.apiUrl}students`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching students:', error);
        return of([]);
      })
    );
  }

  updateUser(userId: string, user: Usuario): Observable<Usuario | null> {
    const headers = this.getAuthorizationHeaders();
    return this.http.put<Usuario>(`${this.apiUrl}users/${userId}`, user, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating user:', error);
        return of(null);
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    const headers = this.getAuthorizationHeaders();
    return this.http.delete<any>(`${this.apiUrl}deleteUser/${userId}`, { headers }).pipe(
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.toastr.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
