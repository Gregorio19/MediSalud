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



//SERVICE
import { MapaserviceService } from './services/mapa/mapaservice.service';
import { MediwebServiceService } from './services/Mediweb/mediweb-service.service';

//Crear Agendamiento
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';
import { HeaderComponent } from './component/Shared/header/header.component';

//CRUD
import { SucursalComponent } from './component/CRUD/sucursal/sucursal.component';
import { EspecialidadComponent } from './component/CRUD/especialidad/especialidad.component';
import { DoctorComponent } from './component/CRUD/doctor/doctor.component';
import { AregarHDocComponent } from './component/CRUD/aregar-hdoc/aregar-hdoc.component';

// Google Maps de Angular 9 
import {GoogleMapsModule} from '@angular/google-maps';
import { AdmCitaComponent } from './component/Cita/adm-cita/adm-cita.component';




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
    AdmCitaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    HttpClientModule,
    RadioButtonModule,
    GMapModule,
    GoogleMapsModule,
    DropdownModule,
    TableModule,
  ],
  providers: [MediwebServiceService,MapaserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
