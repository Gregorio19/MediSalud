import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';


const routes: Routes = [
  { path: 'Cliente-Agenda', component: DatosClienteComponent},
  { path: '', component: DatosAgendaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
