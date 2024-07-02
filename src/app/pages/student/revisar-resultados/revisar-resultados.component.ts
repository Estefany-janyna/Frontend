import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';


@Component({
  selector: 'app-revisar-resultados',
  templateUrl: './revisar-resultados.component.html',
  styleUrls: ['./revisar-resultados.component.css']
})
export class RevisarResultadosComponent implements OnInit{
  resultados: any;
  cuestionarioId!: string;
  estudianteId!: string;

  constructor(
    private route: ActivatedRoute,
    private cuestionarioService: CrearJuegoService
  ) { }

  ngOnInit(): void {
    this.cuestionarioId = this.route.snapshot.paramMap.get('cuestionarioId')!;
    this.estudianteId = this.route.snapshot.paramMap.get('estudianteId')!;
    this.obtenerResultados();
  }

  obtenerResultados(): void {
    this.cuestionarioService.obtenerResultadosCuestionario(this.cuestionarioId, this.estudianteId).subscribe(
      data => {
        this.resultados = data;
      },
      error => console.error('Error al obtener los resultados', error)
    );
  }
}
