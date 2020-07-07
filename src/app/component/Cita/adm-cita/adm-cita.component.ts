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
  Especialidad;
  Especialidades;
  EstadosCIta;
  fechaI: Date
  fechaF: Date
  es;

  CItas;
  cols;

  filtros: string;
  ItemsArray;

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService:MessageService) { }

  ngOnInit(): void {
    this.filtros = "";
    this.GetSucursales();

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

    this.cols = [
      { header: 'Fecha', nombre: 'Fecha' },
      { header: 'Hora', nombre: 'Hora' },
      { header: 'Cliente', nombre: 'NomCli' },
      { header: 'Rut', nombre: 'RutCli' },
      { header: 'Doctor', nombre: 'NomDoc' },
      { header: 'Rut', nombre: 'RutDoc' },
      { header: 'Previcsion', nombre: 'Prevision' },
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
    await this.GetEspecialidad();
    console.log(this.Sucursusales);
    this.Sucursal = this.Sucursusales[0];
    this.Especialidad = this.Especialidades[0];
  }

  async GetEspecialidad() {
    var getEsp = { "Tipo": "E" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Especialidades = [];
    this.Especialidades.unshift({ "sNomEsp": "Todas", "iIdEsp": "0" });
    primeratributo.forEach(element => {
      this.Especialidades.push(element);
    });
    console.log(this.Especialidades);

  }

  async GetAllCitas() {
    if (this.fechaI == undefined || this.fechaF == undefined) {
      this.MessageService.clear();
      this.MessageService.add({key: 'tc', severity:'warn', summary: 'Faltan datos por llenar', detail:'Debe inidicar una fecha de inicio y fecha de fin de la cita a consultar'});
    }
    else{
      var parametro = {
        "idSuc": this.Sucursal["iIdSuc"],
        "idDoc": this.Especialidad["iIdEsp"],
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
