import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup; // Usando operador de aserción no nula
  token!: string; // Usando operador de aserción no nula


  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dataLoginService: DataLoginService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });

    this.activateRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  confirmPasswordValidator() {
    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  reset() {
    if (this.resetForm.invalid) {
      return;
    }
    const resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    };
    this.dataLoginService.resetPasswordService(resetObj)
      .subscribe({
        next: res => {
          alert('Contraseña restablecida con éxito');
          this.resetForm.reset();
          this.router.navigate(['login']);
        },
        error: err => {
          alert('Error al restablecer la contraseña');
        }
      });
  }
}
