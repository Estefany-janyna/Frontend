import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { Leccion } from '../../../models/leccion.model';
import { Usuario } from '../../../models/leccion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-leccion',
  templateUrl: './crear-leccion.component.html',
  styleUrls: ['./crear-leccion.component.css']
})
export class CrearLeccionComponent implements OnInit {
  navbarStatus: boolean = false;
  leccionForm: FormGroup;
  file: File | null = null;
  portadaSeleccionada: string | ArrayBuffer | undefined = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private leccionService: LeccionService
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

  ngOnInit(): void {}

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

  createLeccion(): void {
    if (this.leccionForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.leccionForm.get('titulo')?.value);
    formData.append('descripcion', this.leccionForm.get('descripcion')?.value);
    formData.append('tiempoEstimado', this.leccionForm.get('tiempoEstimado')?.value.toString());
    formData.append('numeroVidas', this.leccionForm.get('numeroVidas')?.value.toString());
    formData.append('puntajeTotalEstimado', this.leccionForm.get('puntajeTotalEstimado')?.value.toString());
    formData.append('nivel', this.leccionForm.get('nivel')?.value);

    if (this.file) {
      formData.append('portada', this.file);
    }

    this.leccionService.createLeccion(formData).subscribe(
      () => {
        Swal.fire('Creado!', 'La lección ha sido creada correctamente.', 'success');
        this.router.navigate(['/lecciones']);
      },
      error => {
        console.error('Error al crear la lección', error);
        Swal.fire('Error', 'Hubo un problema al crear la lección.', 'error');
      }
    );
  }
}


