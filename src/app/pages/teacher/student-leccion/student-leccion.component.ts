import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Leccion } from '../../../models/leccion.model';
import { Usuario } from '../../../models/user.model';
import Swal  from 'sweetalert2'

@Component({
  selector: 'app-student-leccion',
  templateUrl: './student-leccion.component.html',
  styleUrls: ['./student-leccion.component.css']
})
export class StudentLeccionComponent implements OnInit {
  estudiantes: Usuario[] = [];

  constructor(private estudianteService: LeccionService) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.estudianteService.obtenerEstudiantes().subscribe(
      estudiantes => this.estudiantes = estudiantes,
      error => console.error('Error al obtener estudiantes', error)
    );
  }

  bloquearEstudiante(id: string | undefined): void {
    if (!id) {
      console.error('ID de estudiante inválido');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas bloquear a este estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bloquear',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.bloquearEstudiante(id).subscribe(
          () => {
            this.getEstudiantes(); // Actualizar la lista de estudiantes
            Swal.fire('Bloqueado', 'El estudiante ha sido bloqueado.', 'success');
          },
          error => Swal.fire('Error', 'Hubo un problema al bloquear al estudiante.', 'error')
        );
      }
    });
  }

  desbloquearEstudiante(id: string | undefined): void {
    if (!id) {
      console.error('ID de estudiante inválido');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas desbloquear a este estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desbloquear',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.desbloquearEstudiante(id).subscribe(
          () => {
            this.getEstudiantes(); // Actualizar la lista de estudiantes
            Swal.fire('Desbloqueado', 'El estudiante ha sido desbloqueado.', 'success');
          },
          error => Swal.fire('Error', 'Hubo un problema al desbloquear al estudiante.', 'error')
        );
      }
    });
  }
}
