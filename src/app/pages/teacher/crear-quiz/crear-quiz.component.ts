import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';

@Component({
  selector: 'app-crear-quiz',
  templateUrl: './crear-quiz.component.html',
  styleUrls: ['./crear-quiz.component.css']
})
export class CrearQuizComponent implements OnInit {
  navbarStatus: boolean = false;

  file: File | null = null;
  photoSelected: { [key: number]: string | ArrayBuffer | undefined } = {};
  archivos: { [key: number]: File } = {};

  puntos: number[] = [2, 4, 6, 10, 20, 30, 40, 50]; // Opciones de puntos
  tiempos: number[] = [6, 8, 10, 12, 14, 16, 18, 20]; // Opciones de tiempo en segundos

  cuestionarioForm: FormGroup = new FormGroup({
    enunciado: new FormControl('', Validators.required),
    tiempoLimite: new FormControl(0, Validators.min(0)),
    opciones: new FormArray([])
  });

  leccionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _crearJuegoService: CrearJuegoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cuestionarioForm = this.fb.group({
      enunciado: ['', Validators.required],
      puntaje: [0, Validators.min(0)],
      tiempoLimite: [0, Validators.min(0)],
      opciones: this.fb.array([])
    });
    this.leccionId = this.route.snapshot.paramMap.get('id');
    this.agregarOpcion();
  }

  get opciones() {
    return this.cuestionarioForm.get('opciones') as FormArray;
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

  onSubmit() {
    if (this.cuestionarioForm.valid) {
      const formData = new FormData();
      formData.append('enunciado', this.cuestionarioForm.get('enunciado')?.value);
      formData.append('tiempoLimite', this.cuestionarioForm.get('tiempoLimite')?.value.toString());
      formData.append('puntaje', this.cuestionarioForm.get('puntaje')?.value.toString());
      formData.append('leccionId', this.leccionId as string); // Añadir el ID de la lección al formulario

      this.opciones.controls.forEach((opcion, index) => {
        const file = this.archivos[index];
        if (file) {
          formData.append(`image`, file);
        }
        const esCorrecta = opcion.get('esCorrecta')?.value;
        formData.append(`opciones[${index}][esCorrecta]`, esCorrecta.toString());
      });

      this._crearJuegoService.addCuestionario(formData).subscribe(
        data => {
          this.toastr.success('El cuestionario fue registrado con éxito!', 'Cuestionario Registrado!');
          this.router.navigate(['/lecciones', this.leccionId]);
        },
        error => {
          console.log(error);
          this.toastr.error('Hubo un error al registrar el cuestionario', 'Error');
        }
      );
    } else {
      this.toastr.error('Por favor, complete el formulario correctamente', 'Error de validación');
    }
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
    return this.photoSelected[index] as string | undefined;
  }
}
