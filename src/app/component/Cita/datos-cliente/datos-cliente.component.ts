import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
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

  //Editiar
  @Input() canedit: any;
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
  Rutvalido = false;
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

  CargaCompleta

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {
    if (this.canedit != true) {
      localStorage.setItem('tipou', JSON.stringify(3));
    }
    
    //variables inicializacion

    //cliente datos
    this.RUT = "";
    this.Correo = "";
    this.Direccion = "Aeropuerto 7500";
    this.NUmTel = "";
    this.Nombre = "";
    this.CargaCompleta = true;

    //datos validos cliente
    this.telefonovalido = true;
    this.emailvalido = true;
    this.Rutvalido = false;
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
    this.NombreMascota = "";
    this.ColorMasc = "No Aplica";
    this.Mascotaselect = [];

    //this.GetPreviciones();
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
    this.fechaN = today;

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
    //this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataRazaxtipo(gettipomas);
    //this.CargaCompleta = false;
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

  async GetCliente(req) {

    var getcli = {
      "rut": req
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.TraerClienteRut(getcli);
    this.CargaCompleta = false;
    this.Clintes = respuesta;
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

  async validardatos() {
    var fechaelegida;
    if (this.fechaN) {
      fechaelegida = this.getfechas(this.fechaN);
    }
    var fechaval = true;
    let today = new Date();
    var hoy = this.getfechas(today);
    console.log(hoy);
    this.fechaN = today;
    this.Direccion = "Aeropuerto 7500";
    this.ColorMasc = "no aplica";

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

    await this.validarDireccion();
    await this.compexreg_tel();
    await this.compexreg_email();
    await this.validarNombre();
    await this.ValidarFechacliente();


    if (this.Direccion.length < 3) {
      this.DireccionValida = false;
      this.DireccionValidatext = "la direccion no puede ser corta";
    }

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
      fechaval = false;
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
      fechaval = false;
      
      this.fechaValidatext = "La fecha no puede ser mayor al dia actual";
    }
    if (this.NombreMascota.length < 3 || this.ColorMasc.length < 3) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'Debe LLenar todos los datos de la mascota' });
      return false;
    }
    if (this.fechaNMascota) {
      fechaelegida = this.getfechas(this.fechaNMascota);
    }


    if (this.fechaNMascota == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
      return false;
    }
    if (fechaelegida > hoy) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'La fecha de nacimiento es incorrecta' });
      return false;
    }

    if (this.NombreMascota.length < 3 || this.ColorMasc.length < 3) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'Debe LLenar todos los datos de la mascota' });
      return false;
    }

    if (this.DireccionValida == false || this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false || fechaval == false) {
      return false;
    }
  }

  async AgregarCliente() {
    var respv = await this.validardatos();
    if (respv == false) {
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



      console.log(Addcli2);
      this.GetCliente(rutadd.replace(".", "").replace(".", "").replace(".", "").trim())
      var exitcli = !this.Clintes["status"];
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
        } else {
          await this.ActualizarMascota();
        }
        this.CargaCompleta = false;
        this.Router.navigate(["Agendar"]);
      }
      else {
        if (this.canedit == true) {
          Addcli["acc"]="U";
          Addcli["idCli"]=this.Clintes["idCli"]
          await this.MediwebServiceService.AgregarCliente(Addcli);
        }
        localStorage.setItem('Cliente', JSON.stringify(Addcli2));
        if (this.Mascotaselect) {
          if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
            await this.CrearMascota();
          } else {
            await this.ActualizarMascota();
          }
        }
        else {
          this.CargaCompleta = true;
          if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
            await this.CrearMascota();
          }
          else {
            await this.ActualizarMascota();
          }
        }
        if (this.canedit != true) {
          this.Router.navigate(["Agendar"]);
        }
        else{
          this.Router.navigate(["/DashBoard"]);
        }
        
        this.CargaCompleta = false;
      }

    }
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
      this.Mascotaselect["iIdMascota"] = respuestamasc["idMas"];
      var cliente = JSON.parse(localStorage.getItem('Cliente'));
      cliente["IdMasc"] = this.Mascotaselect["iIdMascota"];
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
    console.log("Actualizar MAsc", AssMAsc);
    var respuestamasc = await this.MediwebServiceService.AgregarMascota(AssMAsc);
    console.log(respuestamasc);
    this.Mascotaselect["iIdMascota"] = respuestamasc["idMas"];
    var cliente = JSON.parse(localStorage.getItem('Cliente'));
    cliente["IdMasc"] = this.Mascotaselect["iIdMascota"];
    localStorage.setItem('Cliente', JSON.stringify(cliente));
  }



  async CompararCliente() {
    this.CargaCompleta = true;
    var clienteEncontrado = false;
    var esto = this;
    if (this.RUT.length > 2) {
      var nrut = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      nrut = nrut.replace(".", "").replace(".", "").replace(".", "").trim();
    }


    await this.GetCliente(nrut)

    if (this.Clintes["status"] == true) {
      this.Clintes["sRutCli"] = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      var element = this.Clintes;
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
        clienteEncontrado = true;
        this.ClienteAntiguo = true;
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
      this.Mascotaselect["sNomMascota"] = "Agregar una nueva mascota";
      this.ClienteAntiguo = false;
      this.CambioDatos = false;
      var rutadd = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim())
      rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
      console.log(rutadd);

      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else {
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
        this.Rutvalidotext = "";
        //this.Mascli.push({ "iIdMascota": 99, "sNomMascota": "Agregar una nueva mascota", "iIdRaza": 9999, "sColor": "", "sTamaño": "", "dFechNac": null });
      }
      this.vaciarmascota();
      this.VaciarPaciente();
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
          this.Mascotaselect["sNomMascota"] = "Agregar una nueva mascota";
          this.vaciarmascota();
        }
        else {
          this.MascotaEncontrada = mascotascliente["data"].length > 0 ? true : false;
          this.Masdeunamascota = mascotascliente["data"].length > 1 ? true : false;
          this.Mascli = mascotascliente["data"];
          this.Mascotaselect = this.Mascli[0]
          this.Mascli.push({ "iIdMascota": 99, "sNomMascota": "Agregar una nueva mascota", "iIdRaza": 9999, "sColor": "", "sTamaño": "", "dFechNac": null });
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

  async LlenarMascota() {
    if (this.Mascotaselect["sNomMascota"] == "Agregar una nueva mascota") {
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
    this.ColorMasc = "No Aplica";;
    this.fechaNMascota = null;
    this.Masdeunamascota = false;
  }

  VaciarPaciente() {
    this.MascotaEncontrada = false;
    this.IDdueño = "";
    this.Nombre = "";
    this.Correo = "";
    this.fechaN = null;
    this.NUmTel = "";
    this.Direccion = "";;
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

  validarDireccion() {
    this.DireccionValidatext = "";
    if (this.Direccion.length < 3) {
      this.DireccionValida = false;
      this.DireccionValidatext = "la direccion no puede ser corta o vacia";
    }
  }

  validarNombre() {
    this.NombreValidotext = "";
    if (this.Nombre.length < 3) {
      this.NombreValido = false;
      this.NombreValidotext = "El nombre no puede ser tan corto o vacio";
    }
  }

  validarMascota() {
    setTimeout(() => {
      var fechavalida = true;
      var fechaelegida;
      if (this.fechaNMascota) {
        fechaelegida = this.getfechas(this.fechaNMascota);
      }
      let today = new Date();
      var hoy = this.getfechas(today);

      if (this.NombreMascota.length < 3 || this.ColorMasc.length < 3) {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incompletos', detail: 'Debe LLenar todos los datos de la mascota' });
        return;
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


    }, 50);

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
    var prin = this.NUmTel.substring(0, 3);
    if (prin != "+56") {
      this.NUmTel = "+56" + this.NUmTel
    }
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
    if (this.canedit != true) {
      this.CambioDatos = true;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cambio Bloqueado', detail: 'Los datos asociado a este rut se encuentran bloqueados por cuestiones de seguridad, se enviara un notificacion a nuestros encargados para realizar los cambios en su proxima visita' });
    }

  }

  getfechas(date: Date) {
    console.log(date);

    var fecha;
    date;
    let day2 = date.getDate();
    let day = day2 < 10 ? "0" + day2 : day2;
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

  formateaRutinpunt() {
    setTimeout(() => {
      if (this.RUT.length > 2) {
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      }
    }, 50);

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


