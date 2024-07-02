import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLoginService } from 'src/app/services/data-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Output() navbarMenu = new EventEmitter<any>();
  navbarStatus: boolean = false;

  constructor(private router: Router,private dataLoginService: DataLoginService) { }

  ngOnInit(): void {

  }

  NavbarMenu() {
    this.navbarStatus = !this.navbarStatus;
    this.navbarMenu.emit(this.navbarStatus);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSignUp() {
    this.router.navigate(['/crear-student']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.dataLoginService.logout().subscribe(
      success => {
        if (success) {
          Swal.fire({
            title: 'Logged Out',
            text: 'You have been successfully logged out.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }
      },
      error => {
        console.error('Error during logout', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error during logout. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}
