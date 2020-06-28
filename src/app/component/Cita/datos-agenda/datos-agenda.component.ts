import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
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
  selectedMed;
  calendarHorario: Date;
  invalidDates: Array<Date> = new Array<Date>();
  worksDate: Array<Date> = new Array<Date>();

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

  constructor(private MediwebServiceService: MediwebServiceService) {
  }

  ngOnInit(): void {

    let invalidDate = moment("10/06/2020", "DD/MM/YYYY").toDate();
    let workDate = moment("11/06/2020", "DD/MM/YYYY").toDate();
    let workDate2 = moment("12/06/2020", "DD/MM/YYYY").toDate();
    this.traerEspecialidad();

    this.invalidDates = [invalidDate];
    this.worksDate = [workDate, workDate2];
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'mm/dd/yy',
    }

    this.SelecEspecialidad = false;
    this.SelecSucursal = false;
    this.SelecDoctor = false;
    this.SelecFechaA = false;
    this.SelecHorario = false;
  }

  ActivarAtributos(tipo) {
    setTimeout(() => {
      if (tipo == "E") {
        this.SelecEspecialidad = true;
        console.log(this.especialidad);

        this.traerSucursales();
      }
      if (tipo == "S") {
        this.SelecSucursal = true;
        this.traerDoctores();
      }
      if (tipo == "D") {
        console.log(this.Doctor);
        
        this.SelecDoctor = true;
        this.obtenerDiasDetrabajo();
      }
      if (tipo == "F") {
        this.SelecFechaA = true;
      }
      if (tipo == "H") {
        this.SelecHorario = true;
      }
    }, 300);

  }

  checkDateForWork(date: any) {
    var calendarDate = new Date(date.year, date.month, date.day);
    calendarDate.setHours(0, 0, 0, 0);

    return this.isInArray(calendarDate);
  }

  isInArray(value: Date) {
    return !!this.worksDate.find(item => {
      return item.getTime() == value.getTime()
    });
  }

  async traerEspecialidad() {
    var respuesta = await this.MediwebServiceService.Traerespecialidad();
    var especialidades = JSON.parse(respuesta.toString());
    this.especialidades = especialidades;
  }

  async traerSucursales() {
    var req = {
      "id": this.especialidad["iIdEsp"].toString(),
      "nombre": this.especialidad["sNomEsp"].toString()
    }
    var respuesta = await this.MediwebServiceService.SucursalsxEspecialiad(req);
    var sucursales = JSON.parse(respuesta.toString());
    this.sucursales = sucursales;
    console.log(this.sucursales);
    
  }

  async traerDoctores() {
    var req = {
      "idSuc": this.sucursal["iIdSuc"].toString(),
      "iesp": this.especialidad["iIdEsp"].toString()
    }
    var respuesta = await this.MediwebServiceService.ObtenerDocXSucursalXEspecialidades(req);
    var doctores = JSON.parse(respuesta.toString());

    this.medico = doctores;
    console.log(this.medico);
  }

  obtenerDiasDetrabajo(){

    this.worksDate = [];
    var hoy  = moment().format("DD/MM/YYYY");
    var mes  = moment().format("MMM");
    console.log(moment().add(1, 'days').calendar());
    
    if (this.Doctor["sHorarCon"].includes("Lunes")) {
      
    }
    for (let index = 0; index < 46; index++) {

    }
  }

  imprimir(alo){
console.log(alo);

  }



}
