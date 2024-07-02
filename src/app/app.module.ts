import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { GoogleMapsModule } from '@angular/google-maps';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importante agregar BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr';
import { ToastrService  } from 'ngx-toastr';
import { AprendermoduleComponent } from './pages/elementos/aprender/aprendermodule/aprendermodule.component';
import { ModalpruebaComponent } from './pages/elementos/aprender/modalprueba/modalprueba.component';

import { RecursomoduleComponent } from './pages/elementos/recursos/recursomodule/recursomodule.component';
import { RepasomoduleComponent } from './pages/elementos/repaso/repasomodule/repasomodule.component';
import { DashboardComponent } from './pages/teacher/dashboard/dashboard.component';
import { CrearQuizComponent } from './pages/teacher/crear-quiz/crear-quiz.component';
import { CreateStudentComponent } from './pages/users/create-student/create-student.component';
import { LoginComponent } from './pages/users/login/login.component';
import { CreateTeacherComponent } from './pages/users/create-teacher/create-teacher.component';
import { LandingPageComponent } from './pages/landing/landing-page/landing-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegioptionComponent } from './pages/landing/regioption/regioption.component';

import { NavbarmenuComponent } from './pages/student/navbarmenu/navbarmenu.component';
import { ListarQuizComponent } from './pages//teacher/listar-quiz/listar-quiz.component';
import { ActualizarQuizComponent } from './pages/teacher/actualizar-quiz/actualizar-quiz.component';
import { TopbarComponent } from './pages/student/topbar/topbar.component';
import { ProfileComponent } from './pages/student/profile/profile.component';
import { ForgetPasswordComponent } from './pages/users/forget-password/forget-password.component';
import { ResetComponent } from './pages/users/reset/reset.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { TopbarAdminComponent } from './pages/admin/topbar-admin/topbar-admin.component';
import { NavbarAdminComponent } from './pages/admin/navbar-admin/navbar-admin.component';
import { ListTeacherComponent } from './pages/admin/list-teacher/list-teacher.component';
import { ListStudentComponent } from './pages/admin/list-student/list-student.component';
import { CrearLeccionComponent } from './pages/teacher/crear-leccion/crear-leccion.component';
import { EditarLeccionComponent } from './pages/teacher/editar-leccion/editar-leccion.component';
import { ListarLeccionComponent } from './pages/teacher/listar-leccion/listar-leccion.component';
import { ListarDetailComponent } from './pages/teacher/listar-detail/listar-detail.component';
import { StudentLeccionComponent } from './pages/teacher/student-leccion/student-leccion.component';
import { AddCuestionarioComponent } from './pages/teacher/add-cuestionario/add-cuestionario.component';
import { ResponderCuestionarioComponent } from './pages/student/responder-cuestionario/responder-cuestionario.component';
import { RevisarResultadosComponent } from './pages/student/revisar-resultados/revisar-resultados.component';
import { VerLeccionComponent } from './pages/student/ver-leccion/ver-leccion.component';
import { ListarLeccionStudentComponent } from './pages/student/listar-leccion-student/listar-leccion-student.component';
import { DicionariomoduleComponent } from './pages/elementos/diccionario/dicionariomodule/dicionariomodule.component';
import { RecursoInfoComponent } from './pages/elementos/recurso-info/recurso-info.component';
import { NavbarTeacherComponent } from './pages/teacher/navbar-teacher/navbar-teacher.component';
import { TopbarTeacherComponent } from './pages/teacher/topbar-teacher/topbar-teacher.component';
import { ProfileTeacherComponent } from './pages/teacher/profile-teacher/profile-teacher.component';
import { ProfileAdminComponent } from './pages/admin/profile-admin/profile-admin.component';
import { CuestionarioStudentComponent } from './pages/student/cuestionario-student/cuestionario-student.component';
import { ProgresoComponent } from './pages/student/progreso/progreso.component';
// import { BaseChartDirective } from 'ng2-charts';
import { ListarEstudiantesComponent } from './pages/student/listar-estudiantes/listar-estudiantes.component';
import { DiccionarioDetailComponent } from './pages/student/diccionario-detail/diccionario-detail.component';
import { DiccionarioViewComponent } from './pages/student/diccionario-view/diccionario-view.component';
import { DiccionarioCrudComponent } from './pages/teacher/diccionario-crud/diccionario-crud.component';
// import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts';

// import {NgChartsModule} from 'ng2-charts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AprendermoduleComponent,
    ModalpruebaComponent,
    RecursomoduleComponent,
    RepasomoduleComponent,
    DashboardComponent,
    CrearQuizComponent,
    CreateStudentComponent,
    LoginComponent,
    CreateTeacherComponent,
    LandingPageComponent,
    FooterComponent,
    RegioptionComponent,
    NavbarmenuComponent,
    ListarQuizComponent,
    ActualizarQuizComponent,
    TopbarComponent,
    ProfileComponent,
    ForgetPasswordComponent,
    ResetComponent,
    DashboardAdminComponent,
    TopbarAdminComponent,
    NavbarAdminComponent,
    ListTeacherComponent,
    ListStudentComponent,
    CrearLeccionComponent,
    EditarLeccionComponent,
    ListarLeccionComponent,
    ListarDetailComponent,
    StudentLeccionComponent,
    AddCuestionarioComponent,
    RevisarResultadosComponent,
    ResponderCuestionarioComponent,
    VerLeccionComponent,
    ListarLeccionStudentComponent,
    DicionariomoduleComponent,
    RecursoInfoComponent,
    NavbarTeacherComponent,
    TopbarTeacherComponent,
    ProfileTeacherComponent,
    ProfileAdminComponent,
    CuestionarioStudentComponent,
    ProgresoComponent,
    ListarEstudiantesComponent,
    DiccionarioDetailComponent,
    DiccionarioViewComponent,
    DiccionarioCrudComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    GoogleMapsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // BaseChartDirective,
    // NgxChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
