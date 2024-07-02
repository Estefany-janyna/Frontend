import { Component, OnInit } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from 'src/app/models/user.model';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.css']
})
export class ListarEstudiantesComponent implements OnInit{
  estudiantes: Usuario[] = [];

  constructor(private dataLoginService: DataLoginService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.dataLoginService.getStudents().subscribe(
      data => this.estudiantes = data,
      error => console.error('Error al obtener los estudiantes', error)
    );
  }
}
