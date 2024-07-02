

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import Swal from 'sweetalert2';

// import { LeccionService } from 'src/app/services/leccion.service';
// import { Leccion, Cuestionario, Opcion } from 'src/app/models/leccion.model';
// import { CrearJuegoService  } from 'src/app/services/crear-juego.service'

// @Component({
//   selector: 'app-responder-cuestionario',
//   templateUrl: './responder-cuestionario.component.html',
//   styleUrls: ['./responder-cuestionario.component.css']
// })
// export class ResponderCuestionarioComponent implements OnInit, OnDestroy {
//   cuestionarioForm: FormGroup;
//   leccion!: Leccion;
//   currentQuestionIndex: number = 0;
//   timer: number = 0;
//   interval: any;
//   totalQuestions: number = 0;
//   feedback: string | null = null;
//   subscriptions: Subscription[] = [];
//   allQuestions: { opcion: Opcion[], cuestionarioId: string, enunciado: string, tiempoLimite: number }[] = [];
//   puntajeTotal: number = 0;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private leccionService: LeccionService,
//     private crearJuegoService: CrearJuegoService
//   ) {
//     this.cuestionarioForm = this.fb.group({
//       respuesta: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const leccionId = this.route.snapshot.paramMap.get('id')!;
//     this.getLeccion(leccionId);
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.forEach(sub => sub.unsubscribe());
//     clearInterval(this.interval);
//   }

//   getLeccion(leccionId: string): void {
//     const sub = this.leccionService.getLeccionById(leccionId).subscribe(
//       data => {
//         this.leccion = data;
//         this.loadAllQuestions();
//       },
//       error => console.error('Error al obtener la lección', error)
//     );
//     this.subscriptions.push(sub);
//   }

//   loadAllQuestions(): void {
//     this.leccion.CuestionarioIds.forEach((cuestionario: Cuestionario) => {
//       this.allQuestions.push({
//         opcion: cuestionario.opciones,
//         cuestionarioId: cuestionario._id!,
//         enunciado: cuestionario.enunciado,
//         tiempoLimite: cuestionario.tiempoLimite
//       });
//     });
//     this.totalQuestions = this.allQuestions.length;
//     if (this.totalQuestions > 0) {
//       this.initializeForm();
//       this.startTimer();
//     }
//   }

//   initializeForm(): void {
//     this.cuestionarioForm = this.fb.group({
//       respuesta: ['', Validators.required]
//     });
//   }

//   startTimer(): void {
//     this.timer = this.allQuestions[this.currentQuestionIndex].tiempoLimite;
//     this.interval = setInterval(() => {
//       this.timer--;
//       if (this.timer === 0) {
//         this.onSubmit();
//       }
//     }, 1000);
//   }

//   onOptionSelect(value: string): void {
//     this.cuestionarioForm.patchValue({ respuesta: value });
//     this.onSubmit();
//   }

//   onSubmit(): void {
//     if (!this.leccion) return;

//     const respuesta = this.cuestionarioForm.value.respuesta;
//     const opcionCorrecta = this.allQuestions[this.currentQuestionIndex].opcion.find(op => op.esCorrecta)?.contenido.path;

//     // Verificar si la respuesta es correcta
//     if (respuesta === opcionCorrecta) {
//       Swal.fire({
//         icon: 'success',
//         title: '¡Correcto!',
//         text: '¡Excelente, lo hiciste bien!',
//         imageUrl: `https://i.pinimg.com/564x/69/20/fe/6920fe748b955eaa22937baf7a5f0f73.jpg`,
//         imageWidth: 400,
//         imageHeight: 300,
//         imageAlt: 'Respuesta correcta',
//         confirmButtonText: 'Siguiente Pregunta'
//       }).then(() => {
//         this.siguientePregunta();
//       });
//     } else {
//       const correcta = this.allQuestions[this.currentQuestionIndex].opcion.find(op => op.esCorrecta);
//       Swal.fire({
//         icon: 'error',
//         title: 'Respuesta incorrecta',
//         text: `Incorrecto, la respuesta correcta es:`,
//         imageUrl: `http://3.239.55.7:4000/${correcta?.contenido.path}`,
//         imageWidth: 400,
//         imageHeight: 200,
//         imageAlt: 'Respuesta correcta',
//         confirmButtonText: 'Siguiente Pregunta'
//       }).then(() => {
//         this.siguientePregunta();
//       });
//     }
//   }

//   siguientePregunta(): void {
//     if (this.currentQuestionIndex < this.totalQuestions - 1) {
//       this.currentQuestionIndex++;
//       this.feedback = null;
//       clearInterval(this.interval);
//       this.initializeForm();
//       this.startTimer();
//     } else {
//       this.finalizarCuestionario();
//     }
//   }

//   finalizarCuestionario(): void {
//     Swal.fire({
//       icon: 'info',
//       title: 'Cuestionario Finalizado',
//       text: `Tu puntaje total es: ${this.puntajeTotal}`,
//       confirmButtonText: 'Aceptar'
//     }).then(() => {
//       this.router.navigate(['/listar-lection']);
//     });
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { LeccionService } from 'src/app/services/leccion.service';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';
import { Leccion, Cuestionario, Opcion } from 'src/app/models/leccion.model';

@Component({
  selector: 'app-responder-cuestionario',
  templateUrl: './responder-cuestionario.component.html',
  styleUrls: ['./responder-cuestionario.component.css']
})
export class ResponderCuestionarioComponent implements OnInit, OnDestroy {
  navbarStatus: boolean = false;
  cuestionarioForm: FormGroup;
  leccion!: Leccion;
  currentQuestionIndex: number = 0;
  timer: number = 0;
  interval: any;
  totalQuestions: number = 0;
  feedback: string | null = null;
  subscriptions: Subscription[] = [];
  allQuestions: { opcion: Opcion[], cuestionarioId: string, enunciado: string, tiempoLimite: number, puntaje: number }[] = [];
  puntajeTotal: number = 0;

  corazones: number = 5; // Número inicial de corazones
  maxCorazones: number = 5; // Número máximo de corazones

    // Sonidos
    sonidoCorrecto = new Audio('.././assets/sounds/correct.mp3');
    sonidoIncorrecto = new Audio('.././assets/sounds/incorrect.mp3');
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private leccionService: LeccionService,
    private crearJuegoService: CrearJuegoService
  ) {
    this.cuestionarioForm = this.fb.group({
      respuesta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const leccionId = this.route.snapshot.paramMap.get('id')!;
    this.getLeccion(leccionId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    clearInterval(this.interval);
  }

  getLeccion(leccionId: string): void {
    const sub = this.leccionService.getLeccionById(leccionId).subscribe(
      data => {
        this.leccion = data;
        this.loadAllQuestions();
      },
      error => console.error('Error al obtener la lección', error)
    );
    this.subscriptions.push(sub);
  }

  loadAllQuestions(): void {
    this.leccion.CuestionarioIds.forEach((cuestionario: Cuestionario) => {
      this.allQuestions.push({
        opcion: cuestionario.opciones,
        cuestionarioId: cuestionario._id!,
        enunciado: cuestionario.enunciado,
        tiempoLimite: cuestionario.tiempoLimite,
        puntaje: cuestionario.puntaje // Asegúrate de que esta propiedad esté incluida
      });
    });
    this.totalQuestions = this.allQuestions.length;
    if (this.totalQuestions > 0) {
      this.initializeForm();
      this.startTimer();
    }
  }

  initializeForm(): void {
    this.cuestionarioForm = this.fb.group({
      respuesta: ['', Validators.required]
    });
  }

  startTimer(): void {
    this.timer = this.allQuestions[this.currentQuestionIndex].tiempoLimite;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.onSubmit();
      }
    }, 1000);
  }

  onOptionSelect(value: string): void {
    this.cuestionarioForm.patchValue({ respuesta: value });
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.leccion) return;

    const respuesta = this.cuestionarioForm.value.respuesta;
    const opcionCorrecta = this.allQuestions[this.currentQuestionIndex].opcion.find(op => op.esCorrecta)?.contenido.path;

    // Verificar si la respuesta es correcta
    if (respuesta === opcionCorrecta) {
      this.sonidoCorrecto.play(); // Reproducir sonido correcto
      this.puntajeTotal += this.allQuestions[this.currentQuestionIndex].puntaje; // Sumar el puntaje solo si es correcta
      Swal.fire({
      
        title: '¡Correcto!',
        text: '¡Excelente, lo hiciste bien!',
        imageUrl: `../../../../assets/images/check.png`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Respuesta correcta',
        confirmButtonText: 'Siguiente Pregunta',
        confirmButtonColor: '#0147A2',
        
      }).then(() => {
        this.siguientePregunta();
      });
    } else {
      this.sonidoIncorrecto.play(); // Reproducir sonido incorrecto
      const correcta = this.allQuestions[this.currentQuestionIndex].opcion.find(op => op.esCorrecta);
      Swal.fire({
        icon: 'error',
        title: 'Respuesta incorrecta',
        html: `La respuesta correcta es:<br><img src="http://3.239.55.7:4000/${correcta?.contenido.path}" alt="Respuesta correcta" width="400" height="200">`,
        confirmButtonText: 'Siguiente Pregunta',
        confirmButtonColor: '#0147A2',
        customClass: {
            title: 'text-danger', // Cambia el color del título a rojo para indicar error
            htmlContainer: 'text-dark' // Cambia el color del contenido del mensaje a oscuro para mejorar la legibilidad
        }
      }).then(() => {
        this.corazones--; // Disminuir un corazón por respuesta incorrecta
        if (this.corazones === 0) {
          this.finalizarCuestionario(); // Finalizar si no quedan corazones
        } else {
          this.siguientePregunta();
        }
      });
    }
  }

  siguientePregunta(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.feedback = null;
      clearInterval(this.interval);
      this.initializeForm();
      this.startTimer();
    } else {
      this.finalizarCuestionario();
    }
  }

  finalizarCuestionario(): void {
    Swal.fire({
      icon: 'info',
    title: 'Cuestionario Finalizado',
    html: `
      <p>Tu puntaje total es:</p>
      <h2>${this.puntajeTotal}</h2>
    `,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#0147A2',
    customClass: {
      title: 'text-primary', // Cambia el color del título a azul oscuro
      htmlContainer: 'text-dark' // Cambia el color del contenido a oscuro para mejorar la legibilidad
    }
    }).then(() => {
      this.router.navigate(['/listar-lection']);
    });
  }

  getCorazonesRestantes(): number[] {
    return Array(this.corazones).fill(0);
  }
}
