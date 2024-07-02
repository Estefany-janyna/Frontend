import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeccionService } from 'src/app/services/leccion.service';

@Component({
  selector: 'app-ver-leccion',
  templateUrl: './ver-leccion.component.html',
  styleUrls: ['./ver-leccion.component.css']
})
export class VerLeccionComponent implements OnInit {
  navbarStatus: boolean = false;
  leccion: any;

  constructor(private route: ActivatedRoute, private leccionService: LeccionService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leccionService.getLeccionById(id).subscribe(
        data => this.leccion = data,
        error => console.error('Error al obtener la lección', error)
      );
    }
  }

  empezarLeccion(): void {
    if (this.leccion && this.leccion._id) {
      this.router.navigate([`/responder-cuestionario/${this.leccion._id}`]);
    }
  }
}
