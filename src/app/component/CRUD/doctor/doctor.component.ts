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

  async TraerDoctor() {
    var GetDoctor = { "Tipo": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetDoctor);
    var JsonDoctor = JSON.parse(respuesta.toString());
    console.log(JsonDoctor);
    this.Doctores = JsonDoctor;
  }

  Doctor_seleccionado(doc) {
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

 async ActualizarDosctor(){
    var Doctor = {
      "id":this.id.toString(), 
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
  Cargar_Nuevamente() {
    this.Editar = false;
    this.rut = "";
    this.nombre = "";
    this.tel = "";
    this.mail = "";
    this.nomImagen = "";
    this.inforDoc = "";

  }



}
