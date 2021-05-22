import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  Usuario: string;
  Contrasena: string;
  Usuarios;

  constructor(private MediwebServiceService: MediwebServiceService, private messageService: MessageService, private Router: Router) { }

  ngOnInit(): void {
    this.TraerUsuarios();
  }

  async TraerUsuarios() {
    var getcli = {
      "acc": "U"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    console.log(respuesta);
    this.Usuarios = respuesta["dataUsu"];
  }

  logueaer() {
    this.Usuarios.forEach(element => {
      if (element["sUsu"] == this.Usuario &&  element["sClave"] == this.Contrasena) {
        if (element["iPermiso"] == 1) {
          localStorage.setItem('tipou', JSON.stringify(1));
          this.Router.navigate(["/DashBoard"]);
        }
        else{
          localStorage.setItem('tipou', JSON.stringify(2));
          this.Router.navigate(["/DashBoard"]);
        }
      }
    });
    this.messageService.clear();
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Datos invalidos', detail: 'Usuario o contraseña Invalidos' });
  }


}
