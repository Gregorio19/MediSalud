import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-horas-medicas',
  templateUrl: './horas-medicas.component.html',
  styleUrls: ['./horas-medicas.component.scss'],
  providers: [MessageService]
})
export class HorasMedicasComponent implements OnInit {

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  horas;
  CargaCompleta;
  cols;
  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
      return
    }

    this.cols = [
      { header: 'Doctor', nombre: 'nomDoc' },
      { header: 'Especiaidad', nombre: 'nomEsp' },
      { header: 'Dia', nombre: 'fecha' },
      { header: 'Hora Inicio', nombre: 'hIni' },
      { header: 'Hora salida', nombre: 'hFin' },
      { header: 'Colacion', nombre: 'colacion' },
      { header: 'Hora inicio 2', nombre: 'hIni2' },
      { header: 'Hora salida 2', nombre: 'hFin2' },
      { header: 'fin agenda', nombre: 'fecVen' },
    ];
    this.GetHoras();
  }

  async GetHoras() {
    var getSuc ={
      "idSuc": 1
    }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetHorasMedicas(getSuc);
    if (respuesta["status"]) {
      this.horas = respuesta["data"];
      for (let index = 0; index < this.horas.length; index++) {
        const horas1 = this.horas[index];
        const horas2 = this.horas[index+1];
        if (horas2) {
          if (horas1["nomDoc"] == horas2["nomDoc"] && horas1["nomEsp"] == horas2["nomEsp"] && horas1["fecha"] == horas2["fecha"]) {
            this.horas[index]["hIni2"]  = this.horas[index+1]["hIni"]
            this.horas[index]["hFin2"] = this.horas[index+1]["hFin"]
            this.horas[index]["colacion"] = this.horas[index]["hFin"] + " -> " +this.horas[index]["hIni2"];
            this.horas.splice(index+1, 1);

          }
        }
        
        
      }
    }
    this.CargaCompleta = false;
  }

}
