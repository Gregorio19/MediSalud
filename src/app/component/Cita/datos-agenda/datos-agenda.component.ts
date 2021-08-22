import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-datos-agenda',
  templateUrl: './datos-agenda.component.html',
  styleUrls: ['./datos-agenda.component.scss'],
  providers: [MessageService]
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

  cliente

  especialidad: string;
  sucursal: string;
  Doctor: string;
  fechaA: Date;
  horario: string;
  es: any;
  Horas: any;

  ImagenUrl: string;

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
  Clintes;

  horaselect = false;

  CargaCompleta;

  constructor(private MediwebServiceService: MediwebServiceService, private messageService: MessageService, private Router: Router) {
  }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('Cliente'));
    console.log(this.cliente);
    this.CargaCompleta = true;
    this.traerEspecialidad();
    this.GetClientes();
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
    this.horaselect = false;
    setTimeout(() => {
      if (tipo == "E") {
        this.SelecEspecialidad = true;
        this.SelecSucursal = false;
        this.SelecDoctor = false;

        this.sucursales = undefined;
        this.medico = undefined;
        this.worksDate = [];
        this.Horas = [];

        this.sucursal = undefined;
        this.Doctor = undefined;
        this.FechaSelect = undefined;
        this.HoraSelect = undefined;


        this.traerSucursales();
      }
      if (tipo == "S") {
        this.SelecSucursal = true;
        this.SelecDoctor = false;

        this.medico = undefined;
        this.worksDate = [];
        this.Horas = [];

        this.Doctor = undefined;
        this.FechaSelect = undefined;
        this.HoraSelect = undefined;

        var Latitud: number = parseFloat(this.sucursal["slati"]);
        var Longitud: number = parseFloat(this.sucursal["slong"]);

        console.log(Latitud);
        console.log(Longitud);



        map.setCenter({ lat: Latitud, lng: Longitud });
        map.setZoom(14);
        this.overlays = [new google.maps.Marker({ position: { lat: Latitud, lng: Longitud }, title: "mapa", draggable: false })];

        this.traerDoctores();
      }
      if (tipo == "D") {
        console.log(this.Doctor);
        this.ImagenUrl = "http://demo.nexacon.cl/AgendaApi/ImgDoctor/" + this.Doctor["nomIma"] + ".jpg";
        this.SelecDoctor = true;
        this.worksDate = [];
        this.Horas = [];

        this.FechaSelect = undefined;
        this.HoraSelect = undefined;
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
    var getcli = {
      "acc": "E"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.especialidades = respuesta["dataEsp"];
      console.log(this.especialidades);
    }
  }

  async traerSucursales() {
    var req = {
      "acc": "S",
      "idEsp": this.especialidad["iIdEsp"],
      "idSuc": 0
    }
    console.log(req);
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.ConsDetCitDoc(req);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      var sucursales = respuesta["datS"];
      this.sucursales = sucursales;
      console.log(this.sucursales);
    }
  }

  async traerDoctores() {
    var req = {
      "acc": "D",
      "idEsp": this.especialidad["iIdEsp"],
      "idSuc": this.sucursal["idSuc"]
    }
    console.log(req);
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.ConsDetCitDoc(req);
    this.CargaCompleta = false;
    console.log(respuesta);
    
    if (respuesta["status"]) {
      var doctores = respuesta["datD"];
      this.medico = doctores;
      this.medico.forEach(element => {
        element["sNomIma"] = "http://demo.nexacon.cl/AgendaApi/ImgDoctor/" + element["nomIma"] + ".jpg"
      });
      console.log(this.medico);
    }
  }

  async GetClientes() {

    var getcli = {
      "acc": "C"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.Clintes = respuesta["dataCli"];
      console.log(this.Clintes);
    }
    console.log(this.Clintes);
  }

  obtenerDiasDetrabajo() {

    this.worksDate = [];
    var hoy = moment().format("DD/MM/YYYY");
    var mes = moment().format("MMM");
    console.log(moment(moment().add(5, 'day').format("DD/MM/YYYY")).toDate());


    for (let index = 0; index < 665; index++) {
      if (this.Doctor["horCon"].includes("Lunes")) {
        if (moment().add(index, 'day').format("dddd") == "Monday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Martes")) {
        if (moment().add(index, 'day').format("dddd") == "Tuesday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Miercoles")) {
        if (moment().add(index, 'day').format("dddd") == "Wednesday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Jueves")) {
        if (moment().add(index, 'day').format("dddd") == "Thursday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Viernes")) {
        if (moment().add(index, 'day').format("dddd") == "Friday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Sabado")) {
        if (moment().add(index, 'day').format("dddd") == "Saturday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
      if (this.Doctor["horCon"].includes("Domingo")) {
        if (moment().add(index, 'day').format("dddd") == "Sunday") {
          let newday = moment(moment().add(index, 'day').format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
          this.worksDate.push(newday);
        }
      }
    }
  }

  onSelect($event) {
    this.Horas = [];
    this.HoraSelect = undefined;
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
    this.horaselect = false;
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
    var dias = this.Doctor["horCon"].split(",");
    this.Horas = [];
    dias.forEach(element => {
      if (element.includes(dia)) {
        var horaI = parseInt(element.split(";")[1]);
        var minI = parseInt(element.split(";")[2]);
        var horaF = parseInt(element.split(";")[3]);
        var minF = parseInt(element.split(";")[4]);
        console.log("horas tomasdas");

        console.log(horaI);
        console.log(minI);
        console.log(horaF);
        console.log(minF);
        var horaFinal = horaF + ":" + minF;
        var Mmin = minI - minF;
        if (Mmin < 0) {
          Mmin = Mmin * -1;
        }
        Mmin = Mmin - parseInt(this.Doctor["horAte"]);
        var mintot = ((horaF - horaI) * 60) + Mmin;
        console.log(mintot);

        var CantHoras = mintot / parseInt(this.Doctor["horAte"]);
        console.log(CantHoras);

        var HoraS = horaI + ":" + minI + ":" + "00";
        for (let index = 0; index < CantHoras; index++) {

          if (index == 0) {
            var primerminuto = (moment(HoraS, 'HH:mm:ss').format('HH:mm'));
            let Fbusqueda = fecha + " " + primerminuto;
            console.log(Fbusqueda);
            console.log("HOY " + moment().format('YYYY-MM-DD'));
            console.log("FEHCA A COMPARAR " + fecha);
            console.log("hora actual mas 1 " + (parseInt(moment().format('HH')) + 1));
            console.log("hora a comprar " + (parseInt(moment(HoraS, 'HH:mm:ss').format('HH'))));



            (moment().format('YYYY-MM-DD') == fecha) && (parseInt(moment(HoraS).format('HH'))) < (parseInt(moment().format('HH')) + 1)
            if ((moment().format('YYYY-MM-DD') == fecha) && (parseInt(moment(HoraS, 'HH:mm:ss').format('HH'))) < (parseInt(moment().format('HH')) + 1)) {

            }
            else {
              if (this.Doctor["horOcu"]) {
                if (this.Doctor["horOcu"].includes(Fbusqueda)) {
                  this.Horas.push({ "Hora": primerminuto, "disp": false })
                }
                else {
                  this.Horas.push({ "Hora": primerminuto, "disp": true })
                }
              }
              else {
                this.Horas.push({ "Hora": primerminuto, "disp": true })
              }
            }

          }

          let minutos = (moment(HoraS, 'HH:mm:ss').add(parseInt(this.Doctor["horAte"]), 'minutes').format('HH:mm'));
          let Fbusqueda = fecha + " " + minutos;
          console.log(Fbusqueda);
          if (minutos < horaFinal) {
            if ((moment().format('YYYY-MM-DD') == fecha) && (parseInt(moment(HoraS, 'HH:mm:ss').format('HH'))) < (parseInt(moment().format('HH')) + 1)) {

            }
            else {
              if (this.Doctor["horOcu"]) {
                if (this.Doctor["horOcu"].includes(Fbusqueda)) {
                  this.Horas.push({ "Hora": minutos, "disp": false })
                }
                else {
                  this.Horas.push({ "Hora": minutos, "disp": true })
                }
              }
              else {
                this.Horas.push({ "Hora": minutos, "disp": true })
              }
            }
          }

          HoraS = minutos;
        }
      }
    });
    if (this.Horas.length == 0) {
      this.horaselect = true;
    }
    console.log(this.Horas);


  }


  async AgregarCita() {

    if (this.especialidad == undefined) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una especialidad' });
    }
    else if (this.sucursal == undefined) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una Sucursal' });
    }
    else if (this.Doctor == undefined) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un Doctor' });
    }
    else if (this.FechaSelect == undefined) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un dia para cita' });
    }
    else if (this.FechaSelect < moment().format("YYYY-MM-DD")) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El dia elegido debe ser mayor a la fecha actual' });
    }
    else if (this.HoraSelect == undefined) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una hora para cita' });
    }
    else {

      var clienteSelect
      console.log(this.Clintes);

      this.Clintes.forEach(element => {
        if (element["sRutCli"] == this.cliente.rutCli) {
          clienteSelect = element;
          console.log(clienteSelect);
        }
      });

      var req = {
        "idCli": clienteSelect["iIdCli"],
        "idMas": this.cliente["IdMasc"],
        "idSuc": this.sucursal["idSuc"],
        "idDoc": this.Doctor["iddoc"],
        "idPre": clienteSelect["iIdPrev"],
        "idEsp": this.especialidad["iIdEsp"],
        "fecAge": this.FechaSelect.toString() + "T" + this.HoraSelect.toString() + ":00.279Z",
        "datoCita": this.Descripcion != undefined ? this.Descripcion : "",
        "camCli": this.cliente["camCli"]
      }
      // {
      //   "idCita": "1",
      //   "idCliente": clienteSelect["iIdCli"] + "",
      //   "idSucursal": this.sucursal["iIdSuc"].toString(),
      //   "idDoctor": this.Doctor["iddoc"].toString(),
      //   "idEsp": this.especialidad["iIdEsp"].toString(),
      //   "idPrev": clienteSelect["iIdPrev"] + "",
      //   "fecha": this.FechaSelect.toString(),
      //   "hora": this.HoraSelect.toString(),
      //   "descripcion": this.Descripcion != undefined ? this.Descripcion : "",
      //   "cambioDatos": this.cliente.CambioDato == true ? "1" : "0"
      // }

    

      console.log(req);
      this.CargaCompleta = true;
      var respuesta = await this.MediwebServiceService.AgregarCita(req);
      this.CargaCompleta = false;
      console.log(respuesta);
      if (respuesta["status"]== false) {
        this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'No se pudo Agendar', detail: respuesta["message"] });
      }
      else{
        var Cita = {
          "Sucursal": this.sucursal["sNombre"].toString(),
          "Direccion": this.sucursal["sDirec"].toString(),
          "Doctor": this.Doctor["nomDoc"].toString(),
          "Especialidad": this.especialidad["sNomEsp"].toString(),
          "fecha": this.FechaSelect.toString(),
          "hora": this.HoraSelect.toString(),
          "descripcion": this.Descripcion != undefined ? this.Descripcion : "",
          "idMas": this.cliente["IdMasc"],
          "Nombremasc": this.cliente["NombreMasc"],
          "codigoCita": respuesta["codAge"]+""
        }
        localStorage.setItem('DatosCita', JSON.stringify(Cita));
        this.Router.navigate(["Resumen"]);
      }
    }


  }
  imprimir(alo) {
    console.log(alo);

  }

  formateaRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
      var sinPuntos = actual.replace(/\./g, "");
      var actualLimpio = sinPuntos.replace(/-/g, "");
      var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      var rutPuntos = "";
      var i = 0;
      var j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        var letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rutPuntos = "." + rutPuntos;
        }
        j++;
      }
      var dv = actualLimpio.substring(actualLimpio.length - 1);
      rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
  }


}
