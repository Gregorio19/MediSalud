import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  providers: [MessageService]
})
export class DoctorComponent implements OnInit {

  id;
  rut;
  nombre;
  tel;
  mail;
  nomImagen;
  inforDoc;
  pass

  Doctores;
  cols

  CargaCompleta

  Editar: boolean

  //validaciones 
  telefonovalido;
  emailvalido;
  Rutvalido;
  NombreValido;
  pasvalido;

  telefonovalidotext;
  emailvalidotext;
  pasvalidotext
  Rutvalidotext;
  NombreValidotext;

  uploadedFiles: any[] = [];
  uplo: File;
  imagenurl;

  constructor(private Router: Router, private MediwebServiceService: MediwebServiceService, private MessageService: MessageService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
      return
    }
    this.CargaCompleta = false;
    this.Editar = false;
    this.id = "";
    this.rut = "";
    this.nombre = "";
    this.tel = "";
    this.mail = "";
    this.nomImagen = "";
    this.inforDoc = "";
    this.TraerDoctor();
    this.cols = [
      { header: 'Nombre', nombre: 'sNombre' },
      { header: 'Rut', nombre: 'sRutDoc' },
      { header: 'Telefono', nombre: 'sNumTel' },
      { header: 'Correo', nombre: 'sMail' }
    ];
  }

  async AgregarDosctor() {
    this.CargaCompleta = true;
    console.log(this.uploadedFiles);

    if (this.rut == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }
    if (this.nombre.length < 4) {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede tener menos de 3 caracteres";
    }
    if (this.tel == "") {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono no puede estar vacio";
    }

    if (this.mail == "") {
      this.emailvalido = false;
      this.emailvalidotext = "El email no puede estar vacio";
    }

    if (this.pass.length < 6 ) {
      this.pasvalido = false;
      this.pasvalidotext = "La contrasela no puede estar vacio o ser menor a 6 digitos";
    }

    else {
      var rutadd = this.rut.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Doctores.forEach(element => {

        if (element["sRutDoc"] == rutadd) {
          this.Rutvalido = false;
          this.Rutvalidotext = "El Rut ya se encuentra usado por otro doctor";
        }
      });
      if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false || this.pasvalido == false) {
        this.CargaCompleta = false;
        return;
      }
      else {
        var Doctor = {
          "acc": "N",
          "idDoc": 0,
          "rutDoc": rutadd,
          "nom": this.nombre,
          "fono": this.tel,
          "mail": this.mail,
          "nomIma": rutadd,
          "pass": this.pass,
          "infoDoc": this.inforDoc
        }
        console.log(Doctor);

        var respuesta = await this.MediwebServiceService.AgregarDocotr(Doctor);
        if (respuesta["message"] == "OK") {
          this.Doctores = respuesta["data"];
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Ingreso Correcto', detail: 'Los datos del doctor se han Agregado correctamente' });
        }
        else {
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al agregar los datos: ' + respuesta["message"] });
        }
      }


    }
    this.CargaCompleta = false;
  }


  ComprobarNombre(){
    if (this.nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }
    else if (this.nombre.length < 4) {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede tener menos de 3 caracteres";
    }
   else{
      this.NombreValido = true;
      this.NombreValidotext = "";
    }

  }
  Comprobarpass(){

    if (this.pass.length < 6 ) {
      this.pasvalido = false;
      this.pasvalidotext = "La contraseña no puede estar vacio o ser menor a 6 digitos";
    }
    else{
      this.pasvalido = true;
      this.pasvalidotext = "";
    }

  }

  async TraerDoctor() {
    this.CargaCompleta = true;
    var GetDoctor = { "acc": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetDoctor);
    var JsonDoctor = respuesta["dataDoc"];
    console.log(JsonDoctor);
    this.Doctores = JsonDoctor;
    this.CargaCompleta = false;
  }

  Doctor_seleccionado(doc) {

    this.Rutvalidotext = "";
    this.NombreValidotext = "";
    this.telefonovalidotext = "";
    this.emailvalidotext = "";


    console.log(doc);
    this.Editar = true;
    this.id = parseInt(doc["iIdDoc"]);
    this.rut = doc["sRutDoc"];
    this.nombre = doc["sNombre"];
    this.tel = doc["sNumTel"];
    this.mail = doc["sMail"];
    this.nomImagen = doc["sNomIma"];
    this.inforDoc = doc["sInfoDoc"];
    this.pass = doc["sPass"];
  }

  async ActualizarDosctor() {
    this.CargaCompleta = true;
    if (this.rut == "") {
      this.Rutvalido = false;
      this.Rutvalidotext = "El Rut no puede estar vacio";
    }

    if (this.nombre == "") {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede estar vacio";
    }
    if (this.nombre.length < 4) {
      this.NombreValido = false;
      this.NombreValidotext = "El Nombre no puede tener menos de 3 letras";
    }
    if (this.tel == "") {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono no puede estar vacio";
    }

    if (this.mail == "") {
      this.emailvalido = false;
      this.emailvalidotext = "El email no puede estar vacio";
    }
    if (this.pass.length < 6 ) {
      this.pasvalido = false;
      this.pasvalidotext = "La contrasela no puede estar vacio o ser menor a 6 digitos";
    }

    if (this.Rutvalido == false || this.NombreValido == false || this.telefonovalido == false || this.emailvalido == false || this.pasvalido == false) {
      return;
    }
    else {
      var rutadd = this.rut.replace(".", "").replace(".", "").replace(".", "").replace("-", "");
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length)
      var Doctor = {
        "acc": "U",
        "idDoc": this.id,
        "rutDoc": rutadd,
        "nom": this.nombre,
        "fono": this.tel,
        "mail": this.mail,
        "nomIma": rutadd,
        "pass": this.pass,
        "infoDoc": this.inforDoc
      }
      console.log(Doctor);

      var respuesta = await this.MediwebServiceService.ActualizarDoctor(Doctor);
      this.uploadedFiles = [];
      if (respuesta["message"] == "OK") {
        this.Doctores = respuesta["data"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Actualizacion Correcta', detail: 'Los datos del doctor se han actulizado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al actualizar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta["message"] });
      }
    }
    this.CargaCompleta = false;
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
      if (!/^\+{1}([0-9]){11}$/.test(this.tel)) {
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

  async uploadFile(event, fileUpload) {
    this.CargaCompleta = true;
    if (this.rut != undefined && this.rut != "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'info', summary: 'Cargando Archivo', detail: 'La foto de perfil se esta guardando' });
      for (let file of event.files) {
        this.uplo = file;
      }
      this.imagenurl = this.domSanitizer.bypassSecurityTrustUrl(this.uplo["objectURL"]["changingThisBreaksApplicationSecurity"]);
      await this.delay(2000);
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Foto guardada Correctamente', detail: 'La foto de perfil se ha guardado correctamente' });
      var base64 = await this.getBase64Image(document.getElementById("img"));
      console.log(base64);
      base64 = base64.split("data:image/png;base64,")[1];

      var req = {
        "imagen": base64,
        "rut": this.rut
      }
      var imagenservice = await this.MediwebServiceService.GuardarImagen(req);
      console.log(imagenservice);
      fileUpload.clear();
      //console.log(this.imagenurl);
    }
    else {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Primero debe ingresar el rut del Doctor' });
    }
    this.CargaCompleta = false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }


}
