import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-aregar-hdoc',
  templateUrl: './aregar-hdoc.component.html',
  styleUrls: ['./aregar-hdoc.component.scss']
})
export class AregarHDocComponent implements OnInit {

  Doctores;
  Sucursusales;
  Especialidades;

  Doctor;
  Sucursal;
  Especialidad;

  horarios;
  horario;

  horariosxDia;

  horas: any[];
  minutosI: any[];
  minutosF: any[];

  pressdoctor: boolean;
  pressEspecialidad: boolean;
  pressTiempo: boolean;
  pressSucursal: boolean;
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router) { }

  ngOnInit(): void {
    this.GetDoctores();
    this.pressdoctor = false;
    this.pressEspecialidad = false;
    this.pressTiempo = false;
    this.pressSucursal = false;
    this.horarios = [
      { "min": "seleccione" },
      { "min": "10" },
      { "min": "15" },
      { "min": "20" },
      { "min": "25" },
      { "min": "30" },
      { "min": "35" },
      { "min": "40" },
      { "min": "45" },
      { "min": "50" },
      { "min": "55" },
      { "min": "60" }
    ]

    this.horariosxDia = [
      { "dia": "Lunes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Martes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Miercoles", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Jueves", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Viernes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Sabado", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" },
      { "dia": "Domingo", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00" }
    ]

  }
  vercheck(index) {
    this.horariosxDia[index].Act = !this.horariosxDia[index].Act;
    console.log(this.horariosxDia);

  }

  changePress(presionado) {
    if (presionado == "D") {
      this.pressdoctor = true;
    }

    if (presionado == "E") {
      this.pressEspecialidad = true;
    }

    if (presionado == "T") {
      this.pressTiempo = true;
      this.OrdenarHorarios();
    }

    if (presionado == "S") {
      this.pressSucursal = true;
      this.OrdenarHorarios();
    }

    
  }

  async GetDoctores() {
    var getdoc = { "Tipo": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getdoc);
    await this.GetEspecialidad();
    await this.GetSucursales();
    var primeratributo = JSON.parse(respuesta.toString());
    this.Doctores = [];  
    this.Doctores.unshift({"sNombre": "Seleccione"});
    primeratributo.forEach(element => {
      this.Doctores.push(element);
    });
    console.log(this.Doctores);
    this.Doctor = this.Doctores[0];
    this.Sucursal = this.Sucursusales[0];
    this.Especialidad = this.Especialidades[0];
    this.OrdenarHorarios();
  }

  async GetSucursales() {
    var getSuc = { "Tipo": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Sucursusales = [];  
    this.Sucursusales.unshift({"sNombre": "Seleccione"});
    primeratributo.forEach(element => {
      this.Sucursusales.push(element);
    });
    console.log(this.Sucursusales);
  }

  async GetEspecialidad() {
    var getEsp = { "Tipo": "E" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Especialidades = [];  
    this.Especialidades.unshift({"sNomEsp": "Seleccione"});
    primeratributo.forEach(element => {
      this.Especialidades.push(element);
    });
    console.log(this.Especialidades);

  }

  OrdenarHorarios() {
    setTimeout(() => {
      this.horas = [];
      this.horas.push({ "Hora": "Seleccione" });
      for (let index = this.Sucursal["iHIni"]; index < (this.Sucursal["iHFin"] + 1); index++) {
        if (index < 10) {
          this.horas.push({ "Hora": "0"+index.toString() });
        }
        else{
          this.horas.push({ "Hora": index.toString() });
        }
        
      }
      this.minutosI = [];
      this.minutosF = [];
      this.minutosI.push({ "Minuto": "Seleccione" });
      this.minutosF.push({ "Minuto": "Seleccione" });
      this.minutosI.push({ "Minuto": "00" });
      this.minutosF.push({ "Minuto": "00" });
      var tiempousado = 0;
      for (let index = 0; index < 11; index++) {
        tiempousado += 5;
        if (tiempousado >= this.Sucursal["iMIni"]) {
          if (tiempousado == 5 ) {
            this.minutosI.push({ "Minuto": "05" });
          }
          else{
            this.minutosI.push({ "Minuto": tiempousado.toString() });
          }
          
        }
        if (tiempousado <= this.Sucursal["iMFin"]) {
          if (tiempousado == 5 ) {
            this.minutosF.push({ "Minuto": "05" });
          }
          else{
            this.minutosF.push({ "Minuto": tiempousado.toString() });
          }
        }
      }
    }, 1000);
  }

  async AgregarHorarioDoc(){
    var newhorarios = "";
    this.horariosxDia.forEach(element => {
      console.log(element);
      
      if (element.Act == true) {
        if (element.dia == "Lunes") {
          newhorarios += "lu,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Martes") {
          newhorarios += "ma,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Miercoles") {
          newhorarios += "mi,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Jueves") {
          newhorarios += "ju,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Viernes") {
          newhorarios += "vi,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Sabado") {
          newhorarios += "sa,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
        if (element.dia == "Domingo") {
          newhorarios += "do,"+element.horaI.Hora+","+element.minI.Minuto+","+element.horaF.Hora+","+element.minF.Minuto+";"
        }
      }
    });

    if (newhorarios != "") {
      newhorarios = newhorarios.substring(0,newhorarios.length-1)
    }
    console.log(newhorarios);
    
    var newhdco = {
      "iddoc": this.Doctor["iIdDoc"].toString(),
      "idSuc": this.Sucursal["iIdSuc"].toString(),
      "idEsp": this.Especialidad["iIdEsp"].toString(),
      "tpoAte":this.horario["min"].toString(),
      "hab": "1",
      "horarios": newhorarios
    }
    await this.MediwebServiceService.AgregarHorarioDoctor(newhdco);
    console.log(newhdco);
    
  }

}
