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
  Horas: any;

  SelecEspecialidad: boolean;
  SelecSucursal: boolean;
  SelecDoctor: boolean;
  SelecFechaA: boolean;
  SelecHorario: boolean;
  options: any;
  FechaSelect;
  HoraSelect;
  Descripcion;

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

  ActivarAtributos(tipo, map) {
    setTimeout(() => {
      if (tipo == "E") {
        this.SelecEspecialidad = true;
        console.log(this.especialidad);

        this.traerSucursales();
      }
      if (tipo == "S") {
        this.SelecSucursal = true;

        var Latitud:number = parseFloat(this.sucursal["slati"]);
        var Longitud:number = parseFloat(this.sucursal["slong"]);

        console.log(Latitud);
        console.log(Longitud);
        
        

        map.setCenter({ lat: Latitud, lng: Longitud });
        map.setZoom(14);
        this.overlays = [new google.maps.Marker({ position: { lat: Latitud, lng: Longitud }, title: "mapa", draggable: false })];

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

  obtenerDiasDetrabajo() {

    this.worksDate = [];
    var hoy = moment().format("DD/MM/YYYY");
    var mes = moment().format("MMM");
    console.log(moment(moment().add(5, 'day').format("DD/MM/YYYY")).toDate());


    for (let index = 0; index < 665; index++) {
      if (this.Doctor["sHorarCon"].includes("Lunes")) {
        if (moment().add(index, 'day').format("dddd") == "Monday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Martes")) {
        if (moment().add(index, 'day').format("dddd") == "Tuesday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Miercoles")) {
        if (moment().add(index, 'day').format("dddd") == "Wednesday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Jueves")) {
        if (moment().add(index, 'day').format("dddd") == "Thursday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Viernes")) {
        if (moment().add(index, 'day').format("dddd") == "Friday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Sabado")) {
        if (moment().add(index, 'day').format("dddd") == "Saturday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["sHorarCon"].includes("Domingo")) {
        if (moment().add(index, 'day').format("dddd") == "Sunday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
    }
  }

  onSelect($event) {
    console.log("entro", $event);

    let day = new Date($event).getDate();
    let month = new Date($event).getMonth();
    let year = new Date($event).getFullYear();
    month += 1;
    console.log(year);
    console.log(month);
    console.log(day);
    let diaelegido = month + "/" + day + "/" + year;
    this.FechaSelect = moment(diaelegido).format("YYYY-MM-DD");
    let newday = moment(moment(diaelegido).format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
    console.log(moment(newday).format("dddd"));

    if (moment(newday).format("dddd") == "Monday") {
      this.calcularHorarios("Lunes", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Tuesday") {
      this.calcularHorarios("Martes", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Wednesday") {
      this.calcularHorarios("Miercoles", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Thursday") {
      this.calcularHorarios("Jueves", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Friday") {
      this.calcularHorarios("Viernes", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Saturday") {
      this.calcularHorarios("Sabado", this.FechaSelect);
    }
    if (moment(newday).format("dddd") == "Sunday") {
      this.calcularHorarios("Domingo", this.FechaSelect);
    }
  }
  calcularHorarios(dia, fecha) {
    var dias = this.Doctor["sHorarCon"].split(",");
    this.Horas = [];
    dias.forEach(element => {
      if (element.includes(dia)) {
        var horaI = parseInt(element.split(";")[1]);
        var minI = parseInt(element.split(";")[2]);
        var horaF = parseInt(element.split(";")[3]);
        var minF = parseInt(element.split(";")[4]);
        var mintot = ((horaF - horaI) * 60) + (minI - minF)
        var CantHoras = mintot / parseInt(this.Doctor["sHoraAte"]);
        var HoraS = horaI + ":" + minI + ":" + ":00";
        for (let index = 0; index < CantHoras; index++) {
          let minutos = (moment(HoraS, 'HH:mm:ss').add(parseInt(this.Doctor["sHoraAte"]), 'minutes').format('HH:mm'));
          let Fbusqueda = fecha + " " + minutos;
          console.log(Fbusqueda);
          if (this.Doctor["sHoraOcu"]) {
            if (this.Doctor["sHoraOcu"].includes(Fbusqueda)) {
              this.Horas.push({ "Hora": minutos, "disp": false })
            }
            else {
              this.Horas.push({ "Hora": minutos, "disp": true })
            }
          }
          else {
            this.Horas.push({ "Hora": minutos, "disp": true })
          }

          HoraS = minutos;
        }
      }
    });

    console.log(this.Horas);


  }


  async AgregarCita() {

    var req = {
      "idCita": "1",
      "idCliente": "1",
      "idSucursal": this.sucursal["iIdSuc"].toString(),
      "idDoctor": this.Doctor["iIdDoc"].toString(),
      "idEsp": this.especialidad["iIdEsp"].toString(),
      "idPrev": "1",
      "fecha": this.FechaSelect.toString(),
      "hora": this.HoraSelect.toString(),
      "descripcion": this.Descripcion.toString()
    }

    console.log(req);
    var respuesta = this.MediwebServiceService.AgregarCita(req);
    console.log(respuesta);

  }
  imprimir(alo) {
    console.log(alo);

  }



}
