import { Component, OnInit, Input } from '@angular/core';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';
import { Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Leccion } from '../../../models/leccion.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() mostrarmain: boolean = true;
  listcuestionario: Leccion[] = [];

  constructor(private _crearJuegoService: CrearJuegoService) { }

  ngOnInit(): void {

  }

}
