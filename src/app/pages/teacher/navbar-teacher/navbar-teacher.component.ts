import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-navbar-teacher',
  templateUrl: './navbar-teacher.component.html',
  styleUrls: ['./navbar-teacher.component.css']
})
export class NavbarTeacherComponent implements OnInit {
  @Input() navbarStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Lecciones',
      icon: 'fa fa-book',
      path: '/lecciones',
    },
    {
      number: '2',
      name: 'Perfil',
      icon: 'fa-solid fa-user',
      path: '/profile-teacher',
    },
    {
      number: '3',
      name: 'Diccionario',
      icon: 'fa fa-filter',
      path: '/diccionario-crud',
    },
    {
      number: '4',
      name: 'Configuración',
      icon: 'fas fa-cogs',
      path: '/lecciones',
    }
  ];
  constructor(private router: Router) { }

  ngOnInit(): void{
    

  }
  navigateTo(path: string) {
    this.router.navigate([path]); // Use Router to navigate on click
  }

}
