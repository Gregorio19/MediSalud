import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.scss'],
  providers: [MessageService]
})
export class RazaComponent implements OnInit {

  Nombre:string;

  id;
  Editar;
  Razas;
  cols;
  TipoMascota;
  TioposMAsc;
  TipoMascotaSelect;
  CargaCompleta;
  constructor(private Router:Router, private MediwebServiceService: MediwebServiceService, private MessageService: MessageService) { }

  ngOnInit(): void {
    this.CargaCompleta = false;
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1") {
      this.Router.navigate([""]);
    }

    this.Editar = false;
    this.Nombre = "";
    this.TipoMascota = null;
    this.TipoMascotaSelect = null;
    this.TraerRazas();
    this.GetTiposMascotas();
    this.cols = [
      { header: 'Nombre', nombre: 'sNomRaza' },
      
    ];
  }


  async AgregarEspecialidad() {
    this.CargaCompleta = true;
    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de raza debe ser mayor a 3 caracteres' });
    }
    if (this.TipoMascota == null ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'Debe seleccionar un tipo de mascota' });
    }
    else{
      var Razasend = {
        "acc": "N",
        "idRaza": 0,
        "nomRaza": this.Nombre,
        "idTMas": this.TipoMascota["iIdTipoMascota"]
      }
      console.log(Razasend);
  
      var respuesta = await this.MediwebServiceService.AgregarRaza(Razasend);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.Razas = respuesta["dataRaz"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Ingreso Correcto', detail: 'Los datos de la Raza se han Agregado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al agregar los datos: ' + respuesta["message"] });
      }
      this.TraerRazas();
    }
    this.CargaCompleta = false;
  }


  async TraerRazas() {
    this.CargaCompleta = true;
    var GetEspecialidad = { "acc": "R" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetEspecialidad);
    var JsonEspecialidad = respuesta["dataRaz"];
    console.log(JsonEspecialidad);
    this.Razas = JsonEspecialidad;
    this.CargaCompleta = false;
  }

  async GetTiposMascotas() {
    this.CargaCompleta = true;
    var getcli = {
      "acc": "T"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    if (respuesta["status"]) {
      this.TioposMAsc = respuesta["dataTMa"];
      this.TipoMascota = this.TioposMAsc[0];
    }
    this.CargaCompleta = false;
  }

  async Especialidad_seleccionado(doc) {
    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdRaza"];
    this.TipoMascotaSelect = doc["iIdTipoMascota"];
    this.Nombre = doc["sNomRaza"];
    this.TipoMascota = await this.TioposMAsc.filter(function (array) {
      if (doc["iIdTipoMascota"] == array["iIdTipoMascota"]) {
        return array;
      }
    });
    this.TipoMascota = this.TipoMascota[0];
    console.log(this.TipoMascota);
    
  }

  async ActualizarEspecialidad() {
    this.CargaCompleta = true;
    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de la Raza no puede tener menos de 3 caracteres' });
    }
    else{
      var Raza = {
        "acc": "U",
        "idRaza": this.id,
        "nomRaza": this.Nombre,
        "idTMas": this.TipoMascotaSelect
      }
      console.log(Raza);
  
      var respuesta = await this.MediwebServiceService.AgregarRaza(Raza);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.Razas = respuesta["dataRaz"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Actualizacion Correcta', detail: 'Los datos de la Especialidad se han actualizado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta["message"] });
      }
      this.TraerRazas();  
    }
    this.CargaCompleta = false;
  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.id = "";
    this.Nombre = "";
  }

}
