import { CrearJuegoService } from 'src/app/services/crear-juego.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-quiz',
  templateUrl: './actualizar-quiz.component.html',
  styleUrls: ['./actualizar-quiz.component.css']
})
export class ActualizarQuizComponent implements OnInit {
  navbarStatus: boolean = false;
  cuestionarioForm!: FormGroup;
  archivos: { [key: number]: File } = {};
  photoSelected: { [key: number]: string | ArrayBuffer | undefined } = {};
  puntos: number[] = [2, 4, 6, 10, 20, 30, 40, 50];
  tiempos: number[] = [6, 8, 10, 12, 14, 16, 18, 20];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _crearJuegoService: CrearJuegoService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCuestionario();
  }

  initForm() {
    this.cuestionarioForm = this.fb.group({
      enunciado: ['', Validators.required],
      opciones: this.fb.array([]),
      puntaje: ['', Validators.required],
      tiempoLimite: ['', Validators.required]
    });
  }

  get opciones() {
    return this.cuestionarioForm.get('opciones') as FormArray;
  }

  loadCuestionario() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._crearJuegoService.getCuestionarioById(id).subscribe((cuestionario: any) => {
        this.cuestionarioForm.patchValue(cuestionario);
        this.setOpciones(cuestionario.opciones);
      });
    }
  }

  setOpciones(opciones: any[]) {
    const opcionFGs = opciones.map(opcion => this.fb.group({
      path: [opcion.contenido.path, Validators.required],
      esCorrecta: [opcion.esCorrecta, Validators.required]
    }));
    const opcionFormArray = this.fb.array(opcionFGs);
    this.cuestionarioForm.setControl('opciones', opcionFormArray);
  }

  agregarOpcion() {
    if (this.opciones.length < 3) {
      const opcionFormGroup = this.fb.group({
        path: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      });
      this.opciones.push(opcionFormGroup);
    } else {
      this.toastr.info('Ya has alcanzado el máximo de tres opciones.', 'Limite alcanzado');
    }
  }

  eliminarOpcion(index: number) {
    this.opciones.removeAt(index);
    delete this.photoSelected[index];
    delete this.archivos[index];
  }

  onCheckboxChange(selectedIndex: number) {
    this.opciones.controls.forEach((opcion, index) => {
      if (index !== selectedIndex) {
        opcion.get('esCorrecta')?.setValue(false);
      }
    });
    this.opciones.controls[selectedIndex].get('esCorrecta')?.setValue(true);
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoSelected[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.archivos[index] = file;
    } else {
      this.photoSelected[index] = undefined;
      delete this.archivos[index];
    }
  }

  getPhoto(index: number): string | undefined {
    const path = this.opciones.at(index).get('path')?.value;
    if (this.photoSelected[index]) {
      return this.photoSelected[index] as string;
    } else if (path) {
      return `http://localhost:4000/${path}`;
    }
    return undefined;
  }

  onSubmit() {
    if (this.cuestionarioForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const formData = new FormData();
        formData.append('enunciado', this.cuestionarioForm.get('enunciado')?.value);
        formData.append('tiempoLimite', this.cuestionarioForm.get('tiempoLimite')?.value.toString());
        formData.append('puntaje', this.cuestionarioForm.get('puntaje')?.value.toString());

        this.opciones.controls.forEach((opcion, index) => {
          const file = this.archivos[index];
          if (file) {
            formData.append(`image`, file);
          }
          const esCorrecta = opcion.get('esCorrecta')?.value;
          formData.append(`opciones[${index}][esCorrecta]`, esCorrecta.toString());
          formData.append(`opciones[${index}][path]`, opcion.get('path')?.value);
        });

        this._crearJuegoService.updateCuestionario(id, formData).subscribe(
          data => {
            this.toastr.success('El cuestionario fue actualizado con éxito!', 'Cuestionario Actualizado!');
            // this.router.navigate(['/lecciones', id]);
            this.router.navigate(['/lecciones']);
          },
          error => {
            console.log(error);
            this.toastr.error('Hubo un error al actualizar el cuestionario', 'Error');
          }
        );
      } else {
        this.toastr.error('No se pudo obtener el ID del cuestionario', 'Error');
      }
    } else {
      this.toastr.error('Por favor, complete el formulario correctamente', 'Error de validación');
    }
  }
}
