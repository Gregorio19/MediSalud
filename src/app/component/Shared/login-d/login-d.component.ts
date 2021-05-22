import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-d',
  templateUrl: './login-d.component.html',
  styleUrls: ['./login-d.component.scss'],
  providers: [MessageService]

})
export class LoginDComponent implements OnInit {

  Usuario: string;
  Contrasena: string;
  Usuarios;

  constructor(private MediwebServiceService: MediwebServiceService, private messageService: MessageService, private Router: Router) { }

  ngOnInit(): void {
  }



  async logueaer() {
    this.Usuario = this.formateaRut(this.Usuario.replace(".", "").replace(".", "").replace(".", "").replace("-", ""));
    var getcli = {
      "sRut": this.Usuario.replace(".", "").replace(".", "").replace(".", ""),
      "sPass": this.Contrasena
    }
    var respuesta = await this.MediwebServiceService.LogDoctor(getcli);
    if (respuesta["status"] == true && respuesta["code"] == 200) {
      localStorage.setItem('iddoclog', respuesta["out"]);
      localStorage.setItem('tipou', JSON.stringify(4));
      this.Router.navigate(["/CitaFicha"]);
    }
    else {
      this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Datos invalidos', detail: 'Usuario o contraseña Invalidos' });
    }
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Datos invalidos', detail: 'Usuario o contraseña Invalidos' });
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

}
