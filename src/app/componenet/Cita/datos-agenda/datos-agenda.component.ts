import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-agenda',
  templateUrl: './datos-agenda.component.html',
  styleUrls: ['./datos-agenda.component.scss']
})
export class DatosAgendaComponent implements OnInit {

  especialidad: string;
  sucursal: string;
  Doctor: string;
  fechaA: Date;
  horario: string;
  es: any;

  SelecEspecialidad: boolean;
  SelecSucursal: boolean;
  SelecDoctor: boolean;
  SelecFechaA: boolean;
  SelecHorario: boolean;


  constructor() { }

  ngOnInit(): void {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.SelecEspecialidad = false;
    this.SelecSucursal = false;
    this.SelecDoctor = false;
    this.SelecFechaA = false;
    this.SelecHorario = false;
  }

  ActivarAtributos(tipo){

    if (tipo == "E") {
      this.SelecEspecialidad = true;
    }
    if (tipo == "S") {
      this.SelecSucursal = true;
    }
    if (tipo == "D") {
      this.SelecDoctor = true;
    }
    if (tipo == "F") {
      console.log("entra");
      
      this.SelecFechaA = true;
    }
    if (tipo == "H") {
      this.SelecHorario = true;
    }
  }

}
