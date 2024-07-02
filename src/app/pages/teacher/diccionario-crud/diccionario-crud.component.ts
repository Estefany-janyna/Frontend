import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { Diccionario } from 'src/app/models/diccionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diccionario-crud',
  templateUrl: './diccionario-crud.component.html',
  styleUrls: ['./diccionario-crud.component.css']
})
export class DiccionarioCrudComponent implements OnInit {

  navbarStatus: boolean = false;
  terminos: Diccionario[] = [];
  terminoForm: FormGroup;
  editMode: boolean = false;
  currentTerminoId: string | null = null;
  currentImageUrl: string | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private diccionarioService: DiccionarioService) {
    this.terminoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.loadTerminos();
  }

  loadTerminos(): void {
    this.diccionarioService.getTerminos().subscribe(data => {
      this.terminos = data;
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.terminoForm.patchValue({
        image: file
      });
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => this.previewImageUrl = reader.result;
    reader.readAsDataURL(file);
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('title', this.terminoForm.get('title')?.value);
    formData.append('description', this.terminoForm.get('description')?.value);
    if (this.terminoForm.get('image')?.value) {
      formData.append('imageUrl', this.terminoForm.get('image')?.value);
    }

    if (this.editMode) {
      this.diccionarioService.updateTermino(this.currentTerminoId!, formData).subscribe(() => {
        this.loadTerminos();
        this.terminoForm.reset();
        this.editMode = false;
        this.currentTerminoId = null;
        this.currentImageUrl = null;
        this.previewImageUrl = null;
        Swal.fire('Actualizado', 'El término ha sido actualizado con éxito.', 'success');
      }, () => {
        Swal.fire('Error', 'Hubo un problema al actualizar el término.', 'error');
      });
    } else {
      this.diccionarioService.addTermino(formData).subscribe(() => {
        this.loadTerminos();
        this.terminoForm.reset();
        this.previewImageUrl = null;
        Swal.fire('Creado', 'El término ha sido creado con éxito.', 'success');
      }, () => {
        Swal.fire('Error', 'Hubo un problema al crear el término.', 'error');
      });
    }
  }

  editTermino(termino: Diccionario): void {
    this.editMode = true;
    this.currentTerminoId = termino._id!;
    this.currentImageUrl = termino.imageUrl;
    this.previewImageUrl = null;
    this.terminoForm.patchValue({
      title: termino.title,
      description: termino.description
    });
  }

  deleteTermino(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
      }).then((result) => {
        if (result.isConfirmed) {
          this.diccionarioService.deleteTermino(id).subscribe(() => {
            this.terminos = this.terminos.filter(termino => termino._id !== id);
            Swal.fire('Eliminado', 'El término ha sido eliminado con éxito.', 'success');
          }, () => {
            Swal.fire('Error', 'Hubo un problema al eliminar el término.', 'error');
          });
        }
      });
    } else {
      console.error('El id es undefined');
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.terminoForm.reset();
    this.currentTerminoId = null;
    this.currentImageUrl = null;
    this.previewImageUrl = null;
  }
}
