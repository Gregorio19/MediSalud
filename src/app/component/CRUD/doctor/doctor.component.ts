import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(private MediwebServiceService: MediwebServiceService) { }

  ngOnInit(): void {
  }

  rut;
  nombre;
  tel;
  mail;
  nomImagen;
  inforDoc;
  async AgregarDosctor(){

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
