import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { CrearJuegoService } from 'src/app/services/crear-juego.service';
import { Cuestionario } from 'src/app/models/cuestionario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-quiz',
  templateUrl: './listar-quiz.component.html',
  styleUrls: ['./listar-quiz.component.css']
})
export class ListarQuizComponent implements OnInit {

  listcuestionario: Cuestionario[] = [];

  constructor(
    private _crearJuegoService: CrearJuegoService,
    private router: Router // Inyecta Router
  ) { }

  ngOnInit(): void {
    this.obtenerCuestionario();
  }

  obtenerCuestionario() {
    this._crearJuegoService.getCuestionario().subscribe(data => {
      this.listcuestionario = data; // Asignamos los datos recibidos a listcuestionario
      console.log(this.listcuestionario); // Comprobamos si los datos se asignan correctamente
    }, error => {
      console.log(error);
    });
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

  deleteCuestionario(id: string): void {
      this._crearJuegoService.deleteCuestionario(id)
        .subscribe({
          next: res => {
            console.log(res);
            this.obtenerCuestionario(); // Vuelve a cargar la lista de cuestionarios después de eliminar uno
          },
          error: err => {
            console.error('Error al eliminar el cuestionario:', err);
          }
        });
    }
  }


