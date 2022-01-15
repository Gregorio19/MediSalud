import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//NG PRIME
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GMapModule} from 'primeng/gmap';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';




//SERVICE
import { MapaserviceService } from './services/mapa/mapaservice.service';
import { MediwebServiceService } from './services/Mediweb/mediweb-service.service';
import { FichaMedicaService } from './services/FichaMedica/ficha-medica.service';

//Crear Agendamiento
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';
import { HeaderComponent } from './component/Shared/header/header.component';
import { PrincipalComponent } from './component/Cita/principal/principal.component';
import { ResumenCitaComponent } from './component/Cita/resumen-cita/resumen-cita.component';
import { CitaRotatoriaComponent } from './component/Cita/cita-rotatoria/cita-rotatoria.component';



//CRUD
import { SucursalComponent } from './component/CRUD/sucursal/sucursal.component';
import { EspecialidadComponent } from './component/CRUD/especialidad/especialidad.component';
import { DoctorComponent } from './component/CRUD/doctor/doctor.component';
import { AregarHDocComponent } from './component/CRUD/aregar-hdoc/aregar-hdoc.component';
import { AdmCitaComponent } from './component/Cita/adm-cita/adm-cita.component';
import { LoginComponent } from './component/Shared/login/login.component';
import { EditClienteComponent } from './component/CRUD/Edit-Cliente/edit-cliente/edit-cliente.component';
import { DashboardComponent } from './component/CRUD/dashboard/dashboard.component';

// Google Maps de Angular 9 
import {GoogleMapsModule} from '@angular/google-maps';

//FcihaTecnica
import { CrearFichaComponent } from './component/FichaClinica/crear-ficha/crear-ficha.component';
import { TraerFichaComponent } from './component/FichaClinica/traer-ficha/traer-ficha.component';
import { PacienteComponent } from './component/Videollamada/paciente/paciente.component';
import { ObtnerCitaComponent } from './component/FichaClinica/obtner-cita/obtner-cita.component';
import { LoginDComponent } from './component/Shared/login-d/login-d.component';
import { RazaComponent } from './component/CRUD/raza/raza.component';
import { TipoMascotaComponent } from './component/CRUD/tipo-mascota/tipo-mascota.component';
import { CancelacionComponent } from './component/Cita/cancelacion/cancelacion.component';
import { ModalComponent } from './services/modal/modal.component';
import { TimeoutComponent } from './component/Shared/timeout/timeout.component';

@NgModule({
  declarations: [
    AppComponent,
    DatosClienteComponent,
    DatosAgendaComponent,
    HeaderComponent,
    SucursalComponent,
    EspecialidadComponent,
    DoctorComponent,
    AregarHDocComponent,
    PrincipalComponent,
    ResumenCitaComponent,
    AdmCitaComponent,
    LoginComponent,
    EditClienteComponent,
    DashboardComponent,
    CitaRotatoriaComponent,
    CrearFichaComponent,
    TraerFichaComponent,
    PacienteComponent,
    ObtnerCitaComponent,
    LoginDComponent,
    RazaComponent,
    TipoMascotaComponent,
    CancelacionComponent,
    ModalComponent,
    TimeoutComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    FileUploadModule,
    AutoCompleteModule,
    DialogModule,
    CardModule,
    ProgressSpinnerModule,
    CheckboxModule,
    HttpClientModule,
    RadioButtonModule,
    GMapModule,
    GoogleMapsModule,
    DropdownModule,
    TableModule,
  ],
  providers: [MediwebServiceService,MapaserviceService,FichaMedicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
