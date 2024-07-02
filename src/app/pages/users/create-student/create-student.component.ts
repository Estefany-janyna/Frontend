import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from '../../../services/data-login.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  registerForm: FormGroup;
  emailExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataLoginService: DataLoginService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      // email: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.email,
      //     Validators.pattern(/^[a-zA-Z0-9._%+-]+@tecsup\.edu\.pe$/),
      //   ],
      // ],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator.bind(this)],
      ],
    });
  }

  ngOnInit(): void {}

  confirmPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!this.registerForm) {
      return null;
    }
    const password = this.registerForm.get('password')?.value;
    return control.value === password ? null : { mismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
  
      this.userService.checkEmailExists(email).subscribe(
        emailExists => {
          if (emailExists) {
            this.emailExists = true;
            this.toastr.error('Este correo electrónico ya está registrado. Intenta con otro.', 'Error de registro');
          } else {
            // Aquí puedes manejar el caso en el que el correo electrónico no existe
            const userData = {
              ...this.registerForm.value,
              roles: ['student', 'user'],
            };
            this.dataLoginService.signup(userData).subscribe({
              next: () => {
                this.toastr.success('¡Bienvenido! Te has registrado correctamente.');
                this.router.navigate(['/login']);
              },
              error: () => {
                this.toastr.error('Ha ocurrido un error al registrarse.');
              }
            });
          }
        }
      );
    } else {
      this.toastr.warning('Por favor, completa todos los campos obligatorios.');
      this.markAllAsTouched();
    }
  }
  
  

  private markAllAsTouched(): void {
    this.registerForm.markAllAsTouched();
  }

  



}
