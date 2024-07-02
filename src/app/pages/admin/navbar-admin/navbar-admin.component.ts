import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent  implements OnInit{
  @Input() navbarStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/admin',
    },
    {
      number: '2',
      name: 'Profesores',
      icon: 'fa fas fa-chalkboard-teacher',
      path: 'list-teacher',
    },
    {
      number: '3',
      name: 'Alumnos',
      icon: 'fa fas fa-user-graduate',
      path: 'list-student',
    },
    {
      number: '4',
      name: 'Configuración',
      icon: 'fa-solid fa-gear',
      path: '/',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void{

  }

  navigateTo(path: string) {
    this.router.navigate([path]); // Use Router to navigate on click
  }

}
