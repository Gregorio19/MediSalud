import { Component, OnInit } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-traer-ficha',
  templateUrl: './traer-ficha.component.html',
  styleUrls: ['./traer-ficha.component.scss'],
  providers: [MessageService]
})
export class TraerFichaComponent implements OnInit {

  Sucursusales;
  Sucursal;
  Doctores;
  Doctor;
  EstadosCIta;
  fechaI: Date
  fechaF: Date
  es;
  Clintes;
  Cliente;
  Bono;

  CItas;
  cols;

  // Inputs
  ModoVista;
  IdFichaT;
  imprimir

  filtros: string;
  ItemsArray;
  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService) {
    this.es = undefined;
    this.es = {};
  }

  ngOnInit(): void {
    this.ModoVista = true;
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
      { header: 'Id', nombre: 'IdFicha' },
      { header: 'Cliente', nombre: 'NombreCli' },
      { header: 'Rut', nombre: 'RutCli' },
      { header: 'Doctor', nombre: 'NombreDoc' },
      { header: 'Sucursal', nombre: 'NombreSuc' },
      { header: 'N° Bono', nombre: 'NroBono' },
      { header: 'Fecha', nombre: 'FechaFicha' },
      { header: 'Hora', nombre: 'HoraFicha' }
    ];
  }


  async GetSucursales() {
    var getSuc = { "acc": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getSuc);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Sucursusales = [];
    this.Sucursusales.unshift({ "sNombre": "Todas", "iIdSuc": 0 });
    primeratributo.forEach(element => {
      this.Sucursusales.push(element);
    });
    await this.GetDoctor();
    await this.GetClientes();
    console.log(this.Sucursusales);
    this.Sucursal = this.Sucursusales[0];
    this.Doctor = this.Doctores[0];
    this.Cliente = this.Clintes[0];

  }

  async GetClientes() {
    var getcli = {
      "acc": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.Clintes = JSON.parse(respuesta.toString());
    this.Clintes.splice(0, 0, { "iIdCli": 0, "sRutCli": "Todos" });
    console.log(this.Clintes);
  }

  async GetDoctor() {
    var getEsp = { "acc": "D" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getEsp);
    var primeratributo = JSON.parse(respuesta.toString());
    this.Doctores = [];
    this.Doctores.unshift({ "sNombre": "Todos", "iIdDoc": 0 });
    primeratributo.forEach(element => {
      this.Doctores.push(element);
    });
    console.log(this.Doctores);

  }

  async GetAllCitas() {
    var fechas = true;
    if (!this.fechaI || !this.fechaF) {
      fechas = false;
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe inidicar una fecha de inicio y fecha de fin de la cita a consultar' });
    }
    else {
      var fechaI = this.getfechas(this.fechaI);
      var fechaF = this.getfechas(this.fechaF);
    }

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
        "iIdSuc": this.Sucursal["iIdSuc"],
        "iIdDoc": this.Doctor["iIdDoc"],
        "iNumBono": !this.Bono ? 0 : this.Bono,
        "sFecIni": fechaI,
        "sFecFin": fechaF,
        "sRutCli": this.Cliente["iIdCli"]
      }
      console.log(parametro);

      var respuesta = await this.MediwebServiceService.ObtenerCitasMedicas(parametro);
      var citas = JSON.parse(respuesta.toString());
      console.log(citas);
      this.CItas = citas;
      this.ItemsArray = citas;
    }
  }

  getfechas(date: Date) {
    var fecha;
    date;
    let day2  = date.getDate();
    let day = day2 <10 ? "0"+day2: day2;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hora = (date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours())
      + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes())
      + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : "" + date.getSeconds())
      + "." + date.getUTCMilliseconds();
    if (month < 10) {
      fecha = `${year}-0${month}-${day}`;
    } else {
      fecha = `${year}-${month}-${day}`;
    }
    return fecha;
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

  GetDatosImpresion(e: any) {
    this.imprimir = e;
    console.log(this.imprimir);

  }

  irFicha(Nbono) {
    console.log(Nbono);

    localStorage.setItem('NBono', Nbono);
    this.Router.navigate(["/FichaTenica"]);
  }

}
