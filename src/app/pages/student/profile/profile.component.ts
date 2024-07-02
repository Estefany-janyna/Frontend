
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { DataLoginService } from 'src/app/services/data-login.service';
// import { Usuario } from '../../../models/user.model';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: Usuario | null = null;
//   profileForm: FormGroup;
//   //  Codigo para mostrar informacion de HTML
//   navbarStatus: boolean = false;
//   // isEditing: boolean = false;
  

//   constructor(
//     private dataLoginService: DataLoginService,
//     private fb: FormBuilder,
//     private toastr: ToastrService
//   ) {
//     this.profileForm = this.fb.group({
//       name: ['', Validators.required],
//       surname: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.dataLoginService.getProfile().subscribe({
//       next: (profile) => {
//         if (profile) {
//           this.user = profile;
//           this.profileForm.patchValue(profile);
//         } else {
//           this.toastr.error('Error al cargar el perfil');
//         }
//       },
//       error: (err) => {
//         console.error('Error al cargar el perfil:', err);
//         this.toastr.error('Error al cargar el perfil');
//       }
//     });
//   }

//   editProfile(): void {
//     if (this.user) {
//       this.profileForm.patchValue(this.user);
//     }
//   }

//   saveProfile(): void {
//     if (this.profileForm.valid) {
//       this.dataLoginService.updateProfile(this.profileForm.value).subscribe({
//         next: (updatedProfile) => {
//           if (updatedProfile) {
//             this.user = updatedProfile;
//             this.toastr.success('Perfil actualizado correctamente');
//           } else {
//             this.toastr.error('Error al actualizar el perfil');
//           }
//           this.resetForm();
//         },
//         error: (err) => {
//           console.error('Error al actualizar el perfil:', err);
//           this.toastr.error('Error al actualizar el perfil');
//         }
//       });
//     } else {
//       this.toastr.error('Por favor, complete el formulario correctamente');
//     }
//   }

//   cancelEdit(): void {
//     this.resetForm();
//   }

//   deleteProfile(): void {
//     Swal.fire({
//       title: '¿Estás seguro?',
//       text: '¿Deseas eliminar tu perfil?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Sí, eliminar',
//       cancelButtonText: 'No, cancelar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.dataLoginService.deleteUser(this.user!._id!).subscribe({
//           next: () => {
//             this.toastr.success('Perfil eliminado correctamente');
//             this.resetForm();
//             this.user = null; // Set user to null after deletion
//           },
//           error: (err) => {
//             console.error('Error al eliminar el perfil:', err);
//             this.toastr.error('Error al eliminar el perfil');
//           }
//         });
//       }
//     });
//   }

//   private resetForm(): void {
//     if (this.user) {
//       this.profileForm.reset();
//     } 
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { DataLoginService } from 'src/app/services/data-login.service';
// import { Usuario } from '../../../models/user.model';
// import Swal from 'sweetalert2';
// import { Chart, ChartItem } from 'chart.js';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: Usuario | null = null;
//   profileForm: FormGroup;
//   navbarStatus: boolean = false;
//   isEditing: boolean = false;

//   constructor(
//     private dataLoginService: DataLoginService,
//     private fb: FormBuilder,
//     private toastr: ToastrService
//   ) {
//     this.profileForm = this.fb.group({
//       name: ['', Validators.required],
//       surname: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadProfile();
//     this.initProgressChart();
//   }

//   loadProfile(): void {
//     this.dataLoginService.getProfile().subscribe({
//       next: (profile) => {
//         if (profile) {
//           this.user = profile;
//           this.profileForm.patchValue(profile);
//         } else {
//           this.toastr.error('Error al cargar el perfil');
//         }
//       },
//       error: (err) => {
//         console.error('Error al cargar el perfil:', err);
//         this.toastr.error('Error al cargar el perfil');
//       }
//     });
//   }

//   editProfile(): void {
//     this.isEditing = true;
//     if (this.user) {
//       this.profileForm.patchValue(this.user);
//     }
//   }

//   saveProfile(): void {
//     if (this.profileForm.valid) {
//       this.dataLoginService.updateProfile(this.profileForm.value).subscribe({
//         next: (updatedProfile) => {
//           if (updatedProfile) {
//             this.user = updatedProfile;
//             this.toastr.success('Perfil actualizado correctamente');
//             this.isEditing = false;
//           } else {
//             this.toastr.error('Error al actualizar el perfil');
//           }
//         },
//         error: (err) => {
//           console.error('Error al actualizar el perfil:', err);
//           this.toastr.error('Error al actualizar el perfil');
//         }
//       });
//     } else {
//       this.toastr.error('Por favor, complete el formulario correctamente');
//     }
//   }

//   cancelEdit(): void {
//     this.isEditing = false;
//   }

//   deleteProfile(): void {
//     Swal.fire({
//       title: '¿Estás seguro?',
//       text: '¿Deseas eliminar tu perfil?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Sí, eliminar',
//       cancelButtonText: 'No, cancelar'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.dataLoginService.deleteUser(this.user!._id!).subscribe({
//           next: () => {
//             this.toastr.success('Perfil eliminado correctamente');
//             this.user = null;
//           },
//           error: (err) => {
//             console.error('Error al eliminar el perfil:', err);
//             this.toastr.error('Error al eliminar el perfil');
//           }
//         });
//       }
//     });
//   }

//   private initProgressChart(): void {
//     const ctx = document.getElementById('progressChart') as HTMLCanvasElement | null;
//     if (ctx) {
//       const chartContext = ctx.getContext('2d') as ChartItem;
//       new Chart(chartContext, {
//         type: 'line',
//         data: {
//           labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
//           datasets: [{
//             label: 'Progreso',
//             data: [10, 20, 30, 40, 50, 60, 70],
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 2,
//             fill: false
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     } else {
//       console.error('Failed to get canvas context');
//     }
//   }

  
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Chart, ChartItem } from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Usuario | null = null;
  profileForm: FormGroup;
  navbarStatus: boolean = false;
  isEditing: boolean = false;

  constructor(
    private dataLoginService: DataLoginService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
    this.initProgressChart();
    this.initCircularChart();
  }

  loadProfile(): void {
    this.dataLoginService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.user = profile;
          this.profileForm.patchValue(profile);
        } else {
          this.toastr.error('Error al cargar el perfil');
        }
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this.toastr.error('Error al cargar el perfil');
      }
    });
  }

  editProfile(): void {
    this.isEditing = true;
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.dataLoginService.updateProfile(this.profileForm.value).subscribe({
        next: (updatedProfile) => {
          if (updatedProfile) {
            this.user = updatedProfile;
            this.toastr.success('Perfil actualizado correctamente');
            this.isEditing = false;
          } else {
            this.toastr.error('Error al actualizar el perfil');
          }
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
          this.toastr.error('Error al actualizar el perfil');
        }
      });
    } else {
      this.toastr.error('Por favor, complete el formulario correctamente');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteProfile(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar tu perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataLoginService.deleteUser(this.user!._id!).subscribe({
          next: () => {
            this.toastr.success('Perfil eliminado correctamente');
            this.user = null;
          },
          error: (err) => {
            console.error('Error al eliminar el perfil:', err);
            this.toastr.error('Error al eliminar el perfil');
          }
        });
      }
    });
  }

  private initProgressChart(): void {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement | null;
    if (ctx) {
      const chartContext = ctx.getContext('2d') as ChartItem;
      new Chart(chartContext, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
          datasets: [{
            label: 'Progreso',
            data: [10, 20, 30, 40, 50, 60, 70],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context for progressChart');
    }
  }

  private initCircularChart(): void {
    const ctx = document.getElementById('circularChart') as HTMLCanvasElement | null;
    if (ctx) {
      const chartContext = ctx.getContext('2d') as ChartItem;
      new Chart(chartContext, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Remaining'],
          datasets: [{
            data: [75, 25], // Example data, adjust as needed
            backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)']
          }]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}%`;
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context for circularChart');
    }
  }
}
