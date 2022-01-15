import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-mascota',
  templateUrl: './tipo-mascota.component.html',
  styleUrls: ['./tipo-mascota.component.scss'],
  providers: [MessageService]
})
export class TipoMascotaComponent implements OnInit {


  Nombre:string;

  id;
  Editar;
  TipoMascota;
  TioposMAsc;
  TipoMascotaSelect;
  cols
  CargaCompleta;
  constructor(private Router:Router, private MediwebServiceService: MediwebServiceService, private MessageService: MessageService) { }

  ngOnInit(): void {
    this.CargaCompleta = false;
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
      return
    }

    this.Editar = false;
    this.Nombre = "";
    this.GetTiposMascotas();
    this.cols = [
      { header: 'Tipo de Mascota', nombre: 'sNomTipo' },
      
    ];
  }

  async AgregarEspecialidad() {
    this.CargaCompleta = true;
    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de la sucursal no puede tener menos de 3 caracteres' });
    }
    else{
      var TipoMascot = {
        "acc": "N",
        "idTMas": 0,
        "nomTipo": this.Nombre
      }
  
      var respuesta = await this.MediwebServiceService.AgregarTipoMascota(TipoMascot);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.TioposMAsc = respuesta["data"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Ingreso Correcto', detail: 'Los datos de la Especialidad se han Agregado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al agregar los datos: ' + respuesta["message"] });
      }
      this.GetTiposMascotas();
    }
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

  Especialidad_seleccionado(doc) {
    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdTipoMascota"];
    this.Nombre = doc["sNomTipo"];
  }

  async ActualizarEspecialidad() {
    this.CargaCompleta = true;
    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de la sucursal no puede tener menos de 3 caracteres' });
    }
    else{
      var Doctor = {
        "acc": "U",
        "idTMas": this.id,
        "nomTipo": this.Nombre
      }
      console.log(Doctor);
  
      var respuesta = await this.MediwebServiceService.AgregarTipoMascota(Doctor);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.TioposMAsc = respuesta["data"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Actualizacion Correcta', detail: 'Los datos de la Especialidad se han actualizado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta["message"] });
      }
      this.GetTiposMascotas();  
    }
    this.CargaCompleta = false;
  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.id = "";
    this.Nombre = "";

  }
}
