import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

//NG PRIME
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Crear Agendamiento
import { DatosClienteComponent } from './componenet/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './componenet/Cita/datos-agenda/datos-agenda.component';


@NgModule({
  declarations: [
    AppComponent,
    DatosClienteComponent,
    DatosAgendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    CheckboxModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
