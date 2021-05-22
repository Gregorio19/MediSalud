import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss'],
  providers: [MessageService]
})
export class EspecialidadComponent implements OnInit {

  Nombre:string;

  id;
  Editar;
  Especialidades;
  cols
  constructor(private Router:Router, private MediwebServiceService: MediwebServiceService, private MessageService: MessageService) { }

  ngOnInit(): void {

    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1") {
      this.Router.navigate([""]);
    }

    this.Editar = false;
    this.Nombre = "";
    this.TraerEspecialidad();
    this.cols = [
      { header: 'Nombre', nombre: 'sNomEsp' },
      
    ];
  }

  async AgregarEspecialidad() {

    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de la sucursal no puede tener menos de 3 caracteres' });
    }
    else{
      var Especialidad = {
        "acc": "N",
        "idEsp": 0,
        "nomEsp": this.Nombre,
        "hab": true
      }
      console.log(Especialidad);
  
      var respuesta = await this.MediwebServiceService.AgregarEspecialidad(Especialidad);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.Especialidades = respuesta["dataEsp"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Ingreso Correcto', detail: 'Los datos de la Especialidad se han Agregado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al agregar los datos: ' + respuesta[0][""] });
      }
      this.TraerEspecialidad();
    }

  }


  async TraerEspecialidad() {
    var GetEspecialidad = { "acc": "E" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetEspecialidad);
    var JsonEspecialidad = respuesta["dataEsp"];
    console.log(JsonEspecialidad);
    this.Especialidades = JsonEspecialidad;
  }

  Especialidad_seleccionado(doc) {
    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdEsp"];
    this.Nombre = doc["sNomEsp"];
  }

  async ActualizarEspecialidad() {
    if (this.Nombre.length < 3 ) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Nombre invalido', detail: 'El nombre de la sucursal no puede tener menos de 3 caracteres' });
    }
    else{
      var Doctor = {
        "acc": "U",
        "idEsp": this.id,
        "nomEsp": this.Nombre,
        "hab": true
      }
      console.log(Doctor);
  
      var respuesta = await this.MediwebServiceService.ActualizarEspecialidad(Doctor);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.Especialidades = respuesta["dataEsp"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Actualizacion Correcta', detail: 'Los datos de la Especialidad se han actualizado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta[0][""] });
      }
      this.TraerEspecialidad();  
    }
    
  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.id = "";
    this.Nombre = "";

  }


}
