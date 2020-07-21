import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss'],
  providers: [MessageService]
})
export class EditClienteComponent implements OnInit {

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

  ClienteAntiguo;
  CambioDatos;
  ClienteACT;

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {

    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
    }

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
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      console.log(this.fechaN);

      if (this.ClienteAntiguo == true) {
        var Addcli = {
          "id": this.ClienteACT['iIdCli'].toString(),
          "rut": rutadd,
          "nombre": this.Nombre,
          "tel": this.NUmTel,
          "mail": this.Correo,
          "direccion": this.Direccion,
          "cumpleaños": this.fechaN.getUTCFullYear() + "-" + (this.fechaN.getUTCMonth() + 1) + "-" + this.fechaN.getUTCDate(),
          "idprev": this.Prevision["iIdPrev"],
          "titular": estitu,
          "sexo": susexo,
          "CambioDato": "0"
        }

        console.log(Addcli);

        var exitcli = this.Clintes.filter(function (array) {
          if (array.sRutCli.replace(".", "").replace("-", "") == rutadd.replace(".", "").replace("-", "")) {
            return array;
          }
        });
          localStorage.setItem('Cliente', JSON.stringify(Addcli));
          var respuesta = await this.MediwebServiceService.ActualizarCliente(Addcli);
          console.log(respuesta);
          this.Router.navigate(["AdmCita"]);
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
        this.Rutvalidotext = "";
        this.Rutvalido = true;
        this.ClienteACT = element;
      }
    });

    if (clienteEncontrado == false) {
      this.ClienteAntiguo = false;
      this.CambioDatos = false;
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
      console.log(rutadd);

      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else {
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
    this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cambio BLoqueado', detail: 'Los datos asociado a este rut se encuentran bloqueados por cuestiones de seguridad, se enviara un notificacion a nuestros encargados para realizar los cambios en su proxima visita' });
  }
}