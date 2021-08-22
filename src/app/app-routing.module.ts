import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosClienteComponent } from './component/Cita/datos-cliente/datos-cliente.component';
import { DatosAgendaComponent } from './component/Cita/datos-agenda/datos-agenda.component';
import { PrincipalComponent } from './component/Cita/principal/principal.component';
import { ResumenCitaComponent } from './component/Cita/resumen-cita/resumen-cita.component';
import { CancelacionComponent } from './component/Cita/cancelacion/cancelacion.component';


import { SucursalComponent } from './component/CRUD/sucursal/sucursal.component';
import { EspecialidadComponent } from './component/CRUD/especialidad/especialidad.component';
import { DoctorComponent } from './component/CRUD/doctor/doctor.component';
import { AregarHDocComponent } from './component/CRUD/aregar-hdoc/aregar-hdoc.component';
import { TipoMascotaComponent } from './component/CRUD/tipo-mascota/tipo-mascota.component';
import { RazaComponent } from './component/CRUD/raza/raza.component';

import { AdmCitaComponent } from './component/Cita/adm-cita/adm-cita.component';
import { CitaRotatoriaComponent } from './component/Cita/cita-rotatoria/cita-rotatoria.component';

import { LoginComponent } from './component/Shared/login/login.component';
import { LoginDComponent } from './component/Shared/login-d/login-d.component';
import { EditClienteComponent } from './component/CRUD/Edit-Cliente/edit-cliente/edit-cliente.component';
import { DashboardComponent } from './component/CRUD/dashboard/dashboard.component';

//Fichatecnica
import { CrearFichaComponent } from './component/FichaClinica/crear-ficha/crear-ficha.component';
import { TraerFichaComponent } from './component/FichaClinica/traer-ficha/traer-ficha.component';
import { PacienteComponent } from './component/Videollamada/paciente/paciente.component';
import { ObtnerCitaComponent } from './component/FichaClinica/obtner-cita/obtner-cita.component';

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
  { path: 'Login', component: LoginComponent},
  { path: 'LoginD', component: LoginDComponent},
  { path: 'EditCliente', component: EditClienteComponent},
  { path: 'DashBoard', component: DashboardComponent},
  { path: 'CitaRotatoria', component: CitaRotatoriaComponent},
  { path: 'FichaTenica', component: CrearFichaComponent},
  { path: 'TraerFichaTenica', component: TraerFichaComponent},
  { path: 'PacienteComponent', component: PacienteComponent},
  { path: 'CitaFicha', component: ObtnerCitaComponent},
  { path: 'Raza', component: RazaComponent},
  { path: 'TipoMascota', component: TipoMascotaComponent},
  { path: 'Cancelacion', component: CancelacionComponent},
  
  { path: '', component: PrincipalComponent},
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
