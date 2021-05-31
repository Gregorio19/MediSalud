import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss'],
  providers: [MessageService]
})
export class DatosClienteComponent implements OnInit {

  //Variable Cliente
  RUT: string;
  RutTitular: string;
  Nombre: string;
  NombreTitular: string;
  ApellidoP: string;
  ApellidoM: string;
  NUmTel: string;
  Direccion: string;
  Correo: string;
  fechaN: Date;
  Prevision: SelectItem;
  sexo: string;
  titular: boolean;


  //Variables MAscota
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

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {

    //variables inicializacion

    //cliente datos
    this.RUT = "";
    this.Correo = "";
    this.Direccion = "";
    this.NUmTel = "";
    this.Nombre = "";

    //datos validos cliente
    this.telefonovalido = true;
    this.emailvalido = true;
    this.Rutvalido = true;
    this.NombreValido = true;
    this.DireccionValida = true;

    //texto de datos incorrectos
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

  }

  cambiosexo() {
    console.log(this.sexo);

  }

  async GetClientes() {
    var getcli = {
      "acc": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
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
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    if (respuesta["status"]) {
      this.Previciones = respuesta["dataPre"];
      console.log(this.Previciones);
      this.Prevision = this.Previciones[0];
    }
  }

  async GetRazas() {

    var getcli = {
      "acc": "R"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
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
    var respuesta = await this.MediwebServiceService.GetDataRazaxtipo(gettipomas);
    if (respuesta["status"]) {
      this.RazasMasc = respuesta["data"];
      this.RazaMasc = this.RazasMasc[0];
    }
  }

  async GetTiposMascotas() {

    var getcli = {
      "acc": "T"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
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
        "cTama": "XL"
      }
    ];

    this.TamaMasc = this.TamanosMasc[0];
  }

  async AgregarCliente() {
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
        "idPrev": this.Prevision["iIdPrev"],
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
        "idPrev": this.Prevision["iIdPrev"],
        "tit": estitu == 1 ? true : false,
        "sex": susexo,
        "camCli": this.CambioDatos,
        "NombreMasc": this.NombreMascota,
        "IdMasc":1
      }



      console.log(Addcli2);

      var exitcli = this.Clintes.filter(function (array) {
        if (array.sRutCli.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == rutadd.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
          return array;
        }
      });
      if (exitcli.length == 0) {
        localStorage.setItem('Cliente', JSON.stringify(Addcli2));
        var respuesta = await this.MediwebServiceService.AgregarCliente(Addcli);
        console.log(respuesta);
        if (respuesta["status"]) {
          this.IDdueño = respuesta["data"][respuesta["data"].length-1]["iIdCli"];
        }
        await this.CrearMascota();
        this.Router.navigate(["Agendar"]);
      }
      else {
        localStorage.setItem('Cliente', JSON.stringify(Addcli2));
        await this.CrearMascota();
        this.Router.navigate(["Agendar"]);
      }

    }
  }

  async CrearMascota(){
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
    if (this.nuevamacota== true) {
      var respuestamasc = await this.MediwebServiceService.AgregarMascota(AssMAsc);
    console.log(respuestamasc);
    }
  }

  

  async CompararCliente() {
    var clienteEncontrado = false;
    var esto = this;
    console.log(this.Prevision);
    var nrut = this.RUT.replace(".", "").replace(".", "").replace(".", "").trim();
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
        clienteEncontrado = true;
        this.ClienteAntiguo = true;
        this.IDdueño = element["iIdCli"]
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString());
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];

        this.Previciones.filter(function (array) {
          if (element["iIdPrev"] == array["iIdPrev"]) {
            esto.Prevision = array;
          }
        });
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
        this.Rutvalidotext = "";
        this.Rutvalido = true;
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
        console.log(this.Prevision);
      }
    });

    if (clienteEncontrado == false) {
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
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
        this.Rutvalidotext = "";
      }
      this.vaciarmascota();
    }

    else{
      var reqmascli = {
        "idCli": this.IDdueño
      }
      var mascotascliente = await this.MediwebServiceService.GetDataMacotaCliente(reqmascli);
      if (mascotascliente["status"]) {
        if (mascotascliente["data"] == null) {
          this.Mascli = null;
          this.MascotaEncontrada  = false;
          this.vaciarmascota();
        }
        else{
          this.MascotaEncontrada =  mascotascliente["data"].length > 0 ? true:false;
          this.Masdeunamascota = mascotascliente["data"].length > 1 ? true:false;
          this.Mascli = mascotascliente["data"];
          this.Mascotaselect = this.Mascli[0]
          this.Mascli.push({"iIdMascota":99,"sNomMascota":"Nuevo","iIdRaza":9999,"sColor":"","sTamaño":"","dFechNac":null});
          this.LlenarMascota();
        }
      }
      else{
        this.Mascli = null;
        this.MascotaEncontrada  = false;
        this.vaciarmascota();
      }
    }
  }

  async LlenarMascota(){
    if (this.Mascotaselect["sNomMascota"] == "Nuevo") {
      this.vaciarmascota();
      this.Masdeunamascota = true;
    }
    else{
      // llenado de datos de mascota
      this.NombreMascota = this.Mascotaselect["sNomMascota"];
      this.ColorMasc = this.Mascotaselect["sColor"];
      this.fechaNMascota = new Date(this.Mascotaselect["dFechNac"].toString());
      this.TamaMasc = await this.TamanosMasc.filter(x => x["cTama"] == this.Mascotaselect["sTamaño"]);
      this.TamaMasc = this.TamaMasc[0]; 

      // buscar y asignar tipo de raza escogida
      var buscarraza =  await this.TodasLasRaza.filter(x => x["iIdRaza"] ==this.Mascotaselect["iIdRaza"] );
      var gettipomas = {
        "idTipMas": buscarraza[0]["iIdTipoMascota"]
      }
      this.RazaMasc  = buscarraza[0];
      
      //seleccionar tipo marcota escogida
      var respuesta = await this.MediwebServiceService.GetDataRazaxtipo(gettipomas);
      if (respuesta["status"]) {
        this.RazasMasc = respuesta["data"];
      }
      var newtipomas = await this.TioposMAsc.filter(x => x["iIdTipoMascota"] == buscarraza[0]["iIdTipoMascota"] );
      this.Tipomas = newtipomas[0];
    }
  }

  vaciarmascota(){
        this.nuevamacota = true;
        this.NombreMascota = "";
        this.ColorMasc ="";
        this.fechaNMascota = null;
        this.Masdeunamascota = false;
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

  getfechas(date: Date) {
    console.log(date);
    
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


