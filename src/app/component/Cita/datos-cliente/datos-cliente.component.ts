import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss']
})
export class DatosClienteComponent implements OnInit {

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

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router) { }

  ngOnInit(): void {

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

    this.GetPreviciones();
    this.GetClientes();
    this.sexo = "Masculino";
    this.titular = false;
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar',
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
    if (this.RUT == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.Nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Rut no puede estar vacio";
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

    if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false) {
      return;
    }
    else {
      var estitu = this.titular == true ? 1 : 0;
      console.log(this.sexo);

      var susexo = this.sexo == "Masculino" ? 'M' : 'F';
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
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
        "sexo": susexo
      }

      console.log(Addcli);

      var exitcli = this.Clintes.filter(function (array) {
        if (array.sRutCli.replace(".", "").replace("-", "") == rutadd.replace(".", "").replace("-", "")) {
          return array;
        }
      });
      if (exitcli.length == 0) {
        localStorage.setItem('Cliente', JSON.stringify(Addcli));
        var respuesta = await this.MediwebServiceService.AgregarCliente(Addcli);
        console.log(respuesta);
        
        this.Router.navigate(["Agendar"]);
      }
      else {
        localStorage.setItem('Cliente', JSON.stringify(Addcli));
        this.Router.navigate(["Agendar"]);
      }

    }
  }

  CompararCliente() {
    var clienteEncontrado = false;
    console.log(this.Prevision);
    var nrut = this.RUT.replace(".", "").replace(".", "").replace(".", "");
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".", "").replace("-", "") == nrut.replace(".", "").replace("-", "")) {
        clienteEncontrado = true;
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString());
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];
        this.Prevision = this.Previciones[element["iIdPrev"]];
        if (element["btit"] == true) {
          this.titular = true;
        }
        else {
          this.titular = false;
        }

        if (element["sSexo"] == "F") {
          this.sexo = "Femenino";
        }
        else {
          this.sexo = "Masculino";
        }
        this.Rutvalidotext = "";
        this.Rutvalido = true;
      }
    });

    if (clienteEncontrado == false) {
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
      console.log(rutadd);
      
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else{
        this.Rutvalidotext = "";
      }

    }
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
      if (!/^\+{1}([0-9]){11}$|^([0-9]){9}$/.test(this.NUmTel)) {
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
}
