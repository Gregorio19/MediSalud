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

  // Mascota
  CargaCompleta;

  NombreMascota: string;
  fechaNMascota: Date;
  RazaMasc: SelectItem;
  TamaMasc: SelectItem;
  Tipomas: SelectItem;
  ColorMasc: string;
  IDdueño;

  RazasMasc;
  TamanosMasc;
  TioposMAsc;
  TodasLasRaza;
  Mascli;
  Mascotaselect;

  MascotaEncontrada = false;
  Masdeunamascota = false;
  nuevamacota = true;
//fin mascota

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

  clienteEncontradobtn;

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

  url

  RotatorioCita = true;
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  async ngOnInit() {
    this.url = await this.MediwebServiceService.getConfig();
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
    }

    this.CargaCompleta = false;
    this.RotatorioCita = true;
    this.CrearCliente = false;
    this.clienteEncontradobtn = false;
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
    this.ColorMasc ="";
    this.NombreMascota = "";

    this.telefonovalidotext = "";
    this.emailvalidotext = "";
    this.Rutvalidotext = "";
    this.NombreValidotext = "";
    this.DireccionValidatext = "";
    this.fechaValidatext = "";
    this.ClienteAntiguo = false;
    this.CambioDatos = false;
    this.Mascotaselect = [];

   // this.GetPreviciones();
    //this.GetClientes();
    this.GetRazas();
    this.GetTamaMAsc();
    this.GetTiposMascotas();
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
    //this.GetClientes();
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
      "acc": "C"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    console.log(respuesta);
    if (respuesta["status"]) {
      this.Clintes = respuesta["dataCli"];
      console.log(this.Clintes);
    }
  }

  async GetPreviciones() {

    var getcli = {
      "acc": "P"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.Previciones = respuesta["dataPre"];
      console.log(this.Previciones);
      this.Prevision = this.Previciones[0];
    }
  }

  async AgregarCliente() {
    
    var fechavalida = true;
    
    var fechaelegida;
    if (this.fechaN) {
      fechaelegida = this.getfechas(this.fechaN);
    }
    let today = new Date();
    var hoy = this.getfechas(today);
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
    
      if (this.fechaNMascota) {
      fechaelegida = this.getfechas(this.fechaNMascota);
    }
    

    if (this.fechaNMascota == undefined) {
      fechavalida = false;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
      return;
    }
    if (fechaelegida > hoy) {
      fechavalida = false;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
      return;
    }

     if (this.NombreMascota.length <3 || this.ColorMasc.length <3) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'Debe LLenar todos los datos de la mascota' });
      return;
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
        "acc": "N",
        "idcli": 0,
        "rutCli": rutadd,
        "nom": this.Nombre,
        "fono": this.NUmTel,
        "direc": this.Direccion,
        "mail": this.Correo,
        "nac": this.getfechas(this.fechaN),
        "idPrev": 0,
        "tit": estitu == 1 ? true : false,
        "sex": susexo
      }




      var Addcli2 = {
        "acc": "N",
        "idcli": 0,
        "rutCli": rutadd,
        "nom": this.Nombre,
        "fono": this.NUmTel,
        "direc": this.Direccion,
        "mail": this.Correo,
        "nac": this.getfechas(this.fechaN),
        "idPrev": 0,
        "tit": estitu == 1 ? true : false,
        "sex": susexo,
        "camCli": this.CambioDatos,
        "NombreMasc": this.NombreMascota,
        "IdMasc": this.Mascotaselect ? this.Mascotaselect["iIdMascota"] : 0
      }

      this.cliente = {
        "id": 0,
        "rut": this.RUT,
        "nombre": this.Nombre,
        "tel":  this.NUmTel,
        "mail":   this.Correo,
        "direccion": this.Direccion,
        "cumpleaños": this.getfechas(this.fechaN),
        "idprev": 0,
        "NombreMasc": this.NombreMascota,
        "IdMasc": this.Mascotaselect ? this.Mascotaselect["iIdMascota"] : 0
      }



      console.log(Addcli2);
      var exitcli = !this.Clintes["status"];
      // var exitcli = this.Clintes.filter(function (array) {
      //   if (array.sRutCli.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == rutadd.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
      //     return array;
      //   }
      //});
      if (exitcli) {
        localStorage.setItem('Cliente', JSON.stringify(Addcli2));
        this.CargaCompleta = true;
        var respuesta = await this.MediwebServiceService.AgregarCliente(Addcli);
        console.log(respuesta);
        if (respuesta["status"]) {
          this.IDdueño = respuesta["idCliente"];
        }

        if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
          await this.CrearMascota();
        }else{
          await this.ActualizarMascota();
        }
        this.CargaCompleta = false;
        //this.Router.navigate(["Agendar"]);
        this.ClienteAntiguo = true;
      }
      else {
        localStorage.setItem('Cliente', JSON.stringify(Addcli2));
        if (this.Mascotaselect) {
          if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
            await this.CrearMascota();
          }else{
            await this.ActualizarMascota();
          }
        }
        else {
          this.CargaCompleta = true;
          if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
            await this.CrearMascota();
          }
          else{
            await this.ActualizarMascota();
          }
        }
        //this.Router.navigate(["Agendar"]);
        this.ClienteAntiguo = true;
        this.CargaCompleta = false;
      }

    }
  }
  async reserva(){

    if (this.NombreMascota == undefined || this.NombreMascota == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe llenar los datos del cliente y la mascota' });
      return;
    }

    if (this.ColorMasc == undefined || this.ColorMasc == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe llenar los datos del cliente y la mascota' });
      return;
    }

    if (this.fechaNMascota == undefined || this.fechaNMascota == null) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe llenar los datos del cliente y la mascota' });
      return;
    }

    if (this.Mascotaselect["sNomMascota"] == "Agregar nueva mascota") {
      await this.CrearMascota();
    }
    else{
      this.cliente["NombreMasc"] = this.NombreMascota;
      this.cliente["IdMasc"] = this.Mascotaselect["iIdMascota"];
    }

    this.ClienteAntiguo = true;

  }
  async GetCliente(req) {

    var getcli = {
      "rut": req
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.TraerClienteRut(getcli);
    this.CargaCompleta = false;
       this.Clintes = respuesta;
  }

  

  async CompararCliente() {
    if (this.RUT.length < 5) {
      this.Rutvalidotext ="ingrese un rut valido"
      return;
    }
    this.CargaCompleta = true;
    var clienteEncontrado = false;
    var esto = this;

    
    var nrut = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
    nrut = nrut.replace(".", "").replace(".", "").replace(".", "").trim();

    await this.GetCliente(nrut)

    if (this.Clintes["status"]== true) {
      this.CrearCliente = false;
      this.cliente = this.Clintes;
      this.cliente["nombre"] = this.Clintes["nomCli"];
      this.cliente["rut"] = this.formateaRut(this.RUT);
      this.cliente["mail"] = this.Clintes["correo"];
      this.cliente["id"] = this.Clintes["idCli"];
      this.Clintes["sRutCli"] = this.formateaRut(this.RUT);
      
      var element = this.Clintes;
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
        clienteEncontrado = true;
        this.clienteEncontradobtn = true;
       // this.ClienteAntiguo = true;
        this.IDdueño = element["idCli"]
        this.Nombre = element["nomCli"];
        this.Correo = element["correo"];
        this.fechaN = new Date(element["fechNac"].toString());
        this.NUmTel = element["numTele"];
        this.Direccion = element["direccion"];

        // this.Previciones.filter(function (array) {
        //   if (element["iIdPrev"] == array["iIdPrev"]) {
        //     esto.Prevision = array;
        //   }
        // });
        if (element["btit"] == true) {
          this.titular = false;
        }
        else {
          this.titular = true;
        }

        if (element["sexo"] == "F") {
          this.sexo = "Femenino";
        }
        else {
          this.sexo = "Masculino";
        }
        this.Rutvalidotext = "";
        this.Rutvalido = true;
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
        //console.log(this.Prevision);
      }
    }

    if (clienteEncontrado == false) {
      this.LimpiarDatosCliente()
      this.MascotaEncontrada =false;
      this.Mascotaselect["sNomMascota"] = "Agregar una nueva mascota";
      this.ClienteAntiguo = false;
      this.CambioDatos = false;
      this.CrearCliente = true;
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
      console.log(rutadd);

      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else {
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
        this.Rutvalidotext = "";
      }
      this.vaciarmascota();
    }

    else {
      var reqmascli = {
        "tipo": "R",
        "idCli": 0,
        "rutCli": this.RUT.replace(".", "").replace(".", "").replace(".", "").trim()
      }      
      var mascotascliente = await this.MediwebServiceService.GetDataMacotaCliente(reqmascli);
      if (mascotascliente["status"]) {
        if (mascotascliente["data"] == null) {
          this.Mascli = null;
          this.MascotaEncontrada = false;
          this.vaciarmascota();
        }
        else {
          this.MascotaEncontrada = mascotascliente["data"].length > 0 ? true : false;
          this.Masdeunamascota = mascotascliente["data"].length > 1 ? true : false;
          this.Mascli = mascotascliente["data"];
          this.Mascotaselect = this.Mascli[0]
          this.Mascli.push({ "iIdMascota": 99, "sNomMascota": "Agregar nueva mascota", "iIdRaza": 9999, "sColor": "", "sTamaño": "", "dFechNac": null });
          this.LlenarMascota();
        }
      }
      else {
        this.Mascli = null;
        this.MascotaEncontrada = false;
        this.vaciarmascota();
      }
    }
    this.CargaCompleta = false;
  }

  LimpiarDatosCliente() {
    this.Nombre = "";
    this.fechaN = new Date();
    this.Direccion = "";
    this.NUmTel = "";
    this.Correo = "";
    //this.Prevision = this.Previciones[0];
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

  async GetRazas() {

    var getcli = {
      "acc": "R"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.RazasMasc = respuesta["dataRaz"];
      this.TodasLasRaza = respuesta["dataRaz"];
      this.RazaMasc = this.RazasMasc[0];
    }
  }

  async GetRazasXtipo() {
    var gettipomas = {
      "idTipMas": this.Tipomas["iIdTipoMascota"]
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataRazaxtipo(gettipomas);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.RazasMasc = respuesta["data"];
      this.RazaMasc = this.RazasMasc[0];
    }
  }

  async GetTiposMascotas() {

    var getcli = {
      "acc": "T"
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.CargaCompleta = false;
    if (respuesta["status"]) {
      this.TioposMAsc = respuesta["dataTMa"];
      this.Tipomas = this.TioposMAsc[0];
    }
  }

  GetTamaMAsc() {
    this.TamanosMasc = [
      {
        "iDTama": 1,
        "sNomRaza": "Pequeño",
        "cTama": "P"
      },
      {
        "iDTama": 2,
        "sNomRaza": "Mediano",
        "cTama": "M"
      },
      {
        "iDTama": 3,
        "sNomRaza": "Grande",
        "cTama": "L"
      },
      {
        "iDTama": 4,
        "sNomRaza": "Extra Grande",
        "cTama": "X"
      }
    ];

    this.TamaMasc = this.TamanosMasc[0];
  }

  async CrearMascota() {
    var AssMAsc = {
      "acc": "N",
      "idMascota": 0,
      "nomMascota": this.NombreMascota,
      "idCli": this.IDdueño,
      "idRaza": this.RazaMasc["iIdRaza"],
      "color": this.ColorMasc,
      "tamaño": this.TamaMasc["cTama"],
      "fecNac": this.getfechas(this.fechaNMascota),
    }
    console.log(AssMAsc);
    if (this.nuevamacota == true) {
      var respuestamasc = await this.MediwebServiceService.AgregarMascota(AssMAsc);
      console.log(respuestamasc);
      this.Mascotaselect["iIdMascota"]  = respuestamasc["idMas"];
      var cliente = JSON.parse(localStorage.getItem('Cliente'));
      cliente["IdMasc"] = this.Mascotaselect["iIdMascota"] ;
      localStorage.setItem('Cliente', JSON.stringify(cliente));
    }
  }

  async ActualizarMascota() {
    var AssMAsc = {
      "acc": "U",
      "idMascota": this.Mascotaselect["iIdMascota"],
      "nomMascota": this.NombreMascota,
      "idCli": this.IDdueño,
      "idRaza": this.RazaMasc["iIdRaza"],
      "color": this.ColorMasc,
      "tamaño": this.TamaMasc["cTama"],
      "fecNac": this.getfechas(this.fechaNMascota),
    }
    console.log("Actualizar MAsc",AssMAsc);
      var respuestamasc = await this.MediwebServiceService.AgregarMascota(AssMAsc);
      console.log(respuestamasc);
      this.Mascotaselect["iIdMascota"]  = respuestamasc["idMas"];
      var cliente = JSON.parse(localStorage.getItem('Cliente'));
      cliente["IdMasc"] = this.Mascotaselect["iIdMascota"] ;
      localStorage.setItem('Cliente', JSON.stringify(cliente));
  }


  async LlenarMascota() {
    if (this.Mascotaselect["sNomMascota"] == "Agregar nueva mascota") {
      this.vaciarmascota();
      this.Masdeunamascota = true;
    }
    else {
      // llenado de datos de mascota
      this.NombreMascota = this.Mascotaselect["sNomMascota"];
      this.ColorMasc = this.Mascotaselect["sColor"];
      this.fechaNMascota = new Date(this.Mascotaselect["dFechNac"].toString());
      this.TamaMasc = await this.TamanosMasc.filter(x => x["cTama"] == this.Mascotaselect["sTamaño"]);
      this.TamaMasc = this.TamaMasc[0];

      // buscar y asignar tipo de raza escogida
      var buscarraza = await this.TodasLasRaza.filter(x => x["iIdRaza"] == this.Mascotaselect["iIdRaza"]);
      var gettipomas = {
        "idTipMas": buscarraza[0]["iIdTipoMascota"]
      }
      this.RazaMasc = buscarraza[0];

      //seleccionar tipo marcota escogida
      var respuesta = await this.MediwebServiceService.GetDataRazaxtipo(gettipomas);
      if (respuesta["status"]) {
        this.RazasMasc = respuesta["data"];
      }
      var newtipomas = await this.TioposMAsc.filter(x => x["iIdTipoMascota"] == buscarraza[0]["iIdTipoMascota"]);
      this.Tipomas = newtipomas[0];
    }
  }

  vaciarmascota() {

    this.nuevamacota = true;
    this.NombreMascota = "";
    this.ColorMasc = "";
    this.fechaNMascota = null;
    this.Masdeunamascota = false;
  }

  formateaRutinpunt() {
    setTimeout(() => {
      if (this.RUT.length > 2) {
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      }
    }, 50);

  }

  validarDireccion(){
    if (this.Direccion.length <3) {
      this.DireccionValida = false;
      this.DireccionValidatext = "la direccion no puede ser corta o vacia";
    }
    else{
      this.DireccionValida = true;
      this.DireccionValidatext = "";
    }
  }

  validarNombre(){
    if (this.Nombre.length <3) {
      this.NombreValido = false;
      this.NombreValidotext = "El nombre no puede ser tan corto o vacio";
    }
    else{
      this.NombreValido = true;
      this.NombreValidotext = "";
    }
  }

  ValidarFechacliente() {
    setTimeout(() => {
      this.fechaValidatext = "";
      var fechaelegida;
      if (this.fechaN) {
        fechaelegida = this.getfechas(this.fechaN);
      }
      let today = new Date();
      var hoy = this.getfechas(today);

      if (this.fechaN == undefined) {
        this.fechaValidatext = "La fecha no puede estar vacia";
      }
      if (fechaelegida > hoy) {
        this.emailvalido = false;
        this.fechaValidatext = "La fecha no puede ser mayor al dia actual";
      }
    }, 50);

  }
  validarMascota(){
    setTimeout(() => {
      var fechavalida = true;
      var fechaelegida;
      if (this.fechaNMascota) {
        fechaelegida = this.getfechas(this.fechaNMascota);
      }
      let today = new Date();
      var hoy = this.getfechas(today);

      if (this.fechaNMascota == undefined) {
        fechavalida = false;
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
        return;
      }
      if (fechaelegida > hoy) {
        fechavalida = false;
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
        return;
      }

      if (this.NombreMascota.length <3 || this.ColorMasc.length <3) {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'Debe LLenar todos los datos de la mascota' });
      }
    }, 50);
    
  }

  //Meyodos Agenda----------------------------------------------------------
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
        this.ImagenUrl = this.url["Url_Imagen"]  + this.Doctor["nomIma"] + ".jpg";
        this.SelecDoctor = true;
        this.worksDate = [];
        this.Horas = [];

        this.FechaSelect = undefined;
        this.HoraSelect = undefined;
        this.CargaCompleta = true;
        this.obtenerDiasDetrabajo();
        //this.mostrarDetalle = true;
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
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
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
    var respuesta = await this.MediwebServiceService.ConsDetCitDoc(req);
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
    console.log(this.sucursal);

    var respuesta = await this.MediwebServiceService.ConsDetCitDoc(req);
    if (respuesta["status"]) {
      var doctores = respuesta["datD"];
      this.medico = doctores;
      this.medico.forEach(element => {
        element["sNomIma"] = this.url["Url_Imagen"] + element["nomIma"] + ".jpg"
      });
      console.log(this.medico);
    }
  }

  async obtenerDiasDetrabajo() {

    var datodoc = {
      "idDoc": this.Doctor["iddoc"],
      "idEsp": this.especialidad["iIdEsp"],
      "idSuc": this.sucursal["idSuc"]
    }
    var horariosdoc = await this.MediwebServiceService.GetHorariosAAgenda(datodoc);
    console.log(horariosdoc);
    this.CargaCompleta = false;
    
    if (horariosdoc["status"]) {
      this.Doctor["iAgeDias"] = horariosdoc["iAgeDias"];
      this.Doctor["horAte"] = horariosdoc["iTpoAte"];
      this.Doctor["horCon"] = horariosdoc["sHorarios"];
      this.Doctor["horOcu"] = horariosdoc["sHorOcu"];
    }

    this.worksDate = [];
    var hoy = moment().format("DD/MM/YYYY");
    var mes = moment().format("MMM");
    console.log(moment(moment().add(5, 'day').format("DD/MM/YYYY")).toDate());


    for (let index = 0; index < this.Doctor["iAgeDias"]; index++) {
      //for (let index = 0; index < 5; index++) {
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
    if (this.FechaSelect < moment().format("YYYY-MM-DD")) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El dia elegido debe ser mayor a la fecha actual' });
      this.FechaSelect = "";
      return;
    }
    console.log(moment().add(this.Doctor["iAgeDias"], 'days').format("YYYY-MM-DD"))
    if (this.FechaSelect > moment().add(this.Doctor["iAgeDias"] - 1, 'days').format("YYYY-MM-DD")) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El dia elegido debe ser menor a las fechas adminitidas' });
      this.FechaSelect = "";
      return;
    }
    
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

      // var req = {
      //   "idCli": this.cliente["id"],
      //   "idMas": this.cliente["IdMasc"],
      //   "idSuc": this.sucursal["idSuc"],
      //   "idDoc": this.Doctor["iddoc"],
      //   "idEsp": this.especialidad["iIdEsp"],
      //   "idPre": this.cliente["idprev"],
      //   "fecAge": this.FechaSelect.toString()+"T"+moment(this.HoraSelect.toString()).format('HH:mm')+":00.279Z",
      //   "datoCita": this.Descripcion != undefined ? this.Descripcion : ""
      // }
      var citaro = {
        "tipAge": "S",
        "idCli": this.cliente["id"],
        "idMas": this.cliente["IdMasc"],
        "idSuc": this.sucursal["idSuc"],
        "idDoc": this.Doctor["iddoc"],
        "idPre": 0,
        "idEsp": this.especialidad["iIdEsp"],
        "fecAges": this.FechaSelect.toString()+"T"+moment(this.HoraSelect.toString()).format('HH:mm')+":00.279Z",
      }
      console.log(citaro);
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Cita Ingresada', detail: 'La Cita se esta ingresando al sistema por favor espere' });
      var respuesta = await this.MediwebServiceService.CrearCitasRotatoria(citaro);
      var respok = respuesta;
      if (respok["status"] == true) {
        var req2 = {
          "idCita": "1",
          "idCliente": this.cliente["id"] +"",
          "idSucursal": this.sucursal["idSuc"]+"",
          "idDoctor": this.Doctor["iddoc"]+"",
          "idEsp": this.especialidad["iIdEsp"]+"",
          "idPrev": 0,
          "fecha": this.FechaSelect.toString() + " " + moment(this.HoraSelect.toString()).format('HH:mm'),
          "hora": "",
          "descripcion": "",
          "cambioDatos": "",
          "nDoctor": this.Doctor["nomDoc"]+"",
          "nSucursal": this.sucursal["sNombre"]+"",
          "nEspecialidad": this.especialidad["sNomEsp"]+"",
          "clienteEmail": this.cliente["mail"]+""
          //"codigoCita": respok["code"]+""
        }
        console.log(req2);
        var respuesta2 = await this.MediwebServiceService.EnviarCorreoSobrecupo(req2);
        console.log(respuesta2);
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Cita Ingresada Correctamente', detail: 'La Cita ingresa ha sido regristrada correctamente' });
      }
      else {
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
        horasrotatorias += element.Fecha + "," + element.Hora + ","
      });
      horasrotatorias = horasrotatorias.substring(0, horasrotatorias.length - 1);

      var citaro = {
        "tipAge": "R",
        "idCli": this.cliente["id"],
        "idMas": this.cliente["IdMasc"],
        "idSuc": this.sucursal["idSuc"],
        "idDoc": this.Doctor["iddoc"],
        "idPre": 0,
        "idEsp": this.especialidad["iIdEsp"],
        "fecAges": horasrotatorias
      }
      console.log(citaro);
      
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Citas Ingresadas', detail: 'Las Citas se estan ingresando al sistema por favor espere' });
      var respuesta = await this.MediwebServiceService.CrearCitasRotatoria(citaro);
      console.log(respuesta);
      var req = {
        "idCita": "1",
        "idCliente": this.cliente["id"] + "",
        "idSucursal": this.sucursal["idSuc"].toString(),
        "idDoctor": this.Doctor["iddoc"].toString(),
        "idEsp": this.especialidad["iIdEsp"].toString(),
        "idPrev": 0,
        "fecha": horasrotatorias,
        "hora": "",
        "descripcion": "",
        "cambioDatos": "",
        "nDoctor": this.Doctor["nomDoc"],
        "nSucursal": this.sucursal["sNombre"],
        "nEspecialidad": this.especialidad["sNomEsp"],
        "clienteEmail": this.cliente["mail"]
      }
      console.log(req);
      var respuesta2 = await this.MediwebServiceService.EnviarCorreorotatorio(req);
      console.log(respuesta2);
      var respok = respuesta["status"];
      if (respok) {
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
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Citas No Ingresadas', detail: 'Las Citas ingresas no han sidos registradas' });
      }

    }
  }

  getfechas(date: Date) {
    var fecha;
    date;
    let day2  = date.getDate();
    let day = day2 <10 ? "0"+day2: day2;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hora = (date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours())
      + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes())
      + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds())
      + "." + date.getUTCMilliseconds();
    if (month < 10) {
      fecha = `${year}-0${month}-${day}`;
    } else {
      fecha = `${year}-${month}-${day}`;
    }
    return fecha;
  }
}
