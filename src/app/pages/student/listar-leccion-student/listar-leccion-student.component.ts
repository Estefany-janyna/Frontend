import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LeccionService } from 'src/app/services/leccion.service';
@Component({
  selector: 'app-listar-leccion-student',
  templateUrl: './listar-leccion-student.component.html',
  styleUrls: ['./listar-leccion-student.component.css']
})
export class ListarLeccionStudentComponent {
  lecciones: any[] = [];
  navbarStatus: boolean = false;
  constructor(private leccionService: LeccionService, private router: Router) { }

  ngOnInit(): void {
    this.getLecciones();
  }

  getLecciones(): void {
    this.leccionService.getLecciones().subscribe(
      lecciones => this.lecciones = lecciones,
      error => console.error('Error al obtener las lecciones', error)
    );
  }

  verLeccion(id: string): void {
    this.router.navigate([`/ver-leccion/${id}`]);
  }

 
}
