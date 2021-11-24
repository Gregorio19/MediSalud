import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cancelacion',
  templateUrl: './cancelacion.component.html',
  styleUrls: ['./cancelacion.component.scss'],
  providers: [MessageService]
})
export class CancelacionComponent implements OnInit {

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private messageService: MessageService) { }

  RutPaciente;
  CodigoCancelacion
  RutErrorText;

  ngOnInit(): void {
    this.RutErrorText="";
  }
 async  CancelaCita(){
    var Cancelacita = {
      "acc": "A",
      "idcita": 0,
      "estado": 0,
      "camDatCli": true,
      "numBon": 0,
      "rutCli": this.RutPaciente.replace(".", "").replace(".", "").replace(".", ""),
      "codAge": this.CodigoCancelacion
    }

    var datoscance = await this.MediwebServiceService.ActCita(Cancelacita);
    if (datoscance["status"]) {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Cancelacion Correcta', detail: 'Su cita se ha cancelado correctamente' });
    }
    else{
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Cancelacion Erronea', detail: 'EL RUT o Codigo de cancelacion no son correctos' });
    }
    


  }

  formateaRutinpunt() {
    setTimeout(() => {
      if (this.RutPaciente.length > 2) {
        this.RutPaciente = this.formateaRut(this.RutPaciente.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      }
    }, 50);

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

  formateaRut(rut) {

    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
      var sinPuntos = actual.replace(/\./g, "");
      var actualLimpio = sinPuntos.replace(/-/g, "");
      var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      var rutPuntos = "";
      var i = 0;
      var j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        var letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rutPuntos = "." + rutPuntos;
        }
        j++;
      }
      var dv = actualLimpio.substring(actualLimpio.length - 1);
      rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
  }

  DarFormatoRut(){
    var  rutadd = this.RutPaciente.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
    rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
    this.RutErrorText = this.ValidarRut(rutadd.replace(".", "").replace(".", "").replace(".", "").trim()) == true ?   "": "Rut no valido";
    this.RutPaciente = this.formateaRut(this.RutPaciente.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
  }

}
