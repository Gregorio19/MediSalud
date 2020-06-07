import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-datos-agenda',
  templateUrl: './datos-agenda.component.html',
  styleUrls: ['./datos-agenda.component.scss']
})

export class DatosAgendaComponent implements OnInit {

    especialidades;
    sucursales;
    medico;
    selectedEsp: City;
    selectedSuc: City;
    selectedMed: City;
    calendarHorario: Date;

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
  options: any;

  overlays: any[];

  constructor() {   }

  ngOnInit(): void {
    this.especialidades = [
      {label:'Gastroenterologia', value:{id:1, name: 'Gastroenterologia'}},
      {label:'Internista', value:{id:2, name: 'Internista'}},
    ];
    this.sucursales = [
      {label:'Las Condes', value:{id:1, name: 'Las Condes'}},
      {label:'Providencia', value:{id:2, name: 'Providencia'}},
    ];
    this.medico = [
      {label:'Chicho', value:{id:1, name: 'Chicho'}},
      {label:'Cesar', value:{id:2, name: 'Cesar'}},
    ];
    this.options = {
        center: {lat: 36.890257, lng: 30.707417},
        zoom: 12
    };
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
