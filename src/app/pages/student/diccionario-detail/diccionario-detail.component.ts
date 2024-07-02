import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { Diccionario } from 'src/app/models/diccionario.model';
@Component({
  selector: 'app-diccionario-detail',
  templateUrl: './diccionario-detail.component.html',
  styleUrls: ['./diccionario-detail.component.css']
})
export class DiccionarioDetailComponent implements OnInit {
  navbarStatus: boolean = false;
  termino: Diccionario | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diccionarioService: DiccionarioService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.diccionarioService.getTermino(id).subscribe(data => {
          this.termino = data;
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/diccionario-view']);
  }

}
