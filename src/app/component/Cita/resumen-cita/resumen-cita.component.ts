import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-resumen-cita',
  templateUrl: './resumen-cita.component.html',
  styleUrls: ['./resumen-cita.component.scss']
})
export class ResumenCitaComponent implements OnInit {

  Cita;
  cliente
  constructor(private MediwebServiceService:MediwebServiceService) { }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('Cliente'));
    console.log(this.cliente);
    this.Cita = JSON.parse(localStorage.getItem('DatosCita'));
    console.log(this.Cita);
    this.enviarcorreo();
  }

  async enviarcorreo() {
    await this.delay(1000);
    var correos = this;
    html2canvas(document.getElementById("ficha")).then(canvas => {
      console.log(canvas);
      var dataURL = canvas.toDataURL();
      console.log(dataURL);
      dataURL = dataURL.split("data:image/png;base64,")[1];
      correos.llamarcorreo(dataURL);
  });
  }

  async llamarcorreo(dataURL){
    var req =  {
      "imagen": dataURL,
      "correo": this.cliente.mail
    }
    console.log(req);
    
    var imagenservice = await this.MediwebServiceService.EnviarCorreo(req);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
