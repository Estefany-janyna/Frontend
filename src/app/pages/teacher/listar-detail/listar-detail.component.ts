import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { Leccion } from '../../../models/leccion.model';
import Swal from 'sweetalert2';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-listar-detail',
  templateUrl: './listar-detail.component.html',
  styleUrls: ['./listar-detail.component.css']
})
export class ListarDetailComponent implements OnInit {
  leccion: Leccion | undefined;
  navbarStatus: boolean = false;
  listcuestionario: Cuestionario[] = [];

  constructor(
    private crearJuegoService: CrearJuegoService,
    private route: ActivatedRoute,
    private leccionService: LeccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLeccion();
  }

  getLeccion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leccionService.getLeccionById(id).subscribe(
        leccion => this.leccion = leccion,
        error => console.error('Error al obtener la lección', error)
      );
    } else {
      console.error('No se encontró el ID en la ruta');
    }
  }

  navegarAAgregarCuestionarios(leccionId: string | undefined): void {
    if (leccionId) {
      this.router.navigate([`/lecciones/${leccionId}/agregar-cuestionarios`]);
      this.obtenerCuestionario();
    } else {
      console.error('ID de lección no encontrado');
    }
  }

  confirmDelete(id: string | undefined): void {
    if (!id) {
      console.error('Invalid teacher ID');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this teacher?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCuestionario(id);
      }
    });
  }

  obtenerCuestionario(): void {
    this.crearJuegoService.getCuestionario().subscribe(data => {
      this.listcuestionario = data;
      console.log(this.listcuestionario);
    }, error => {
      console.log(error);
    });
  }

  deleteCuestionario(id: string): void {
    this.crearJuegoService.deleteCuestionario(id)
      .subscribe({
        next: res => {
          console.log(res);
          // Eliminar el cuestionario de la lista local
          this.listcuestionario = this.listcuestionario.filter(cuestionario => cuestionario._id !== id);
          // Opción de volver a cargar toda la lista desde el servidor
          this.obtenerCuestionario();
        },
        error: err => {
          console.error('Error al eliminar el cuestionario:', err);
        }
      });
  }

  navegarAEditarCuestionario(id: string | undefined): void {
    this.router.navigate([`/editar-cuestionario`, id]);
  }
}
