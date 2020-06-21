import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';
import { PrincipalComponent } from './component/Cita/principal/principal.component';
import { ResumenCitaComponent } from './component/Cita/resumen-cita/resumen-cita.component';


import { SucursalComponent } from './component/CRUD/sucursal/sucursal.component';
import { EspecialidadComponent } from './component/CRUD/especialidad/especialidad.component';
import { DoctorComponent } from './component/CRUD/doctor/doctor.component';
import { AregarHDocComponent } from './component/CRUD/aregar-hdoc/aregar-hdoc.component';

import { AdmCitaComponent } from './component/Cita/adm-cita/adm-cita.component';


const routes: Routes = [
  { path: 'Cliente-Agenda', component: DatosClienteComponent},
  { path: 'Sucursal', component: SucursalComponent},
  { path: 'Especilidad', component: EspecialidadComponent},
  { path: 'Doctor', component: DoctorComponent},
  { path: 'HorarioDoctor', component: AregarHDocComponent},
  { path: 'Agendar', component: DatosAgendaComponent},
  { path: 'Principal', component: PrincipalComponent},
  { path: 'Resumen', component: ResumenCitaComponent},
  { path: 'AdmCita', component: AdmCitaComponent},
  { path: '', component: DatosAgendaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
