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
    this.Doctores = JSON.parse(respuesta.toString());
    console.log(this.Doctores);
    this.Doctor = this.Doctores[0];
    this.Sucursal = this.Sucursusales[0];
    this.Especialidad = this.Especialidades[0];
    this.OrdenarHorarios();
  }

  async GetSucursales() {
    var getSuc = { "Tipo": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    this.Sucursusales = JSON.parse(respuesta.toString());
    console.log(this.Sucursusales);
  }

  async GetEspecialidad() {
    var getEsp = { "Tipo": "E" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    this.Especialidades = JSON.parse(respuesta.toString());
    console.log(this.Especialidades);

  }

  OrdenarHorarios() {
    setTimeout(() => {
      this.horas = [];
      for (let index = this.Sucursal["iHIni"]; index < (this.Sucursal["iHFin"] + 1); index++) {
        this.horas.push({ "Hora": index.toString() });
      }
      this.minutosI = [];
      this.minutosF = [];
      this.minutosI.push({ "Minuto": "00" });
      this.minutosF.push({ "Minuto": "00" });
      var tiempousado = 0;
      for (let index = 0; index < 11; index++) {
        tiempousado += 5;
        if (tiempousado >= this.Sucursal["iMIni"]) {
          this.minutosI.push({ "Minuto": tiempousado.toString() });
        }
        if (tiempousado <= this.Sucursal["iMFin"]) {
          this.minutosI.push({ "Minuto": tiempousado.toString() });
        }
      }
    }, 1000);
  }

}
