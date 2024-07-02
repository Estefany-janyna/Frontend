import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation


@Component({
  selector: 'app-navbarmenu',
  templateUrl: './navbarmenu.component.html',
  styleUrls: ['./navbarmenu.component.css']
})
export class NavbarmenuComponent implements OnInit{
  @Input() navbarStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Repaso',
      icon: 'fa-solid fa-book',
      path: '/recursomodule',
    },
    {
      number: '2',
      name: 'Lecciones',
      icon: 'bi bi-book-half',
      path: '/listar-lection',
    },
    {
      number: '3',
      name: 'Aprender',
      icon: 'fa-solid fa-house',
      path: '/aprendermodule',
    },
    {
      number: '4',
      name: 'Diccionario',
      icon: 'fa fa-american-sign-language-interpreting',
      path: '/diccionario-view',
    },
    {
      number: '5',
      name: 'Perfil',
      icon: 'fa-solid fa-user',
      path: '/profile',
    },
    {
      number: '6',
      name: 'Ejercicios',
      icon: 'fa fa-cubes',
      path: 'repasomodule',
    },
    {
      number: '7',
      name: 'Comunidad',
      icon: 'fa fa-comments-o',
      path: 'diccionario',
    },
    {
      number: '8',
      name: 'Configuración',
      icon: 'fas fa-cogs',
      path: '/diccionario-view',
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void{
    

  }
  navigateTo(path: string) {
    this.router.navigate([path]); // Use Router to navigate on click
  }

}
