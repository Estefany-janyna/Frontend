import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from 'src/app/services/diccionario.service';
import { Diccionario } from 'src/app/models/diccionario.model';

@Component({
  selector: 'app-diccionario-view',
  templateUrl: './diccionario-view.component.html',
  styleUrls: ['./diccionario-view.component.css']
})
export class DiccionarioViewComponent implements OnInit {
  navbarStatus: boolean = false;
  terminos: Diccionario[] = [];
  searchQuery: string = '';

  constructor(private diccionarioService: DiccionarioService) { }

  ngOnInit(): void {
    this.loadTerminos();
  }

  loadTerminos(): void {
    this.diccionarioService.getTerminos().subscribe(data => {
      this.terminos = data;
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.diccionarioService.searchTerminos(this.searchQuery).subscribe(data => {
        this.terminos = data;
      });
    } else {
      this.loadTerminos();
    }
  }
}
