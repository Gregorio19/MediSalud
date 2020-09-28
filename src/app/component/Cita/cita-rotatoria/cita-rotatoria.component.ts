import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as moment from 'moment'

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-cita-rotatoria',
  templateUrl: './cita-rotatoria.component.html',
  styleUrls: ['./cita-rotatoria.component.scss'],
  providers: [MessageService]
})

export class CitaRotatoriaComponent implements OnInit {

  //Variable Clientes

  RUT: string;
  RutTitular: string;
  Nombre: string;
  NombreTitular: string;
  ApellidoP: string;
  ApellidoM: string;
  NUmTel: string;
  Direccion: string;
  Correo: string;
  fechaN: Date
  Prevision: SelectItem;
  sexo: string;
  titular: boolean;

  CrearCliente = false;


  minDate: Date;
  maxDate: Date;
  añoactual;
  es: any;

  //validaciones
  telefonovalido;
  emailvalido;
  Rutvalido;
  NombreValido;
  DireccionValida;

  telefonovalidotext;
  emailvalidotext;
  Rutvalidotext;
  NombreValidotext;
  DireccionValidatext;
  fechaValidatext;

  Clintes: any;
  Previciones: SelectItem[];

  ClienteAntiguo;
  CambioDatos;

  // Variables Agenda
  especialidades;
  sucursales;
  medico;
  selectedEsp: City;
  selectedSuc: City;
  selectedMed;
  calendarHorario: Date;
  invalidDates: Array<Date> = new Array<Date>();
  worksDate: Array<Date> = new Array<Date>();

  cliente = {};

  especialidad: string;
  sucursal: string;
  Doctor: string;
  fechaA: Date;
  horario: string;
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

  ListaHoras = [];


  horaselect = false;

  overlays: any[];

  RotatorioCita = true;
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1") {
      this.Router.navigate([""]);
    }
    this.RotatorioCita = true;
    this.CrearCliente = false;
    this.RUT = "";
    this.Correo = "";
    this.Direccion = "";
    this.NUmTel = "";
    this.Nombre = "";

    this.telefonovalido = true;
    this.emailvalido = true;
    this.Rutvalido = true;
    this.NombreValido = true;
    this.DireccionValida = true;

    this.telefonovalidotext = "";
    this.emailvalidotext = "";
    this.Rutvalidotext = "";
    this.NombreValidotext = "";
    this.DireccionValidatext = "";
    this.fechaValidatext = "";
    this.ClienteAntiguo = false;
    this.CambioDatos = false;

    this.GetPreviciones();
    this.GetClientes();
    this.sexo = "Masculino";
    this.titular = false;
    this.es = {
      firstDayOfWeek: 1,
      today: 'Hoy',
      clear: 'Borrar',
      closeText: "Cerrar",
      prevText: "Anterior",
      nextText: "Siguiente",
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      weekHeader: "Semana",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
      timeOnlyTitle: "Solo hora",
      timeText: "Tiempo",
      hourText: "Hora",
      minuteText: "Minuto",
      secondText: "Segundo",
      currentText: "Fecha actual",
      ampm: false,
      month: "Mes",
      week: "Semana",
      day: "Día",
      allDayText: "Todo el día",
      dateFormat: 'mm/dd/yy',
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    console.log(year);

    this.añoactual = "1915:" + year;
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    console.log(this.cliente);

    this.traerEspecialidad();
    this.GetClientes();
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };

    this.SelecEspecialidad = false;
    this.SelecSucursal = false;
    this.SelecDoctor = false;
    this.SelecFechaA = false;
    this.SelecHorario = false;

  }

  cambiosexo() {
    console.log(this.sexo);

  }

  async GetClientes() {

    var getcli = {
      "Tipo": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);

    this.Clintes = JSON.parse(respuesta.toString());
    console.log(this.Clintes);
  }

  async GetPreviciones() {

    var getcli = {
      "Tipo": "P"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);

    this.Previciones = JSON.parse(respuesta.toString());
    console.log(this.Previciones);
    this.Prevision = this.Previciones[0];
  }

  async AgregarCliente() {
    var fechaelegida;
    if (this.fechaN) {
      fechaelegida = this.fechaN.getUTCFullYear() + "-" + (this.fechaN.getUTCMonth() + 1) + "-" + this.fechaN.getUTCDate();
    }
    let today = new Date();
    var hoy = today.getUTCFullYear() + "-" + (today.getUTCMonth() + 1) + "-" + today.getUTCDate()
    console.log(hoy);

    this.telefonovalido = true;
    this.emailvalido = true;
    this.Rutvalido = true;
    this.NombreValido = true;
    this.DireccionValida = true;

    this.telefonovalidotext = "";
    this.emailvalidotext = "";
    this.Rutvalidotext = "";
    this.NombreValidotext = "";
    this.DireccionValidatext = "";
    this.fechaValidatext = "";
    if (this.RUT == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.Nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }

    if (this.Nombre.length <= 3) {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede tener menos de 3 letras";
    }

    if (this.fechaN == undefined) {
      this.fechaValidatext = "La fecha no puede estar vacia";
    }

    if (this.NUmTel == "") {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono no puede estar vacio";
    }

    if (this.Correo == "") {
      this.emailvalido = false;
      this.emailvalidotext = "El email no puede estar vacio";
    }
    if (fechaelegida > hoy) {
      this.emailvalido = false;
      this.fechaValidatext = "La fecha no puede ser mayor al dia actual";
    }

    if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false) {
      return;
    }
    else {
      var estitu = this.titular == true ? 0 : 1;
      console.log(this.sexo);

      var susexo = this.sexo == "Masculino" ? 'M' : 'F';
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      console.log(this.fechaN);

      var Addcli = {
        "id": "0",
        "rut": rutadd,
        "nombre": this.Nombre,
        "tel": this.NUmTel,
        "mail": this.Correo,
        "direccion": this.Direccion,
        "cumpleaños": this.fechaN.getUTCFullYear() + "-" + (this.fechaN.getUTCMonth() + 1) + "-" + this.fechaN.getUTCDate(),
        "idprev": this.Prevision["iIdPrev"],
        "titular": estitu,
        "sexo": susexo,
        "CambioDato": this.CambioDatos
      }

      console.log(Addcli);

      var exitcli = this.Clintes.filter(function (array) {
        if (array.sRutCli.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == rutadd.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
          return array;
        }
      });
      if (exitcli.length == 0) {
        localStorage.setItem('Cliente', JSON.stringify(Addcli));
        var respuesta = await this.MediwebServiceService.AgregarCliente(Addcli);
        console.log(respuesta);
        await this.GetClientes();
        this.CompararCliente();
        this.ClienteAntiguo = true;
      }
      else {
        localStorage.setItem('Cliente', JSON.stringify(Addcli));
      }

    }
  }

  CompararCliente() {
    var clienteEncontrado = false;
    console.log(this.Prevision);
    var nrut = this.RUT.replace(".", "").replace(".", "").replace(".", "").trim();
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
        clienteEncontrado = true;
        this.ClienteAntiguo = true;
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString());
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];
        this.Prevision = this.Previciones[element["iIdPrev"]];
        if (element["btit"] == true) {
          this.titular = false;
        }
        else {
          this.titular = true;
        }

        if (element["sSexo"] == "F") {
          this.sexo = "Femenino";
        }
        else {
          this.sexo = "Masculino";
        }
        this.CrearCliente = false;
        this.Rutvalidotext = "";
        this.Rutvalido = true;
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());

        this.cliente = {
          "id": element["iIdCli"],
          "rut": this.RUT,
          "nombre": element["sNombre"],
          "tel": element["sNumTel"],
          "mail": element["sMail"],
          "direccion": element["sDirec"],
          "cumpleaños": element["dfechNac"].toString(),
          "idprev": element["iIdPrev"]
        }
      }
    });

    if (clienteEncontrado == false) {
      this.CrearCliente = true;
      this.ClienteAntiguo = false;
      this.CambioDatos = false;
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
      console.log(rutadd);

      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else {
        this.Rutvalidotext = "";
      }
      this.LimpiarDatosCliente();
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cliente no encontrado', detail: 'El cliente no se encuentra registrado, por favor ingrese sus datos y agreguelo para continuar.' });
    }
  }

  LimpiarDatosCliente() {
    this.Nombre = "";
    this.fechaN = new Date();
    this.Direccion = "";
    this.NUmTel = "";
    this.Correo = "";
    this.Prevision = this.Previciones[0];
  }

  ValidarRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
      return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (this.dv(rut) == digv);
  }

  dv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }

  compexreg_email() {

    if (this.Correo != "") {
      if (!/^([a-zA-Z0-9\._-])+@{1}([a-zA-Z0-9])+\.{1}([a-zA-Z]){2,3}$/.test(this.Correo)) {
        this.emailvalido = false;
        this.emailvalidotext = "Formato de correo invalido";
      }
      else {
        this.emailvalido = true;
        this.emailvalidotext = "";
      }

    }
    else {
      this.emailvalido = false;
      this.emailvalidotext = "El correo no puede estar vacio";
    }
  }

  compexreg_tel() {

    if (this.NUmTel != "") {
      if (!/^\+{1}([0-9]){11}$/.test(this.NUmTel)) {
        this.telefonovalido = false;
        this.telefonovalidotext = "El formato de telefono es invalido";
      }
      else {
        this.telefonovalido = true;
        this.telefonovalidotext = "";
      }
    }
    else {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono se encuentra vacio";
    }
  }

  UsuarioAntiguo() {
    this.CambioDatos = true;
    this.MessageService.clear();
    this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cambio Bloqueado', detail: 'Los datos asociado a este rut se encuentran bloqueados por cuestiones de seguridad, se enviara un notificacion a nuestros encargados para realizar los cambios en su proxima visita' });
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

  //Meyodos Agenda
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
        this.ImagenUrl = "http://200.104.114.157/ImgenesDoctor/" + this.Doctor["sRutDoc"] + ".jpg";
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
    this.medico.forEach(element => {
      element["sNomIma"] = "http://200.104.114.157/ImgenesDoctor/" + element["sRutDoc"] + ".jpg"
    });
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
    var dias = this.Doctor["sHorarCon"].split(",");
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
        Mmin = Mmin - parseInt(this.Doctor["sHoraAte"]);
        var mintot = ((horaF - horaI) * 60) + Mmin;
        console.log(mintot);

        var CantHoras = mintot / parseInt(this.Doctor["sHoraAte"]);
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
              if (this.Doctor["sHoraOcu"]) {
                if (this.Doctor["sHoraOcu"].includes(Fbusqueda)) {
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

          let minutos = (moment(HoraS, 'HH:mm:ss').add(parseInt(this.Doctor["sHoraAte"]), 'minutes').format('HH:mm'));
          let Fbusqueda = fecha + " " + minutos;
          console.log(Fbusqueda);
          if (minutos < horaFinal) {
            if ((moment().format('YYYY-MM-DD') == fecha) && (parseInt(moment(HoraS, 'HH:mm:ss').format('HH'))) < (parseInt(moment().format('HH')) + 1)) {

            }
            else {
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
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una especialidad' });
    }
    else if (this.sucursal == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una Sucursal' });
    }
    else if (this.Doctor == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un Doctor' });
    }
    else if (this.FechaSelect == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un dia para cita' });
    }
    else if (this.FechaSelect < moment().format("YYYY-MM-DD")) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El dia elegido debe ser mayor a la fecha actual' });
    }
    else if (this.HoraSelect == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una hora para cita' });
    }
    else {

      var req = {
        "idCita": "1",
        "idCliente": this.cliente["id"] + "",
        "idSucursal": this.sucursal["iIdSuc"].toString(),
        "idDoctor": this.Doctor["iIdDoc"].toString(),
        "idEsp": this.especialidad["iIdEsp"].toString(),
        "idPrev": this.cliente["idprev"] + "",
        "fecha": this.FechaSelect.toString(),
        "hora": moment(this.HoraSelect.toString()).format('HH:mm'),
        "descripcion": "",
        "cambioDatos": "0"
      }
      console.log(req);
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Cita Ingresada', detail: 'La Cita se esta ingresando al sistema por favor espere' });
      var respuesta = await this.MediwebServiceService.AgregarCita(req);
      var respok = JSON.parse(respuesta.toString());
      if (respok[0][""] == "OK") {
        var req2 = {
          "idCita": "1",
          "idCliente": this.cliente["id"] + "",
          "idSucursal": this.sucursal["iIdSuc"].toString(),
          "idDoctor": this.Doctor["iIdDoc"].toString(),
          "idEsp": this.especialidad["iIdEsp"].toString(),
          "idPrev": this.cliente["idprev"] + "",
          "fecha": this.FechaSelect.toString() + " " + moment(this.HoraSelect.toString()).format('HH:mm'),
          "hora": "",
          "descripcion": "",
          "cambioDatos": "",
          "nDoctor":  this.Doctor["sNombre"],
          "nSucursal": this.sucursal["sNombre"],
          "nEspecialidad": this.especialidad["sNomEsp"],
          "clienteEmail": this.cliente["mail"]
        }
        console.log(req2);
        var respuesta2 = await this.MediwebServiceService.EnviarCorreoSobrecupo(req2);
        console.log(respuesta2);
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Cita Ingresada Correctamente', detail: 'La Cita ingresa ha sido regristrada correctamente' });
      }
      else{
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Cita No Ingresada', detail: 'La Citas ingresada no ha sido registrada' });
      }
      this.SelecEspecialidad = false;
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
      this.especialidad = undefined;
      console.log(respuesta);
    }
  }

  imprimir(alo) {
    console.log(alo);

  }
  ImprimirHora() {
    return moment(this.HoraSelect.toString()).format('HH:mm');
  }

  PushHorarios(HoraSelect) {

    var caninsert = true;
    var actualizada = false;
    this.ListaHoras.forEach(element => {
      if (element.Fecha == this.FechaSelect && element.Hora == HoraSelect) {
        caninsert = false;
      }
      if (element.Fecha == this.FechaSelect && element.Hora != HoraSelect) {
        caninsert = false;
        actualizada = true;
        element.Hora = HoraSelect;
      }
    });

    if (caninsert == true) {
      if (this.ListaHoras.length < 10) {
        this.ListaHoras.push({ "Fecha": this.FechaSelect, "Hora": HoraSelect });
        this.ListaHoras = this.ListaHoras.sort(function (a, b) {
          if (a.Fecha > b.Fecha) {
            return 1;
          }
          if (a.Fecha < b.Fecha) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Maximo de Horas', detail: 'Solo se permiten agregar diez hora' });
      }

    }
    else {
      if (actualizada == false) {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Hora Previamente registrada', detail: 'La hora que a seleccionado se encuentra ya registada ese mismo dia' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Hora Actualizada registrada', detail: 'La fecha que a seleccionado ya se encuentra ya registada, por lo que la hora ha sido actulizada' });
      }

    }
  }

  ordernarhoras(pos) {
    this.ListaHoras.splice(pos, 1);
  }

  async AgregarCitaRotatoria() {
    var horasrotatorias = "";
    if (this.especialidad == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una especialidad' });
    }
    else if (this.sucursal == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una Sucursal' });
    }
    else if (this.Doctor == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un Doctor' });
    }
    else if (this.FechaSelect == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar un dia para cita' });
    }
    else if (this.FechaSelect < moment().format("YYYY-MM-DD")) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El dia elegido debe ser mayor a la fecha actual' });
    }
    else if (this.ListaHoras.length == 0) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe Seleccionar una hora para cita' });
    }
    else {
      this.ListaHoras.forEach(element => {
        horasrotatorias += element.Fecha + " " + element.Hora + ","
      });
      horasrotatorias = horasrotatorias.substring(0, horasrotatorias.length - 1);

      var req = {
        "idCita": "1",
        "idCliente": this.cliente["id"] + "",
        "idSucursal": this.sucursal["iIdSuc"].toString(),
        "idDoctor": this.Doctor["iIdDoc"].toString(),
        "idEsp": this.especialidad["iIdEsp"].toString(),
        "idPrev": this.cliente["idprev"] + "",
        "fecha": horasrotatorias,
        "hora": "",
        "descripcion": "",
        "cambioDatos": "",
        "nDoctor":  this.Doctor["sNombre"],
        "nSucursal": this.sucursal["sNombre"],
        "nEspecialidad": this.especialidad["sNomEsp"],
        "clienteEmail": this.cliente["mail"]
      }
      console.log(req);
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Citas Ingresadas', detail: 'Las Citas se estan ingresando al sistema por favor espere' });
      var respuesta = await this.MediwebServiceService.CrearCitasRotatoria(req);
      console.log(respuesta);
      var respok = JSON.parse(respuesta.toString());
      if (respok[0][""] == "OK") {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Citas Ingresadas Correctamente', detail: 'Las Citas ingresas han sidos regristradas correctamente' });
        this.SelecEspecialidad = false;
        this.SelecSucursal = false;
        this.SelecDoctor = false;
  
        this.sucursales = undefined;
        this.medico = undefined;
        this.worksDate = [];
        this.Horas = [];
        this.ListaHoras = [];
  
        this.sucursal = undefined;
        this.Doctor = undefined;
        this.FechaSelect = undefined;
        this.HoraSelect = undefined;
        this.especialidad = undefined;
      }
      else{
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Citas No Ingresadas', detail: 'Las Citas ingresas no han sidos registradas' });
      }

    }
  }
}
