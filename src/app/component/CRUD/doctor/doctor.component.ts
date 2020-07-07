import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  id;
  rut;
  nombre;
  tel;
  mail;
  nomImagen;
  inforDoc;

  Doctores;
  cols

  Editar: boolean

  //validaciones 
  telefonovalido;
  emailvalido;
  Rutvalido;
  NombreValido;

  telefonovalidotext;
  emailvalidotext;
  Rutvalidotext;
  NombreValidotext;

  constructor(private MediwebServiceService: MediwebServiceService) { }

  ngOnInit(): void {
    this.Editar = false;
    this.TraerDoctor();
    this.cols = [
      { header: 'Nombre', nombre: 'sNombre' },
      { header: 'Rut', nombre: 'sRutDoc' },
      { header: 'Telefono', nombre: 'sNumTel' },
      { header: 'Correo', nombre: 'sMail' },
      { header: 'Informacion', nombre: 'sInfoDoc' },
      { header: 'Nombre foto', nombre: 'sNomIma' }
    ];
  }

  async AgregarDosctor() {
    if (this.rut == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }
    if (this.tel == "") {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono no puede estar vacio";
    }

    if (this.mail == "") {
      this.emailvalido = false;
      this.emailvalidotext = "El email no puede estar vacio";
    }

    if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false) {
      return;
    }
    else {
      var Doctor = {
        "rut": this.rut,
        "nombre": this.nombre,
        "tel": this.tel,
        "mail": this.mail,
        "nomImagen": "string.png",
        "inforDoc": this.inforDoc
      }
      console.log(Doctor);

      var respuesta = await this.MediwebServiceService.AgregarDocotr(Doctor);
      console.log(respuesta);
    }

  }

  async TraerDoctor() {
    var GetDoctor = { "Tipo": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetDoctor);
    var JsonDoctor = JSON.parse(respuesta.toString());
    console.log(JsonDoctor);
    this.Doctores = JsonDoctor;
  }

  Doctor_seleccionado(doc) {

    this.Rutvalidotext = "";
    this.NombreValidotext = "";
    this.telefonovalidotext = "";
    this.emailvalidotext = "";


    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdDoc"];
    this.rut = doc["sRutDoc"];
    this.nombre = doc["sNombre"];
    this.tel = doc["sNumTel"];
    this.mail = doc["sMail"];
    this.nomImagen = doc["sNomIma"];
    this.inforDoc = doc["sInfoDoc"];
  }

  async ActualizarDosctor() {
    if (this.rut == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }
    if (this.tel == "") {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono no puede estar vacio";
    }

    if (this.mail == "") {
      this.emailvalido = false;
      this.emailvalidotext = "El email no puede estar vacio";
    }

    if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false) {
      return;
    }
    else {
      var Doctor = {
        "id": this.id.toString(),
        "rut": this.rut,
        "nombre": this.nombre,
        "tel": this.tel,
        "mail": this.mail,
        "nomImagen": "string.png",
        "inforDoc": this.inforDoc
      }
      console.log(Doctor);

      var respuesta = await this.MediwebServiceService.ActualizarDoctor(Doctor);
      console.log(respuesta);
      this.TraerDoctor();
    }
  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.rut = "";
    this.nombre = "";
    this.tel = "";
    this.mail = "";
    this.nomImagen = "";
    this.inforDoc = "";

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

    if (this.mail != "") {
      if (!/^([a-zA-Z0-9\._-])+@{1}([a-zA-Z0-9])+\.{1}([a-zA-Z]){2,3}$/.test(this.mail)) {
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

    if (this.tel != "") {
      if (!/^\+{1}([0-9]){11}$|^([0-9]){9}$/.test(this.tel)) {
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

  comprobarRut() {
    var rutadd = this.rut.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
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
