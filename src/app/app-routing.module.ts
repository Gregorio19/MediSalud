import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';


import { SucursalComponent } from './component/CRUD/sucursal/sucursal.component';
import { EspecialidadComponent } from './component/CRUD/especialidad/especialidad.component';
import { DoctorComponent } from './component/CRUD/doctor/doctor.component';
import { AregarHDocComponent } from './component/CRUD/aregar-hdoc/aregar-hdoc.component';


const routes: Routes = [
  { path: 'Cliente-Agenda', component: DatosClienteComponent},
  { path: 'Sucursal', component: SucursalComponent},
  { path: 'Especilidad', component: EspecialidadComponent},
  { path: 'Doctor', component: DoctorComponent},
  { path: 'HorarioDoctor', component: AregarHDocComponent},
  { path: 'Agendar', component: DatosAgendaComponent},
  { path: '', component: DatosAgendaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
