import { Component, OnInit } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  teachers: Usuario[] = [];
  editForm: FormGroup;
  selectedTeacher: Usuario | null = null;
  navbarStatus: boolean = false;  //para el navbar

  constructor(
    private dataService: DataLoginService, 
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dataService.getTeachers().subscribe(teachers => this.teachers = teachers);
  }

  selectTeacher(teacher: Usuario): void {
    this.selectedTeacher = teacher;
    this.editForm.setValue({
      name: teacher.name || '',
      surname: teacher.surname || '',
      username: teacher.username || '',
      email: teacher.email || '',
      phone: teacher.phone || ''
    });
  }

  saveProfile(): void {
    if (this.editForm.valid && this.selectedTeacher) {
      const updatedData = this.editForm.value;
      this.dataService.updateUser(this.selectedTeacher._id!, updatedData).subscribe({
        next: (updatedTeacher) => {
          const index = this.teachers.findIndex(t => t._id === this.selectedTeacher!._id);
          // this.teachers[index] = updatedTeacher;
          this.toastr.success('Perfil actualizado correctamente');
          this.resetForm();
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
    this.resetForm();
  }

  resetForm(): void {
    this.editForm.reset();
    this.selectedTeacher = null;
  }

  confirmDelete(teacherId: string | undefined): void {
    if (!teacherId) {
      console.error('Invalid teacher ID');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar a este estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTeacher(teacherId);
      }
    });
  }

  deleteTeacher(teacherId: string): void {
    this.dataService.deleteUser(teacherId).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(teacher => teacher._id !== teacherId);
        this.toastr.success('Profesor eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar el profesor:', err);
        this.toastr.error('Error al eliminar el profesor');
      }
    });
  }
}
