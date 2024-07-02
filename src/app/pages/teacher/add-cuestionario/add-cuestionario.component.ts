import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { Leccion } from '../../../models/leccion.model';
import { Usuario } from '../../../models/leccion.model';
import { Cuestionario } from '../../../models/leccion.model';
@Component({
  selector: 'app-add-cuestionario',
  templateUrl: './add-cuestionario.component.html',
  styleUrls: ['./add-cuestionario.component.css']
})
export class AddCuestionarioComponent implements OnInit{
  navbarStatus: boolean = false;
  
  leccionId: string;
  cuestionarios: Cuestionario[] = [];
  cuestionarioForm: FormGroup;
  maxCuestionarios = 5;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private leccionService: LeccionService
  ) {
    this.leccionId = this.route.snapshot.paramMap.get('id')!;
    this.cuestionarioForm = this.fb.group({
      cuestionarios: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.obtenerCuestionarios();
  }

  obtenerCuestionarios(): void {
    this.leccionService.obtenerCuestionariosDeLeccion(this.leccionId).subscribe(
      cuestionarios => this.cuestionarios = cuestionarios,
      error => console.error('Error al obtener cuestionarios', error)
    );
  }

  onCheckboxChange(event: any): void {
    const cuestionariosArray: FormArray = this.cuestionarioForm.get('cuestionarios') as FormArray;

    if (event.target.checked) {
      cuestionariosArray.push(new FormControl(event.target.value));
    } else {
      const index = cuestionariosArray.controls.findIndex(x => x.value === event.target.value);
      cuestionariosArray.removeAt(index);
    }
  }

  addCuestionarios(): void {
    if (this.cuestionarioForm.valid) {
      const selectedCuestionarios = this.cuestionarioForm.value.cuestionarios;
      
      if (this.cuestionarios.length + selectedCuestionarios.length > this.maxCuestionarios) {
        alert(`No puedes tener más de ${this.maxCuestionarios} cuestionarios en total.`);
        return;
      }

      this.leccionService.addCuestionariosToLeccion(this.leccionId, selectedCuestionarios).subscribe(
        () => {
          console.log('Cuestionarios añadidos exitosamente');
          this.router.navigate(['/lecciones', this.leccionId]);
        },
        error => console.error('Error al añadir cuestionarios', error)
      );
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LeccionService } from '../../../services/leccion.service';
// import { Cuestionario } from '../../../models/leccion.model';

// @Component({
//   selector: 'app-add-cuestionario',
//   templateUrl: './add-cuestionario.component.html',
//   styleUrls: ['./add-cuestionario.component.css']
// })
// export class AddCuestionarioComponent implements OnInit {
//   navbarStatus: boolean = false;

//   leccionId: string;
//   cuestionarios: Cuestionario[] = [];
//   cuestionarioForm: FormGroup;
//   maxCuestionarios = 5;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private leccionService: LeccionService
//   ) {
//     this.leccionId = this.route.snapshot.paramMap.get('id')!;
//     this.cuestionarioForm = this.fb.group({
//       cuestionarios: this.fb.array([])
//     });
//   }

//   ngOnInit(): void {
//     this.obtenerCuestionarios();
//   }

//   obtenerCuestionarios(): void {
//     this.leccionService.obtenerCuestionariosDeLeccion(this.leccionId).subscribe(
//       cuestionarios => this.cuestionarios = cuestionarios,
//       error => console.error('Error al obtener cuestionarios', error)
//     );
//   }

//   onCheckboxChange(event: any): void {
//     const cuestionariosArray: FormArray = this.cuestionarioForm.get('cuestionarios') as FormArray;

//     if (event.target.checked) {
//       if (cuestionariosArray.length < this.maxCuestionarios) {
//         cuestionariosArray.push(new FormControl(event.target.value));
//       } else {
//         event.target.checked = false;
//         alert(`No puedes añadir más de ${this.maxCuestionarios} cuestionarios.`);
//       }
//     } else {
//       const index = cuestionariosArray.controls.findIndex(x => x.value === event.target.value);
//       cuestionariosArray.removeAt(index);
//     }
//   }

//   addCuestionarios(): void {
//     const selectedCuestionarios = this.cuestionarioForm.value.cuestionarios;

//     if (this.cuestionarios.length + selectedCuestionarios.length > this.maxCuestionarios) {
//       alert(`No puedes tener más de ${this.maxCuestionarios} cuestionarios en total.`);
//       return;
//     }

//     if (this.cuestionarioForm.valid) {
//       this.leccionService.addCuestionariosToLeccion(this.leccionId, selectedCuestionarios).subscribe(
//         () => {
//           console.log('Cuestionarios añadidos exitosamente');
//           this.router.navigate(['/lecciones', this.leccionId]);
//         },
//         error => console.error('Error al añadir cuestionarios', error)
//       );
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LeccionService } from '../../../services/leccion.service';
// import { Cuestionario } from '../../../models/cuestionario';

// @Component({
//   selector: 'app-add-cuestionario',
//   templateUrl: './add-cuestionario.component.html',
//   styleUrls: ['./add-cuestionario.component.css']
// })
// export class AddCuestionarioComponent implements OnInit {
//   navbarStatus: boolean = false;
//   leccionId: string;
//   cuestionarios: Cuestionario[] = [];
//   cuestionarioForm: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private leccionService: LeccionService
//   ) {
//     this.leccionId = this.route.snapshot.paramMap.get('id')!;
//     this.cuestionarioForm = this.fb.group({
//       cuestionarios: this.fb.array([])
//     });
//   }

//   ngOnInit(): void {
//     this.obtenerCuestionarios();
//   }

//   obtenerCuestionarios(): void {
//     this.leccionService.obtenerCuestionariosDeLeccion(this.leccionId).subscribe(
//       cuestionarios => this.cuestionarios = cuestionarios,
//       error => console.error('Error al obtener cuestionarios', error)
//     );
//   }

//   onCheckboxChange(event: any): void {
//     const cuestionariosArray: FormArray = this.cuestionarioForm.get('cuestionarios') as FormArray;

//     if (event.target.checked) {
//       if (cuestionariosArray.length >= 3) {
//         event.target.checked = false;
//         alert('No se pueden agregar más de 3 cuestionarios a esta lección');
//         return;
//       }
//       cuestionariosArray.push(new FormControl(event.target.value));
//     } else {
//       const index = cuestionariosArray.controls.findIndex(x => x.value === event.target.value);
//       cuestionariosArray.removeAt(index);
//     }
//   }

//   addCuestionarios(): void {
//     if (this.cuestionarioForm.valid) {
//       const selectedCuestionarios = this.cuestionarioForm.value.cuestionarios;
//       this.leccionService.addCuestionariosToLeccion(this.leccionId, selectedCuestionarios).subscribe(
//         () => {
//           console.log('Cuestionarios añadidos exitosamente');
//           this.router.navigate(['/lecciones', this.leccionId]);
//         },
//         error => console.error('Error al añadir cuestionarios', error)
//       );
//     }
//   }
// }
