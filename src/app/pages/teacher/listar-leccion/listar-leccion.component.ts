import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { Leccion } from '../../../models/leccion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-leccion',
  templateUrl: './listar-leccion.component.html',
  styleUrls: ['./listar-leccion.component.css']
})
export class ListarLeccionComponent implements OnInit {
  navbarStatus: boolean = false;
  lecciones: Leccion[] = [];

  constructor(private leccionService: LeccionService, private router: Router) {}

  ngOnInit(): void {
    this.getLecciones();
  }

  getLecciones(): void {
    this.leccionService.getLecciones().subscribe(
      lecciones => this.lecciones = lecciones,
      error => console.error('Error al obtener las lecciones', error)
    );
  }

  navegarACrearLeccion(): void {
    this.router.navigate(['/crear-leccion']);
  }

  eliminarLeccion(id: string | undefined): void {
    if (!id) {
      console.error('ID de lección inválido');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta lección?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarla',
      cancelButtonText: 'No, mantenerla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leccionService.deleteLeccion(id).subscribe(
          () => {
            this.lecciones = this.lecciones.filter(leccion => leccion._id !== id);
            Swal.fire('Eliminada!', 'La lección ha sido eliminada.', 'success');
            this.getLecciones(); 
          },
          error => {
            console.error('Error al eliminar la lección:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la lección.', 'error');
          }
        );
      }
    });
  }

  bloquearEstudiante(id: string | undefined): void {
    if (!id) {
      console.error('ID de estudiante inválido');
      return;
    }
    this.leccionService.bloquearEstudiante(id).subscribe(
      () => Swal.fire('Bloqueado', 'El estudiante ha sido bloqueado.', 'success'),
      error => Swal.fire('Error', 'Hubo un problema al bloquear al estudiante.', 'error')
    );
  }

  desbloquearEstudiante(id: string | undefined): void {
    if (!id) {
      console.error('ID de estudiante inválido');
      return;
    }
    this.leccionService.desbloquearEstudiante(id).subscribe(
      () => Swal.fire('Desbloqueado', 'El estudiante ha sido desbloqueado.', 'success'),
      error => Swal.fire('Error', 'Hubo un problema al desbloquear al estudiante.', 'error')
    );
  }

  subirCuestionario(id: string | undefined): void {
    if (!id) {
      console.error('ID de cuestionario inválido');
      return;
    }
    this.leccionService.subirCuestionario(id).subscribe(
      () => Swal.fire('Subido', 'El cuestionario ha sido subido.', 'success'),
      error => Swal.fire('Error', 'Hubo un problema al subir el cuestionario.', 'error')
    );
  }

  navegarAEditarLeccion(id: string | undefined): void {
    if (!id) {
      console.error('ID de lección inválido');
      return;
    }
    this.router.navigate(['/editar-leccion', id]);
  }

  verDetalles(id: string | undefined): void {
    if (!id) {
      console.error('ID de lección inválido');
      return;
    }
    this.router.navigate(['/lecciones', id]);
  }

  getLeccionesPorNivel(nivel: string): void {
    this.leccionService.getLeccionesPorNivel(nivel).subscribe(
      data => this.lecciones = data,
      error => console.error('Error al obtener las lecciones por nivel', error)
    );
  }
}