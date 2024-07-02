import { Component, OnInit } from '@angular/core';
import { CrearJuegoService } from '../../../services/crear-juego.service';
import { Cuestionario } from '../../../models/cuestionario';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cuestionario-student',
  templateUrl: './cuestionario-student.component.html',
  styleUrls: ['./cuestionario-student.component.css']
})
export class CuestionarioStudentComponent implements OnInit {
  // cuestionario!: Cuestionario;
  // respuestas: any[] = [];
  // seccionActual: number = 1;
  // totalSecciones!: number;
  // respuestaComprobada: boolean = false;
  // esRespuestaCorrecta: boolean = false;
  // mensajeRespuesta: string = '';
  // mostrarBotonSaltar: boolean = false;
  // mostrarModalFelicitaciones: boolean = false;

  // constructor(
  //   private crearJuegoService: CrearJuegoService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const id = params['id'];
  //     this.crearJuegoService.getCuestionarioById(id).subscribe(data => {
  //       this.cuestionario = data;
  //       this.totalSecciones = data.opciones.length;
  //     });
  //   });
  // }

  // onTarjetaClick(index: number) {
  //   this.respuestas[this.seccionActual - 1] = this.cuestionario.opciones[index];
  // }

  // comprobarRespuesta() {
  //   const respuesta = this.respuestas[this.seccionActual - 1];
  //   this.esRespuestaCorrecta = respuesta && respuesta.esCorrecta;
  //   this.mensajeRespuesta = this.esRespuestaCorrecta ? '¡Correcto!' : 'Incorrecto';
  //   this.respuestaComprobada = true;

  //   if (this.esRespuestaCorrecta) {
  //     this.crearJuegoService.enviarRespuestaCuestionario({
  //       estudianteId: 'user-id',
  //       cuestionarioId: this.cuestionario._id,
  //       respuestas: this.respuestas
  //     }).subscribe();
  //   }
  // }

  // continuar() {
  //   if (this.seccionActual < this.totalSecciones) {
  //     this.seccionActual++;
  //     this.respuestaComprobada = false;
  //   } else {
  //     this.mostrarModalFelicitaciones = true;
  //   }
  // }

  // getCorazonesRestantes() {
  //   return Array(3).fill('❤️');
  // }

  cuestionarios: any[] = [];
  cuestionarioActual: any;
  respuestaSeleccionada: any;
  indiceActual: number = 0;
  puntaje: number = 0;
  mostrarResultado: boolean = false;

  constructor(private crearJuegoService: CrearJuegoService) {}

  ngOnInit(): void {
    this.obtenerCuestionarios();
  }

  obtenerCuestionarios() {
    this.crearJuegoService.getCuestionario().subscribe(
      (data: any[]) => {
        this.cuestionarios = data;
        this.cuestionarioActual = this.cuestionarios[this.indiceActual];
      },
      error => {
        console.error('Error al obtener cuestionarios:', error);
      }
    );
  }

  enviarRespuesta() {
    const payload = {
      estudianteId: 'id-del-estudiante', // Reemplaza con el ID real del estudiante
      cuestionarioId: this.cuestionarioActual._id,
      respuestas: [{ opcionId: this.respuestaSeleccionada._id }]
    };

    this.crearJuegoService.enviarRespuestaCuestionario(payload).subscribe(
      (response) => {
        this.puntaje += response.nuevaRespuesta.puntajeObtenido;
        this.mostrarResultado = true;
        setTimeout(() => {
          this.mostrarResultado = false;
          this.indiceActual++;
          if (this.indiceActual < this.cuestionarios.length) {
            this.cuestionarioActual = this.cuestionarios[this.indiceActual];
          } else {
            this.mostrarResultadoFinal();
          }
        }, 2000);
      },
      error => {
        console.error('Error al enviar respuesta:', error);
      }
    );
  }

  mostrarResultadoFinal() {
    // Lógica para mostrar el resultado final
  }
}
