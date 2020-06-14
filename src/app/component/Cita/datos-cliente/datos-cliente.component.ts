import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import {SelectItem} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss']
})
export class DatosClienteComponent implements OnInit {

  RUT: string;
  Nombre: string;
  NUmTel: string;
  Direccion: string;
  Correo: string;
  fechaN: Date
  Prevision: SelectItem;
  sexo: string;
  titular: string;


  minDate: Date;
  maxDate: Date;
  añoactual;
  es: any;

  Clintes: any;
  Previciones: SelectItem[];

  constructor(private MediwebServiceService: MediwebServiceService,private Router:Router) { }

  ngOnInit(): void {
    this.GetPreviciones();
    this.GetClientes();
    this.sexo = "Masculino";
    this.titular = "NO";
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    console.log(year);

    this.añoactual = "1915:" + year;
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  cambiosexo() {
    console.log(this.sexo);

  }

  async GetClientes() {

    var getcli = {
      "Tipo": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);

    this.Clintes = JSON.parse(respuesta.toString());
    console.log(this.Clintes);
  }

  async GetPreviciones() {

    var getcli = {
      "Tipo": "P"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);

    this.Previciones = JSON.parse(respuesta.toString());
    console.log(this.Previciones);
  }

  async AgregarCliente() {
    var estitu = this.titular == "SI" ? 1:0;
    var susexo = this.sexo == "Masculino" ? 'M':'F';
    var rutadd = this.RUT.replace(".","").replace("-","");
    rutadd =  rutadd.substring(0,rutadd.length-1)+"-"+ rutadd.substring(rutadd.length-1,rutadd.length);
    console.log(this.fechaN);
    
    var Addcli = {
      "id": "0",
      "rut": rutadd,
      "nombre": this.Nombre,
      "tel": this.NUmTel,
      "mail": this.Correo,
      "direccion": this.Direccion,
      "cumpleaños": this.fechaN.getUTCFullYear()+"-"+(this.fechaN.getUTCMonth()+1)+"-"+this.fechaN.getUTCDate()+"T00:00:00",
      "idprev": this.Prevision["iIdPrev"],
      "titular": estitu,
      "sexo": susexo
    }
    
    console.log(Addcli);
    
    var exitcli = this.Clintes.filter(function(array) {
      if (array.sRutCli.replace(".","").replace("-","") == rutadd.replace(".","").replace("-","") ) {
        return array;
      } 
    });
    if (exitcli.length ==0){
      await this.MediwebServiceService.AgregarCliente(Addcli);
      this.Router.navigate(["Agendar"]);
    }
    else{
     // this.Router.navigate(["Agendar"]);
    }
    
  }

  CompararCliente() {
    console.log(this.Prevision);
    var nrut = this.RUT.replace(".", "");
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".","").replace("-","") == nrut.replace(".","").replace("-","")) {
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString()) ;
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];
        this.Prevision = this.Previciones[element["iIdPrev"]];
        if (element["btit"] == true) {
          this.titular = "SI";
        }
        else{
          this.titular = "NO";
        }
        
        if (element["sSexo"] == "F") {
          this.sexo = "Femenino";
        }
        else {
          this.sexo = "Masculino";
        }
      }
    });
  }
}
