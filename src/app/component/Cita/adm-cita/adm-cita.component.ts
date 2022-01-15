import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
declare var $;

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

  cambiado

  CargaCompleta;


  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) {
    this.es = undefined;
    this.es = {};
  }

  ngOnInit(): void {
    this.cambiado = false;
    this.CargaCompleta = false;
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
      return
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
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
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
      allDayText: "Todo el día"
    }

    this.cols = [
      { header: 'id', nombre: 'idcitas' },
      { header: 'idcli', nombre: 'idcli' },
      { header: 'Fecha', nombre: 'fecAge' },
      { header: 'Hora', nombre: 'horAge' },
      { header: 'Tipo Agenda', nombre: 'tipAge' },
      { header: 'Cliente', nombre: 'nomCli' },
      { header: 'Rut', nombre: 'rutCli' },
      { header: 'Doctor', nombre: 'nomMed' },
      { header: 'Mascota', nombre: 'nomMas' },
      { header: 'Cod Agenda', nombre: 'codAge' },
      { header: 'Estado', nombre: 'estCit' }
      // { header: 'N Bono', nombre: 'numBon' }
    ];

    this.EstadosCIta = [
      { id: '0', nombre: 'Agendado' },
      { id: '1', nombre: 'Anulado' },
      { id: '2', nombre: 'Atendido' },
      { id: '3', nombre: 'En Espera' },
      { id: '4', nombre: 'No Atendido' },
    ];

  }


  async GetSucursales() {
    var getSuc = { "acc": "S" }
    this.CargaCompleta = true;
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    if (respuesta["status"]) {
      var primeratributo = respuesta["dataSuc"];
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
  }

  async GetDoctor() {
    this.CargaCompleta = true;
    var getEsp = { "acc": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    if (respuesta["status"]) {
      var primeratributo = respuesta["dataDoc"];
      this.Doctores = [];
      this.Doctores.unshift({ "sNombre": "Todos", "iIdDoc": "0" });
      primeratributo.forEach(element => {
        this.Doctores.push(element);
      });
      console.log(this.Doctores);
    }
    this.CargaCompleta = false;
  }

  async GetAllCitas() {
    this.CargaCompleta = true;
    var fechas = true;
    var fechaI = this.fechaI.getUTCFullYear() + "-" + (this.fechaI.getUTCMonth() + 1) + "-" + this.fechaI.getUTCDate();
    var fechaF = this.fechaF.getUTCFullYear() + "-" + (this.fechaF.getUTCMonth() + 1) + "-" + this.fechaF.getUTCDate();
    if (this.fechaI == undefined || this.fechaF == undefined) {
      fechas = false;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe inidicar una fecha de inicio y fecha de fin de la cita a consultar' });
    }
    else if (this.fechaI > this.fechaF) {
      fechas = false;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Error en fechas', detail: 'La fecha final no puede ser menor a la inicial' });
    }
    else {
      console.log(this.Doctor["iIdDoc"]);
      console.log(this.Sucursal["iIdSuc"]);


      var parametro = {
        "idSuc": parseInt(this.Sucursal["iIdSuc"]),
        "idDoc": parseInt(this.Doctor["iIdDoc"]),
        "fecIni": this.gethoras(this.fechaI),
        "fecFin": this.gethoras(this.fechaF)
      }
      console.log(parametro);

      var respuesta = await this.MediwebServiceService.GetAllCitas(parametro);
      console.log(respuesta);

      if (respuesta["status"]) {
        var citas = respuesta["data"];
        console.log(citas);
        this.CItas = citas;
        this.ItemsArray = citas;
        // setTimeout(() => {
        //   if (this.cambiado == false ) {
        //     $('td:nth-child(1)').toggle();
        //     $('th:nth-child(1)').toggle();
        //     this.cambiado = true;
        //   }
        //   else{
        //     $('td:nth-child(1)').toggle();

        //   }

        // }, 100);
      }

    }
    this.CargaCompleta = false;
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

  async cambiotipoagenda() {
    setTimeout(() => {
      console.log(this.CItas);
      this.CItas.forEach(element => {
        if (element.agendas === undefined) {

        }
        else {
          element.estCit = element.agendas.nombre;
          var actcita = {
            "acc": "E",
            "idcita": element["idcitas"],
            "estado": parseInt(element.agendas.id),
            "camDatCli": false,
            "numBon": 0
          }
          console.log(actcita);

          this.MediwebServiceService.ActCita(actcita);
          element.agendas = undefined;
        }
      });
    }, 200);
  }

  async ActNBono(Nbono, idcita, row) {
    setTimeout(async () => {
      console.log(Nbono);
      console.log("entro a bono", Nbono);
      var actcita = {
        "acc": "B",
        "idcita": idcita,
        "estado": 0,
        "camDatCli": false,
        "numBon": parseInt(Nbono)
      }
      console.log(actcita);

      var resp = await this.MediwebServiceService.ActCita(actcita);
      if (resp["status"] == false) {
        row["numBon"] = "";
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Error N° Bono', detail: resp["message"] });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Cita Actualizada', detail: "La cita a Actualizado el numero de bono correctamente" });
      }
      console.log(resp);
    }, 300);
  }

  async ActNCita(idcita, idcli) {
    localStorage.setItem('idcli', idcli + "")
    setTimeout(async () => {
      console.log(idcita);
      console.log("entro a bono", idcita);
      var actcita = {
        "acc": "C",
        "idcita": idcita,
        "estado": 0,
        "camDatCli": false,
        "numBon": parseInt(idcita)
      }
      console.log(idcita);

      var resp = await this.MediwebServiceService.ActCita(actcita);
      console.log(resp);
    }, 300);
  }

  irFicha(Nbono) {
    console.log(Nbono);

    localStorage.setItem('NBono', Nbono);
    this.Router.navigate(["/FichaTenica"]);
  }

  gethoras(fecha) {
    var fechan;
    let day = fecha.getDate();
    var day2 = day + "";
    if (day < 10) {
      day2 = "0" + day;
    }
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hora = (fecha.getHours() < 10 ? "0" + fecha.getHours() : "" + fecha.getHours())
      + ":" + (fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : "" + fecha.getMinutes())
      + ":" + (fecha.getSeconds() < 10 ? "0" + fecha.getSeconds() : "" + fecha.getSeconds())
      + "." + fecha.getUTCMilliseconds();
    if (month < 10) {
      fechan = `${year}-0${month}-${day2}`;
    } else {
      fechan = `${year}-${month}-${day2}`;
    }

    console.log(fechan);
    return fechan;
  }

  textotooltip(row, index) {
    if (index > 6) {
      return "Detalle cita: " + row['datCit']
    }
    else{
      return "Correo cliente: " + row['correo'] + " Telefono cliente: " + row['numTel']
    }
  }

}
