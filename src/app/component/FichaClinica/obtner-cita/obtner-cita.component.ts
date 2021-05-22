import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-obtner-cita',
  templateUrl: './obtner-cita.component.html',
  styleUrls: ['./obtner-cita.component.scss'],
  providers: [MessageService]
})
export class ObtnerCitaComponent implements OnInit {

  Clinte;
  NumBono;
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {
  }

  async traerCitaBono() {

    var getcli = {
      "numBon": this.NumBono
    }
    var respuesta = await this.MediwebServiceService.GetDatosCliente(getcli);
    if (respuesta["status"]) {
      if (respuesta["data"].length > 0) {
        this.Clinte = respuesta["data"];
        this.Clinte["idcita"] = respuesta["message"]
        console.log(this.Clinte);
        this.CrearCita();
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos invalidos', detail: 'Numero de Bono no registrado  o ya usado' });
      }
    }
    else {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos invalidos', detail: 'Numero de Bono no registrado  o ya usado' });
    }
  }

  CrearCita() {
    console.log(this.Clinte["idcita"]);
    
    localStorage.setItem('NBono', this.NumBono);
    localStorage.setItem('idCitaBono', this.Clinte["idcita"]);
    localStorage.setItem('RutFicha', this.Clinte["0"]["sRutCli"]);
    this.Router.navigate(["FichaTenica"]);

  }

}
