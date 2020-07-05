import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {

  Nombre;

  id;
  Editar;
  Especialidades;
  cols
  constructor(private MediwebServiceService: MediwebServiceService) { }

  ngOnInit(): void {
    this.Editar = false;
    this.TraerEspecialidad();
    this.cols = [
      { header: 'Nombre', nombre: 'sNomEsp' },
    ];
  }

  async AgregarEspecialidad(){

    var Especialidad = {
      "nombre": this.Nombre
    }
    console.log(Especialidad);
    
    var respuesta = await this.MediwebServiceService.AgregarEspecialidad(Especialidad);
      console.log(respuesta);
  }


  async TraerEspecialidad() {
    var GetEspecialidad = { "Tipo": "E" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetEspecialidad);
    var JsonEspecialidad = JSON.parse(respuesta.toString());
    console.log(JsonEspecialidad);
    this.Especialidades = JsonEspecialidad;
  }

  Especialidad_seleccionado(doc) {
    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdEsp"];
    this.Nombre = doc["sNomEsp"];
  }

 async ActualizarEspecialidad(){
    var Doctor = {
      "id": this.id.toString(), 
      "nombre": this.Nombre
    }
    console.log(Doctor);

    var respuesta = await this.MediwebServiceService.ActualizarEspecialidad(Doctor);
    console.log(respuesta);
    this.TraerEspecialidad();

  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.id = "";
    this.Nombre = "";

  }


}
