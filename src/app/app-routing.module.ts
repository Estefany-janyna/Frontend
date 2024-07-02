import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//aprender
import { NavbarmenuComponent } from './pages/student/navbarmenu/navbarmenu.component';
// recurso
import { ResponderCuestionarioComponent } from './pages/student/responder-cuestionario/responder-cuestionario.component';
import { RevisarResultadosComponent } from './pages/student/revisar-resultados/revisar-resultados.component';
import { RecursomoduleComponent } from './pages/elementos/recursos/recursomodule/recursomodule.component';

import { RecursoInfoComponent } from './pages/elementos/recurso-info/recurso-info.component';
 

//Import web Landin Page
 import { LandingPageComponent } from './pages/landing/landing-page/landing-page.component';
//Import de Componenete de opciones
import { RegioptionComponent } from './pages/landing/regioption/regioption.component';
//Import de componenete login
import { LoginComponent } from'./pages/users/login/login.component';
// Import Componenete Registro usuario estudiante
import { CreateStudentComponent } from './pages/users/create-student/create-student.component';
//IMPORT Componente Registro Profesor
import { CreateTeacherComponent } from './pages/users/create-teacher/create-teacher.component'
// Aprender
import { AprendermoduleComponent } from './pages/elementos/aprender/aprendermodule/aprendermodule.component';
// Repaso
import { RepasomoduleComponent } from './pages/elementos/repaso/repasomodule/repasomodule.component';
// import { ModalpruebaComponent } from './pages/elementos/aprender/modalprueba/modalprueba.component';
// Import Perfil
import { ProfileComponent } from './pages/student/profile/profile.component';
// Para recuperar y establecer contraseñas reset y forget:
import { ForgetPasswordComponent } from './pages/users/forget-password/forget-password.component';
import { ResetComponent } from './pages/users/reset/reset.component';

import {   } from './pages/elementos/repaso/repasomodule/repasomodule.component';
import { DashboardComponent } from './pages/teacher/dashboard/dashboard.component';
import { CrearQuizComponent } from './pages/teacher/crear-quiz/crear-quiz.component';
import { ListarQuizComponent } from './pages/teacher/listar-quiz/listar-quiz.component';
import { ActualizarQuizComponent } from './pages/teacher/actualizar-quiz/actualizar-quiz.component';
import { TopbarComponent } from './pages/student/topbar/topbar.component'; 
import { CrearLeccionComponent } from './pages/teacher/crear-leccion/crear-leccion.component';
import { EditarLeccionComponent } from './pages/teacher/editar-leccion/editar-leccion.component';
import { ListarLeccionComponent } from './pages/teacher/listar-leccion/listar-leccion.component';
import { ListarDetailComponent } from './pages/teacher/listar-detail/listar-detail.component';
import { StudentLeccionComponent } from './pages/teacher/student-leccion/student-leccion.component';
import { AddCuestionarioComponent } from './pages/teacher/add-cuestionario/add-cuestionario.component';
import { VerLeccionComponent } from './pages/student/ver-leccion/ver-leccion.component';
import { ListarLeccionStudentComponent } from './pages/student/listar-leccion-student/listar-leccion-student.component';
import { ProfileTeacherComponent } from './pages/teacher/profile-teacher/profile-teacher.component';

import { ProgresoComponent } from './pages/student/progreso/progreso.component';
import { ListarEstudiantesComponent } from './pages/student/listar-estudiantes/listar-estudiantes.component';
import { CuestionarioStudentComponent } from './pages/student/cuestionario-student/cuestionario-student.component';
// ADMIN IMPORT
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { TopbarAdminComponent } from './pages/admin/topbar-admin/topbar-admin.component';
import { NavbarAdminComponent } from './pages/admin/navbar-admin/navbar-admin.component';
import { ListStudentComponent } from './pages/admin/list-student/list-student.component';
import { ListTeacherComponent } from './pages/admin/list-teacher/list-teacher.component';
import { ProfileAdminComponent } from './pages/admin/profile-admin/profile-admin.component';

// DICCIONARIO
// Profesor
import { DiccionarioCrudComponent } from './pages/teacher/diccionario-crud/diccionario-crud.component';
// Estudiante
import { DiccionarioViewComponent } from './pages/student/diccionario-view/diccionario-view.component';
import { DiccionarioDetailComponent } from './pages/student/diccionario-detail/diccionario-detail.component';

import { AuthGuard } from './services/auth.guard';
import { DicionariomoduleComponent } from './pages/elementos/diccionario/dicionariomodule/dicionariomodule.component';


const routesInicio: Routes = [

  // Pagina principal de la app Login
  { path: 'login', component:LoginComponent },

  //Pagina Landing Page
  {path: '', component: LandingPageComponent},

  // Pagina de Opciones de Registro
  {path:'opcion-registro', component: RegioptionComponent },

  // Pagina Registro Estudiante
  {path: 'crear-student', component :CreateStudentComponent},

  // Pagina Registro Profesor
  {path: 'crear-teacher', component: CreateTeacherComponent },

  // Aprender Vista Docente
  { path: 'crear-cuestionario', component:  ListarLeccionComponent},  
  { path: 'profile-teacher', component: ProfileTeacherComponent},
  
  // Para recuperar contraseñas 
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset/:token', component: ResetComponent }, //sin esto no funciona

//crear quiz
  // { path: 'crear-quiz', component: CrearQuizComponent },
//listar quiz
  { path: 'listar-quiz', component: ListarQuizComponent },
//actualizar quiz
  { path: 'editar-cuestionario/:id', component: ActualizarQuizComponent },
  //crear leccion
  // { path: 'crear-leccion', component: CrearLeccionComponent },
  { path: 'crear-leccion', component: CrearLeccionComponent },
  { path: 'editar-leccion/:id', component: EditarLeccionComponent },
  { path: 'lecciones', component: ListarLeccionComponent },

  { path: 'lecciones/:id', component: ListarDetailComponent },
  { path: 'lecciones/:id/agregar-cuestionarios',component: CrearQuizComponent},
  { path: 'list-estudiante',component: StudentLeccionComponent },

  { path: 'responder-cuestionario/:id', component: ResponderCuestionarioComponent },
  { path: 'revisar-resultados/:cuestionarioId/:estudianteId', component: RevisarResultadosComponent },

  { path: 'boton', component: ListarEstudiantesComponent},
  { path: 'progreso/:id', component: ProgresoComponent},
  { path: 'cuestionarioId', component: CuestionarioStudentComponent},

  // { path: '', redirectTo: '/responder-cuestionario', pathMatch: 'full' },
  { path: 'ver-leccion/:id', component: VerLeccionComponent},
  { path: 'listar-lection', component: ListarLeccionStudentComponent},


  // Aprender Vista Alumno
  { path: 'aprendermodule', component: AprendermoduleComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin', 'student', 'teacher'] } },
 //Uso de rutas childrens
  {
    path: 'recursomodule',
    component: RecursomoduleComponent,
    children: [
      {
        path: 'recursoinfo',
        component: RecursoInfoComponent
      }
    ]
  },
   
 
  { path: 'repasomodule', component: RepasomoduleComponent },
  { path: 'diccionario', component: DicionariomoduleComponent },
 //
  { path: 'nabvar', component: NavbarmenuComponent},
  { path: 'topvar', component: TopbarComponent },
  // Perfil
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin', 'student', 'teacher'] } },

  // ADMIN PATH , canActivate: [AuthGuard], data: { roles: ['admin'] }
  { path: 'admin', component: DashboardAdminComponent },
  { path: 'navbarAdmin', component: NavbarAdminComponent},
  { path: 'topbarAdmin', component: TopbarAdminComponent},
  { path: 'list-student', component: ListStudentComponent },
  { path: 'list-teacher', component: ListTeacherComponent },

  // Diccionario
  { path: 'diccionario-crud', component: DiccionarioCrudComponent},
  { path: 'diccionario-view', component: DiccionarioViewComponent},
  { path: 'diccionario/:id', component: DiccionarioDetailComponent},

//
  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
