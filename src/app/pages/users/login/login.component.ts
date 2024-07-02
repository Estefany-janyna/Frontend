import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from 'src/app/services/data-login.service';
import { UserRoles } from 'src/app/models/user-roles-enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de que ToastrService esté instalado y configurado

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showErrorMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService,
    private toastr: ToastrService // Uso para mostrar mensajes emergentes
    
  ) {
    // Inicialización del formulario de inicio de sesión
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí puedes hacer validaciones adicionales, si es necesario.
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      this.dataLoginService.signin(userData).subscribe({
        next: (response) => {
          if (response && response.token) {
            this.toastr.success('Inicio de sesión exitoso. ','¡Bienvenido de nuevo!')
            // Almacenar el token, roles, u otros datos necesarios
            this.dataLoginService.setUserRoles(response.user.roles);
            this.redirectBasedOnRole(response.user.roles); // Redirigir según roles
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('Correo o contraseña incorrectos. Por favor, intenta de nuevo.', 'Error de autenticación');
          } else if (error.status === 403) {
            this.toastr.error('Tu cuenta ha sido bloqueada. Contacta al soporte.', 'Acceso denegado');
          } else {
            this.toastr.error('Error durante el inicio de sesión. Por favor, intenta de nuevo.', 'Error del servidor');
          }
        }
      });
    } else {
      this.toastr.warning('Por favor, completa todos los campos correctamente.'); // Mensaje emergente
      this.markAllAsTouched();
    }
  }
  private markAllAsTouched(): void {
    this.loginForm.markAllAsTouched();
  }


  redirectBasedOnRole(userRoles: string[]): void {
    if (userRoles.includes(UserRoles.Admin)) {
      this.router.navigate(['/admin']); // Redirigir al dashboard si es admin
    } else if (userRoles.includes(UserRoles.Teacher)) {
      this.router.navigate(['/crear-cuestionario']); // Redirigir si es profesor
    } else if (userRoles.includes(UserRoles.Student)) {
      this.router.navigate(['/aprendermodule']); // Redirigir si es estudiante
    } else {
      this.router.navigate(['/']); // Redirigir por defecto
    }
  }
  
}
