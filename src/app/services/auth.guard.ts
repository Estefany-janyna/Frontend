// auth.guard.ts



// // -------------------------- Esta es la legal no elimina solo comenta de abajo si

// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { DataLoginService } from '../services/data-login.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private dataLoginService: DataLoginService, private router: Router) {}
 
//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const token = this.dataLoginService.getToken();
//     // const token = this.authService.getToken();
//     if (!token) {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     const userRoles = this.dataLoginService.getUserRolesFromStorage();
//     // const userRoles = this.authService.getUserRolesFromStorage();
//     const requiredRoles = route.data['roles'] as Array<string>;

//     if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
//       this.router.navigate(['/unauthorized']);
//       return false;
//     }

//     return true;
//   }
// }


// -------------------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataLoginService } from '../services/data-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataLoginService: DataLoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.dataLoginService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRoles = this.dataLoginService.getUserRolesFromStorage();
    const requiredRoles = route.data['roles'] as Array<string>;

    if (requiredRoles && !requiredRoles.some(role => userRoles.includes(role))) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}


