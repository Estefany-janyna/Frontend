import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';
// import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent {
  registerTeacherForm: FormGroup;
  emailExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService,
    // private userService: UserService
    private toastr: ToastrService,

  ) {
    this.registerTeacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator.bind(this)],
      ],
    });
  }

  ngOnInit(): void {
    // Cualquier otra lógica de inicialización
  }

  confirmPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    // Protección contra undefined para evitar errores
    if (!this.registerTeacherForm) {
      return null; // No es posible validar si registerForm no está inicializado
    }
    const password = this.registerTeacherForm.get('password')?.value;
    return control.value === password ? null : { mismatch: true };
  }

  onRegister(): void {
    if (this.registerTeacherForm.valid) {
      const userData = {
        ...this.registerTeacherForm.value,
        roles: ['teacher', 'user'], // Define los roles necesarios
      };

      this.dataLoginService.signup(userData).subscribe({
        next: (response) => {
          this.toastr.success(' ¡Bienvenido!', 'Te has registrado correctamente.');
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
        },
        error: (error) => {
          if (error.status === 400 && error.error.message === 'Email not verified') {
            this.toastr.warning('Tu correo aún no ha sido verificado.');
          } else {
            this.toastr.error('Ha ocurrido un error al registrarse.');
          }
        },
      });
    } else {
      this.toastr.warning('Por favor, completa todos los campos obligatorios.');
      this.markAllAsTouched();
    }
  }
  private markAllAsTouched(): void {
    this.registerTeacherForm.markAllAsTouched();
  }

}


