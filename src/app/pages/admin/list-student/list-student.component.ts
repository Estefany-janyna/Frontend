import { Component, OnInit } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students: Usuario[] = [];
  editForm: FormGroup;
  selectedStudent: Usuario | null = null;
  navbarStatus: boolean = false; //navbar
  // filteredTeachers: Usuario[] = [];
  // searchTerm: string = '';

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
    this.dataService.getStudents().subscribe(students => this.students = students);
  }

  selectStudent(student: Usuario): void {
    this.selectedStudent = student;
    this.editForm.setValue({
      name: student.name || '',
      surname: student.surname || '',
      username: student.username || '',
      email: student.email || '',
      phone: student.phone || ''
    });
  }

  saveStudent(): void {
    if (this.editForm.valid && this.selectedStudent) {
      const updatedData = this.editForm.value;
      this.dataService.updateUser(this.selectedStudent._id!, updatedData).subscribe({
        next: (updatedStudent) => {
          const index = this.students.findIndex(s => s._id === this.selectedStudent!._id);
          // this.students[index] = updatedStudent;
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
    this.selectedStudent = null;
  }

  confirmDelete(studentId: string | undefined): void {
    if (!studentId) {
      console.error('Invalid student ID');
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
        this.deleteStudent(studentId);
      }
    });
  }

  deleteStudent(studentId: string): void {
    this.dataService.deleteUser(studentId).subscribe({
      next: () => {
        this.students = this.students.filter(student => student._id !== studentId);
        this.toastr.success('Estudiante eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar el estudiante:', err);
        this.toastr.error('Error al eliminar el estudiante');
      }
    });
  }

  // filterTeachers(): void {
  //   if (!this.searchTerm) {
  //     this.filteredTeachers = this.teachers;
  //     return;
  //   }

  //   const lowerSearchTerm = this.searchTerm.toLowerCase();
  //   this.filteredTeachers = this.teachers.filter(teacher => 
  //     teacher.name.toLowerCase().includes(lowerSearchTerm) ||
  //     teacher.surname.toLowerCase().includes(lowerSearchTerm) ||
  //     teacher.username.toLowerCase().includes(lowerSearchTerm) ||
  //     teacher.email.toLowerCase().includes(lowerSearchTerm) ||
  //     teacher.phone.toString().includes(lowerSearchTerm)
  //   );
  // }
}
