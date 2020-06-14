import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {

  Nombre;
  constructor(private MediwebServiceService: MediwebServiceService) { }

  ngOnInit(): void {
  }

  async AgregarEspecialidad(){

    var Especialidad = {
      "nombre": this.Nombre
    }
    console.log(Especialidad);
    
    var respuesta = await this.MediwebServiceService.AgregarEspecialidad(Especialidad);
      console.log(respuesta);
  }

}
