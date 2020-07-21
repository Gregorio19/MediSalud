import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-aregar-hdoc',
  templateUrl: './aregar-hdoc.component.html',
  styleUrls: ['./aregar-hdoc.component.scss'],
  providers: [MessageService]
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
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) { }

  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1") {
      this.Router.navigate([""]);
    }
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
      { "dia": "Lunes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Martes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Miercoles", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Jueves", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Viernes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Sabado", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
      { "dia": "Domingo", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false }
    ]

  }
  vercheck(index) {
    //this.horariosxDia[index].Act = !this.horariosxDia[index].Act;
    console.log(this.horariosxDia);

  }

  changePress(presionado) {
    if (presionado == "D") {
      this.horario = undefined;

      this.Sucursal = undefined;
      this.Especialidad = undefined;

      this.pressEspecialidad = false;
      this.pressTiempo = false;
      this.pressSucursal = false;

      this.pressdoctor = true;
    }

    if (presionado == "E") {
      this.pressEspecialidad = true;

      this.horario = undefined;
      this.Sucursal = undefined;

      this.pressTiempo = false;
      this.pressSucursal = false;
    }
    if (presionado == "S") {
      this.OrdenarHorarios();

      //this.GethorarioDoc();


      this.pressTiempo = false;
      this.horario = undefined;
    }
    if (presionado == "T") {
      this.pressTiempo = true;
      // this.OrdenarHorarios();
    }

  }

  async GetDoctores() {
    var getdoc = { "Tipo": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getdoc);
    await this.GetEspecialidad();
    await this.GetSucursales();
    var primeratributo = JSON.parse(respuesta.toString());
    this.Doctores = [];
    this.Doctores.unshift({ "sNombre": "Seleccione" });
    primeratributo.forEach(element => {
      this.Doctores.push(element);
    });
    console.log(this.Doctores);
    this.Doctor = this.Doctores[0];
    this.Sucursal = this.Sucursusales[0];
    this.Especialidad = this.Especialidades[0];
    //this.OrdenarHorarios();
  }

  async GethorarioDoc() {
    var gethdoc = {
      "idDoc": this.Doctor["iIdDoc"].toString(),
      "idSuc": this.Sucursal["iIdSuc"].toString(),
      "idesp": this.Especialidad["iIdEsp"].toString()
    }
    var contlunes = 0;
    var contmartes = 0;
    var contmiercoles = 0;
    var contjueves = 0;
    var contviernes = 0;
    var contsabado = 0;
    var contdomingo = 0;
    var horarioencontrado = false

    var respuesta = await this.MediwebServiceService.ObtenerHorario(gethdoc);
    console.log(respuesta["0"]);
    var horariosDoc = respuesta["0"];
    console.log(horariosDoc);
    var horas = horariosDoc["Horarios"].split(",");
    console.log(horas);

    this.horario = { "min": horariosDoc["MinConsulta"].toString() };
    horas.forEach(element => {
      console.log(element);

      //agregar lunes
      if (element.includes("Lunes")) {
        horarioencontrado = true;
        contlunes++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Lunes") {
            //{ "dia": "Lunes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false },
            if (contlunes == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contlunes > 1) {
            this.horariosxDia.splice(contlunes - 1, 0, { "dia": "Lunes", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });

        }
      }

      //Agregar Martes
      if (element.includes("Martes")) {
        horarioencontrado = true;
        contmartes++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Martes") {
            //{ "dia": "Martes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false },
            if (contmartes == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contmartes > 1) {
          this.horariosxDia.splice((contlunes + contmartes) - 1, 0, { "dia": "Martes", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });
        }
      }

      //Agregar Miercoles
      if (element.includes("Miercoles")) {
        horarioencontrado = true;
        contmiercoles++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Miercoles") {
            //{ "dia": "Miercoles", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false },
            if (contmiercoles == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contmiercoles > 1) {
          this.horariosxDia.splice((contlunes + contmartes + contmiercoles) - 1, 0, { "dia": "Miercoles", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });      
        }
      }

      //Agregar Jueves
      if (element.includes("Jueves")) {
        horarioencontrado = true;
        contjueves++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Jueves") {
            //{ "dia": "Jueves", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false },
            if (contjueves == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contjueves > 1) {
          this.horariosxDia.splice((contlunes + contmartes + contmiercoles + contjueves) - 1, 0, { "dia": "Jueves", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });
        }
      }

      //Agregar Viernes
      if (element.includes("Viernes")) {
        horarioencontrado = true;
        contviernes++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Viernes") {
            //{ "dia": "Viernes", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false },
            if (contviernes == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contviernes > 1) {
          this.horariosxDia.splice((contlunes + contmartes + contmiercoles + contjueves + contviernes) - 1, 0, { "dia": "Viernes", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });
        }
      }

      //Agregar Sabado
      if (element.includes("Sabado")) {
        horarioencontrado = true;
        contsabado++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Sabado") {
            // { "dia": "Sabado", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false }
            if (contsabado == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contsabado > 1) {
          this.horariosxDia.splice((contlunes + contmartes + contmiercoles + contjueves + contviernes + contsabado) - 1, 0, { "dia": "Sabado", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });
        }
      }

      //Agregar Domingo
      if (element.includes("Domingo")) {
        horarioencontrado = true;
        contdomingo++;
        this.horariosxDia.forEach(horariosact => {
          if (horariosact["dia"] == "Domingo") {
            //{ "dia": "Domingo", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false }
            if (contdomingo == 1) {
              horariosact["Act"] = true;
              horariosact["horaI"] = { "Hora": element.split(";")[1] < 10? "0"+element.split(";")[1]:element.split(";")[1] };
              horariosact["minI"] = { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] };
              horariosact["horaF"] = { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] };
              horariosact["minF"] = { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] };
              horariosact["Precar"] = true;
            }
          }
        });
        if (contdomingo > 1) {
          this.horariosxDia.splice((contlunes + contmartes + contmiercoles + contjueves + contviernes + contsabado + contdomingo) - 1, 0, { "dia": "Domingo", "Act": true, "horaI": { "Hora": element.split(";")[1]< 10? "0"+element.split(";")[1]:element.split(";")[1] }, "minI": { "Minuto": element.split(";")[2]< 10? "0"+element.split(";")[2]:element.split(";")[2] }, "horaF": { "Hora": element.split(";")[3]< 10? "0"+element.split(";")[3]:element.split(";")[3] }, "minF": { "Minuto": element.split(";")[4]< 10? "0"+element.split(";")[4]:element.split(";")[4] }, "del": true, "Precar":true });
        }
      }

    });
    console.log(this.horariosxDia);

    this.pressSucursal = true;
    if (horarioencontrado) {
      console.log("HOLA");
      this.changePress('T');
    }

    this.pressSucursal = true;

  }

  async GetSucursales() {
    var getSuc = { "Tipo": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Sucursusales = [];
    this.Sucursusales.unshift({ "sNombre": "Seleccione" });
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
    this.Especialidades.unshift({ "sNomEsp": "Seleccione" });
    primeratributo.forEach(element => {
      this.Especialidades.push(element);
    });
    console.log(this.Especialidades);

  }

  OrdenarHorarios() {
    setTimeout(() => {
      this.horas = [];
      for (let index = this.Sucursal["iHIni"]; index < (this.Sucursal["iHFin"]); index++) {
        if (index < 10) {
          this.horas.push({ "Hora": "0" + index.toString() });
        }
        else {
          this.horas.push({ "Hora": index.toString() });
        }

      }
      this.minutosI = [];
      this.minutosF = [];
      this.minutosI.push({ "Minuto": "00" });
      this.minutosF.push({ "Minuto": "00" });
      var tiempousado = 0;
      for (let index = 0; index < 11; index++) {
        tiempousado += 5;
        if (tiempousado >= this.Sucursal["iMIni"]) {
          if (tiempousado == 5) {
            this.minutosI.push({ "Minuto": "05" });
            this.minutosF.push({ "Minuto": "05" });
          }
          else {
            this.minutosI.push({ "Minuto": tiempousado.toString() });
            this.minutosF.push({ "Minuto": tiempousado.toString() });
          }

        }
        // if (tiempousado <= this.Sucursal["iMFin"]) {
        //   if (tiempousado == 5) {
        //     this.minutosF.push({ "Minuto": "05" });
        //   }
        //   else {
        //     this.minutosF.push({ "Minuto": tiempousado.toString() });
        //   }
        // }
      }
      this.GethorarioDoc();
    }, 500);
  }

  agregardiahoras(dia, pos) {
    this.horariosxDia.splice(pos + 1, 0, { "dia": dia, "Act": false,  "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": true, "Precar":false});
  }
  eliminardiahoras(pos) {
    this.horariosxDia.splice(pos, 1);
  }

  async AgregarHorarioDoc() {
    // if (this.Direccion == "") {
    //   this.MessageService.clear();
    //   this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe ingresar una direccion para ubicar la sucursal en el mapa' });
    // }

    var newhorarios = "";
    var horasmenores = false;
    this.horariosxDia.forEach(element => {
      console.log(element.horaI.Hora);
      console.log(element.horaF.Hora);
      
      if (element.horaI.Hora >= element.horaF.Hora && element.Act == true) {
        horasmenores = true;
      }
    });

    this.horariosxDia.forEach(element => {
      console.log(element);
      //{ "dia": "Domingo", "Act": false, "horaI": "00", "minI": "00", "horaF": "00", "minF": "00", "del": false, "Precar":false }
      if (element.Act == true) {
        if (element.dia == "Lunes") {
          newhorarios += "lu," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Martes") {
          newhorarios += "ma," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Miercoles") {
          newhorarios += "mi," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Jueves") {
          newhorarios += "ju," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Viernes") {
          newhorarios += "vi," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Sabado") {
          newhorarios += "sa," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
        if (element.dia == "Domingo") {
          newhorarios += "do," + element.horaI.Hora + "," + element.minI.Minuto + "," + element.horaF.Hora + "," + element.minF.Minuto + ";"
        }
      }
    });

    if (newhorarios != "" && !newhorarios.includes("undefined")) {
      if (horasmenores == false) {
        newhorarios = newhorarios.substring(0, newhorarios.length - 1)
        console.log(newhorarios);

        var newhdco = {
          "iddoc": this.Doctor["iIdDoc"].toString(),
          "idSuc": this.Sucursal["iIdSuc"].toString(),
          "idEsp": this.Especialidad["iIdEsp"].toString(),
          "tpoAte": this.horario["min"].toString(),
          "hab": "1",
          "horarios": newhorarios
        }
        var respuesta = await this.MediwebServiceService.AgregarHorarioDoctor(newhdco);
        console.log(newhdco);
        if (respuesta[0][""] == "OK") {
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Carga de Horario Correcta', detail: 'Los datos del doctor se han Cargado correctamente' });
          this.Doctor = undefined;
          this.horario = undefined;
          this.Sucursal = undefined;
          this.Especialidad = undefined;
          this.pressEspecialidad = false;
          this.pressTiempo = false;
          this.pressSucursal = false;
          this.pressdoctor = false;
          this.horariosxDia = [
            { "dia": "Lunes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Martes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Miercoles", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Jueves", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Viernes", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Sabado", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false },
            { "dia": "Domingo", "Act": false, "horaI": { "Hora": "00" }, "minI": { "Minuto": "00" }, "horaF": { "Hora": "00" }, "minF": { "Minuto": "00" }, "del": false, "Precar":false }
          ]
        }
        else {
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al actualizar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta[0][""] });
        }
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Error en horas', detail: 'Las horas de inicio no pueden ser mayor o iguales a la de fin' });
      }

    }
    else {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe ingresar al menos un dia y llenarlo' });
    }


  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
