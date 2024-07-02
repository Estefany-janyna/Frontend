// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of, BehaviorSubject } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Usuario } from '../models/user.model';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private userRolesSubject = new BehaviorSubject<string[]>([]);
//   userRoles$ = this.userRolesSubject.asObservable();
  
//   private userId: string = '';
//   private tokenKey = 'userToken';
//   private rolesKey = 'userRoles';
//   private apiUrl = 'http://localhost:4000/api/auth'; // Ajustar la URL según el backend

//   constructor(
//     private http: HttpClient,
//     private toastr: ToastrService 
//   ) {}

//   signup(userData: Usuario): Observable<Usuario | null> {
//     return this.http.post<Usuario>(`${this.apiUrl}/signup`, userData)
//   }

//   signin(userData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/signin`, userData).pipe(
//       map(response => {
//         if (response && response.token && response.user && response.user.roles) {
//           localStorage.setItem(this.tokenKey, response.token);
//           localStorage.setItem(this.rolesKey, JSON.stringify(response.user.roles));
//           this.setUserRoles(response.user.roles);
//         }
//         return response;
//       })
//     );
//   }

//   logout(): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
//       map(() => {
//         this.clearLocalStorage();
//         return true;
//       }),
//       catchError((error) => {
//         console.error('Error during logout:', error);
//         return of(false);
//       })
//     );
//   }

//   setUserRoles(roles: string[]): void {
//     this.userRolesSubject.next(roles);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   getUserId(): string | null {
//     return localStorage.getItem('userId');
//   }

//   setUserId(userId: string): void {
//     this.userId = userId;
//     localStorage.setItem('userId', userId);
//   }

//   getUserRolesFromStorage(): string[] {
//     const roles = localStorage.getItem(this.rolesKey);
//     return roles ? JSON.parse(roles) : [];
//   }

//   private clearLocalStorage(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.rolesKey);
//     this.setUserRoles([]);
//   }

//   private getAuthorizationHeaders(): HttpHeaders {
//     const token = this.getToken();
//     return new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   }

//   getProfile(): Observable<Usuario | null> {
//     return this.http.get<Usuario>(`${this.apiUrl}/profile`, { headers: this.getAuthorizationHeaders() }).pipe(
//       catchError((error) => {
//         console.error('Error fetching profile:', error);
//         return of(null);
//       })
//     );
//   }

//   updateProfile(user: Usuario): Observable<Usuario | null> {
//     return this.http.put<Usuario>(`${this.apiUrl}/profile`, user, { headers: this.getAuthorizationHeaders() }).pipe(
//       catchError((error) => {
//         console.error('Error updating profile:', error);
//         return of(null);
//       })
//     );
//   }
// }
