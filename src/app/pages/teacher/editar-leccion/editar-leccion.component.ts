import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { Leccion } from '../../../models/leccion.model';
import { CrearJuegoService } from 'src/app/services/crear-juego.service';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Usuario } from '../../../models/leccion.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-leccion',
  templateUrl: './editar-leccion.component.html',
  styleUrls: ['./editar-leccion.component.css']
})
export class EditarLeccionComponent implements OnInit{
  navbarStatus: boolean = false;
  leccionForm: FormGroup;
  file: File | null = null;
  portadaSeleccionada: string | ArrayBuffer | undefined = '';


  constructor(
    private fb: FormBuilder,
    private leccionService: LeccionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leccionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      portada: [''],
      tiempoEstimado: [0, Validators.required],
      numeroVidas: [0, Validators.required],
      puntajeTotalEstimado: [0, Validators.required],
      nivel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getLeccion();
  }

  getLeccion(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.leccionService.getLeccionById(id).subscribe(
      leccion => {
        this.leccionForm.patchValue(leccion);
        if (leccion.portada) {
          this.portadaSeleccionada = `http://localhost:4000/${leccion.portada}`;
        }
      },
      error => console.error('Error al obtener la lección', error)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.portadaSeleccionada = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.file = file;
    } else {
      this.portadaSeleccionada = undefined;
      this.file = null;
    }
  }

  updateLeccion(): void {
    if (this.leccionForm.invalid) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    this.leccionService.updateLeccion(id, this.leccionForm.value).subscribe(
      () => {
        Swal.fire('Actualizada!', 'La lección ha sido actualizada.', 'success');
        this.router.navigate(['/lecciones']);
      },
      error => {
        console.error('Error al actualizar la lección', error);
        Swal.fire('Error', 'Hubo un problema al actualizar la lección.', 'error');
      }
    );
  }


}
