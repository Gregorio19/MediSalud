import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-adm-cita',
  templateUrl: './adm-cita.component.html',
  styleUrls: ['./adm-cita.component.scss'],
  providers: [MessageService]
})
export class AdmCitaComponent implements OnInit {


  Sucursusales;
  Sucursal;
  Doctores;
  Doctor;
  EstadosCIta;
  fechaI: Date
  fechaF: Date
  es;

  CItas;
  cols;

  filtros: string;
  ItemsArray;

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService:MessageService) { 
    this.es = undefined;
    this.es = {};
  }

  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
    }
    this.filtros = "";
    this.GetSucursales();

    this.es = {
      firstDayOfWeek: 1,
      today: 'Hoy',
      clear: 'Borrar',
      closeText: "Cerrar",
      prevText: "Anterior",
      nextText: "Siguiente",
      monthNames: ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      weekHeader: "Semana",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
      timeOnlyTitle: "Solo hora",
      timeText: "Tiempo",
      hourText: "Hora",
      minuteText: "Minuto",
      secondText: "Segundo",
      currentText: "Fecha actual",
      ampm: false,
      month: "Mes",
      week: "Semana",
      day: "Día",
      allDayText : "Todo el día"
    }

    this.cols = [
      { header: 'Fecha', nombre: 'Fecha' },
      { header: 'Hora', nombre: 'Hora' },
      { header: 'Cliente', nombre: 'NomCli' },
      { header: 'Rut', nombre: 'RutCli' },
      { header: 'Doctor', nombre: 'NomDoc' },
      { header: 'Rut', nombre: 'RutDoc' },
      { header: 'Prevision', nombre: 'Prevision' },
      { header: 'Estado', nombre: 'Estado' }
    ];

    this.EstadosCIta = [
      { id: '0', nombre: 'Agendado' },
      { id: '1', nombre: 'Anulado' },
      { id: '2', nombre: 'Atendido' },
      { id: '3', nombre: 'En Espera' },
      { id: '4', nombre: 'No AtendidomDoc' },
    ];

  }


  async GetSucursales() {
    var getSuc = { "Tipo": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Sucursusales = [];
    this.Sucursusales.unshift({ "sNombre": "Todas", "iIdSuc": "0" });
    primeratributo.forEach(element => {
      this.Sucursusales.push(element);
    });
    await this.GetDoctor();
    console.log(this.Sucursusales);
    this.Sucursal = this.Sucursusales[0];
    this.Doctor = this.Doctores[0];
  }

  async GetDoctor() {
    var getEsp = { "Tipo": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Doctores = [];
    this.Doctores.unshift({ "sNombre": "Todas", "iIdDoc": "0" });
    primeratributo.forEach(element => {
      this.Doctores.push(element);
    });
    console.log(this.Doctores);

  }

  async GetAllCitas() {
    var fechas = true;
    var fechaI = this.fechaI.getUTCFullYear() + "-" + (this.fechaI.getUTCMonth() + 1) + "-" + this.fechaI.getUTCDate();
    var fechaF =this.fechaF.getUTCFullYear() + "-" + (this.fechaF.getUTCMonth() + 1) + "-" + this.fechaF.getUTCDate();
    if (this.fechaI == undefined || this.fechaF == undefined) {
      fechas =false;
      this.MessageService.clear();
      this.MessageService.add({key: 'tc', severity:'warn', summary: 'Faltan datos por llenar', detail:'Debe inidicar una fecha de inicio y fecha de fin de la cita a consultar'});
    }
    else if(this.fechaI > this.fechaF){
      fechas =false;
      this.MessageService.clear();
      this.MessageService.add({key: 'tc', severity:'warn', summary: 'Error en fechas', detail:'La fecha final no puede ser menor a la inicial'});
    }
    else {
      console.log(this.Doctor["iIdDoc"]);
      console.log(this.Sucursal["iIdSuc"]);
      
      
      var parametro = {
        "idSuc": this.Sucursal["iIdSuc"].toString(),
        "idDoc": this.Doctor["iIdDoc"].toString(),
        "fechaI": this.fechaI.getUTCFullYear() + "-" + (this.fechaI.getUTCMonth() + 1) + "-" + this.fechaI.getUTCDate(),
        "fechaF": this.fechaF.getUTCFullYear() + "-" + (this.fechaF.getUTCMonth() + 1) + "-" + this.fechaF.getUTCDate()
      }
      var respuesta = await this.MediwebServiceService.GetAllCitas(parametro);
      var citas = JSON.parse(respuesta.toString());
      console.log(citas);
      this.CItas = citas;
      this.ItemsArray = citas;
    }
  }

  filtrar() {
    this.CItas = this.ItemsArray;
    var filtar = this.CItas;
    var filtro = this.filtros;
    this.CItas = filtar.filter(function (array) {

      if (array.Fecha.toLowerCase().includes(filtro)) {
        return array
      }
      else if (array.Hora.toString().includes(filtro)) {
        return array
      }
      else if (array.NomCli.toLowerCase().includes(filtro)) {
        return array
      }
      else if (array.RutCli.toLowerCase().includes(filtro)) {
        return array
      }
      else if (array.NomDoc.toString().includes(filtro)) {
        return array
      }
      else if (array.RutDoc.toString().includes(filtro)) {
        return array
      }
      else if (array.Prevision.toString().includes(filtro)) {
        return array
      }
      else if (array.Estado.toString().includes(filtro)) {
        return array
      }
    });
  }

  async cambiotipoagenda(){
    setTimeout(() => {
      console.log(this.CItas);
      this.CItas.forEach(element => {
        if (element.agendas === undefined) {
          
        }
        else{
          element.Estado = element.agendas.nombre;
          var actcita ={
            "id": element["iIdCita"].toString(),
            "idestado": element.agendas.id.toString()
          }
          this.MediwebServiceService.ActCita(actcita);
          element.agendas =undefined;
        }
      });
    }, 200);
  }

}
