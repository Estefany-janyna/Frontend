import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from '../../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent {
  user: Usuario | null = null;
  profileForm: FormGroup;
  navbarStatus: boolean = false;
  isEditing: boolean = false;

  constructor(
    private dataLoginService: DataLoginService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
   
  }

  loadProfile(): void {
    this.dataLoginService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.user = profile;
          this.profileForm.patchValue(profile);
        } else {
          this.toastr.error('Error al cargar el perfil');
        }
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.toastr.error('Error al cargar el perfil');
      }
    });
  }

  editProfile(): void {
    this.isEditing = true;
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.dataLoginService.updateProfile(this.profileForm.value).subscribe({
        next: (updatedProfile) => {
          if (updatedProfile) {
            this.user = updatedProfile;
            this.toastr.success('Perfil actualizado correctamente');
            this.isEditing = false;
          } else {
            this.toastr.error('Error al actualizar el perfil');
          }
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
          this.toastr.error('Error al actualizar el perfil');
        }
      });
    } else {
      this.toastr.error('Por favor, complete el formulario correctamente');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteProfile(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar tu perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataLoginService.deleteUser(this.user!._id!).subscribe({
          next: () => {
            this.toastr.success('Perfil eliminado correctamente');
            this.user = null;
          },
          error: (err) => {
            console.error('Error al eliminar el perfil:', err);
            this.toastr.error('Error al eliminar el perfil');
          }
        });
      }
    });
  }
}
