import { Component, OnInit, ViewChild, ElementRef,Input,Output,EventEmitter } from '@angular/core';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { FichaMedicaService } from '../../../services/FichaMedica/ficha-medica.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as moment from 'moment'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrls: ['./crear-ficha.component.scss'],
  providers: [MessageService]
})

export class CrearFichaComponent implements OnInit {

//emits 
@Input() ModoVista: Boolean;
@Input() IdFichaT: number;
@Output() Impresion = new EventEmitter<any>();

  //Cliente
  IDcli: string;
  RUT: string;
  RutTitular: string;
  Nombre: string;
  NombreTitular: string;
  ApellidoP: string;
  ApellidoM: string;
  NUmTel: string;
  Direccion: string;
  Correo: string;
  fechaN: string
  Prevision: SelectItem;
  sexo: string;
  titular: boolean;

  //Doctor ID
  IdDoctor: string;

  //ID Cita
  IDCita: string;

  minDate: Date;
  maxDate: Date;
  añoactual;
  es: any;

  //Boleanos clientes
  Imprimiendo:boolean;
  Rutvalido;
  telefonovalido;
  emailvalido
  Clintes;
  Previciones;
  ClienteAntiguo = false;

  //texttos clientes
  Rutvalidotext;
  telefonovalidotext;
  emailvalidotext;
  NombreValidotext;
  DireccionValidatext;
  fechaValidatext;


  //Datos Ficha
  RevisionSelect;
  resultadofilter;
  SintomaSelect;

  MotivoConsulta;
  FrecuenciaCar;
  FrecuenciaRes;
  TensionArterial;
  Temperatura;
  Peso;
  Altura;
  IMC;
  EnfermedadAct;
  Antecedentes;
  Diacnostico;
  MetodoComple;

  //Datos array
  Tratamiento = [];
  RevisionesSist;
  RevisionesAgregadas = [];
  Sintomas = [];
  SintomasAgregadas = [];
  //Medicamentos
  Medicamentos;
  MedicamentoSelec;
  resultadoMedfilter;

  Nbono;
  

  constructor(private MediwebServiceService: MediwebServiceService, private Router: Router, private MessageService: MessageService, private FichaMedicaService: FichaMedicaService) { }

  ngOnInit(): void {
    this.Nbono = localStorage.getItem('NBono');
    this.ActualizarDatosCalendario();
    this.GetClientes();
    this.GetPreviciones();
    this.GetrevisionesSistematicas();
    this.GetSintomas();
    this.getMedicamentos();
    this.Imprimiendo = false;
    //this.downloadAsPDF();

  }

  ActualizarDatosCalendario() {
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
      allDayText: "Todo el día",
      dateFormat: 'mm/dd/yy',
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
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

  async GetClientes() {
    var getcli = {
      "Tipo": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.Clintes = JSON.parse(respuesta.toString());
    console.log(this.Clintes);
    this.ObtenerDatosBono();
  }

  async GetPreviciones() {
    var getcli = {
      "Tipo": "P"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    this.Previciones = JSON.parse(respuesta.toString());
    this.Prevision = this.Previciones[0].sNombre;
  }

  async GetrevisionesSistematicas() {
    var respuesta = await this.FichaMedicaService.TraerSector();
    this.RevisionesSist = JSON.parse(respuesta.toString());
  }

  async GetSintomas() {
    this.Sintomas.push("Fiebre", "Dolor de Cabeza", "Malestar")
  }

  async getMedicamentos() {
    var respuesta = await this.FichaMedicaService.TraerMedicamento();
    this.Medicamentos = JSON.parse(respuesta.toString());
    console.log(this.Medicamentos);

  }




  CompararCliente() {
    var clienteEncontrado = false;
    var nrut = this.RUT.replace(".", "").replace(".", "").replace(".", "").trim();
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
        clienteEncontrado = true;
        this.ClienteAntiguo = true;
        this.IDcli = element["iIdCli"];
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString()).toLocaleString().split(" ")[0];
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];
        this.Prevision = this.Previciones[element["iIdPrev"]].sNombre;
        console.log(this.Prevision);

        if (element["btit"] == true) {
          this.titular = false;
        }
        else {
          this.titular = true;
        }

        if (element["sSexo"] == "F") {
          this.sexo = "Femenino";
        }
        else {
          this.sexo = "Masculino";
        }
        this.Rutvalidotext = "";
        this.Rutvalido = true;
        this.RUT = this.formateaRut(this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim());
      }
    });

    if (clienteEncontrado == false) {
      this.ClienteAntiguo = false;
      var rutadd = this.RUT.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim();
      rutadd = rutadd.substring(0, rutadd.length - 1) + "-" + rutadd.substring(rutadd.length - 1, rutadd.length);
      this.Rutvalido = this.ValidarRut(rutadd);
      if (this.Rutvalido == false) {
        this.Rutvalidotext = " EL Rut ingresado es invalido";
      }
      else {
        this.Rutvalidotext = "";
      }
      this.LimpiarDatosCliente();
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cliente no encontrado', detail: 'El cliente no se encuentra registrado, por favor ingrese sus datos y agreguelo para continuar.' });
    }
  }

  LimpiarDatosCliente() {
    this.Nombre = "";
    this.fechaN = "";
    this.Direccion = "";
    this.NUmTel = "";
    this.Correo = "";
    this.Prevision = this.Previciones[0];
  }

  ValidarRut(rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
      return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return (this.dv(rut) == digv);
  }

  dv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }

  compexreg_email() {

    if (this.Correo != "") {
      if (!/^([a-zA-Z0-9\._-])+@{1}([a-zA-Z0-9])+\.{1}([a-zA-Z]){2,3}$/.test(this.Correo)) {
        this.emailvalido = false;
        this.emailvalidotext = "Formato de correo invalido";
      }
      else {
        this.emailvalido = true;
        this.emailvalidotext = "";
      }

    }
    else {
      this.emailvalido = false;
      this.emailvalidotext = "El correo no puede estar vacio";
    }
  }

  compexreg_tel() {

    if (this.NUmTel != "") {
      if (!/^\+{1}([0-9]){11}$/.test(this.NUmTel)) {
        this.telefonovalido = false;
        this.telefonovalidotext = "El formato de telefono es invalido";
      }
      else {
        this.telefonovalido = true;
        this.telefonovalidotext = "";
      }
    }
    else {
      this.telefonovalido = false;
      this.telefonovalidotext = "El telefono se encuentra vacio";
    }
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

  UsuarioAntiguo() {
    this.MessageService.clear();
    this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cambio Bloqueado', detail: 'Los datos asociado a este rut se encuentran bloqueados por cuestiones de seguridad, se enviara un notificacion a nuestros encargados para realizar los cambios en su proxima visita' });
  }
  //Revisiones y Medicamentos
  async DevolverListaRevision(algo) {
    var valor = this.RevisionSelect;
    this.resultadofilter = [];
    var resultado = [];
    await this.RevisionesSist.filter(function (array) {
      if (array["sSector"].toLowerCase().includes(valor.toLowerCase())) {
        resultado.push(array["sSector"]);
      }
    });
    this.resultadofilter = resultado;
  }

  async DevolverListaMedicamento(algo) {
    var valor = this.MedicamentoSelec;
    this.resultadofilter = [];
    var resultado = [];
    await this.Medicamentos.filter(function (array) {
      if (array["sMedic"].toLowerCase().includes(valor.toLowerCase())) {
        resultado.push(array["sMedic"] + " " + array["sGraMed"]);
      }
    });
    this.resultadoMedfilter = resultado;
  }

  async AgregarRevision(tecla) {
    if (this.RevisionSelect.trim() != ""  && this.RevisionSelect) {
      if (tecla) {
        if (tecla.keyCode == 13) {
          this.RevisionesExistentes();
        }
      }
      else {
        this.RevisionesExistentes();
      }
    }
  }

  async AgregarTratamiento(tecla) {
    if (this.MedicamentoSelec.trim() != ""  && this.MedicamentoSelec) {
      if (tecla) {
        if (tecla.keyCode == 13) {
          this.MedicamentosExistentes();
        }
      }
      else {
        this.MedicamentosExistentes();
      }
    }
  }

  async RevisionesExistentes() {
    var valor = this.RevisionSelect;
    var agregado = false;
    var esto = this;
    await this.RevisionesSist.filter(function (array) {
      if (array["sSector"].toLowerCase().includes(valor.toLowerCase())) {
        esto.RevisionesAgregadas.push({ "id": array["iIDsec"], "Nombre": esto.RevisionSelect, "Valor": "" });
        esto.RevisionSelect = "";
        agregado = true;
      }
    });
    if (agregado == false) {
      esto.RevisionesAgregadas.push({ "id": "0", "Nombre": esto.RevisionSelect, "Valor": "" });
      esto.RevisionSelect = "";
    }

  }
  async MedicamentosExistentes() {
    var valor = this.MedicamentoSelec;
    var agregado = false;
    var esto = this;
    await this.Medicamentos.filter(function (array) {
      var medicagra = array["sMedic"].toLowerCase() + " " + array["sGraMed"].toLowerCase();
      if (medicagra == valor.toLowerCase()) {
        esto.Tratamiento.push({ "id": array["iIDMed"], "Farmaco": array["sMedic"], "Gramaje": array["sGraMed"], "Posologia": "" });
        esto.MedicamentoSelec = "";
        agregado = true;
      }
    });
    if (agregado == false) {
      esto.Tratamiento.push({ "id": "0", "Farmaco": esto.MedicamentoSelec, "Gramaje": "", "Posologia": "" });
      esto.MedicamentoSelec = "";
    }
  }





  //Sintomas 

  DevolverListaSintomas(algo) {
    var valor = this.SintomaSelect;
    this.resultadofilter = this.Sintomas.filter(function (array) {
      if (array.toLowerCase().includes(valor.toLowerCase())) {
        return array;
      }
    });
  }

  async AgregarSintoma(tecla) {
    if (this.SintomaSelect.trim() != "" && this.SintomaSelect) {
      if (tecla) {
        if (tecla.keyCode == 13) {
          this.SintomasAgregadas.push({ "Nombre": this.SintomaSelect });
          this.SintomaSelect = "";
        }
      }
      else {
        this.SintomasAgregadas.push({ "Nombre": this.SintomaSelect });
        this.SintomaSelect = "";
      }
    }
  }

  EncontrarSintoma() {
    this.SintomasAgregadas.forEach(element => {
      if (element.Nombre == this.SintomaSelect) {
        return true;
      }
    });
    return false;
  }

  async printDiv() {
    this.Imprimiendo = true;
    this.Impresion.emit(true);
    await this.delay(300);
    var _ = await window.print();
    this.Imprimiendo = false;
    this.Impresion.emit(false);
  }

  //crearPDF
  async downloadAsPDF() {
    console.log("entro");
    await this.delay(3000);
    let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    html2canvas(document.getElementById("ficha")).then(canvas => {
      console.log(canvas);
      const contentDataURL = canvas.toDataURL('image/png');
      console.log(contentDataURL);


      //let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 1, 29.7, 18.0);
      pdf.addPage("1");
      //  pdf.save('Filename.pdf'); 
    });
    await this.delay(1000);
    html2canvas(document.getElementById("ficha2")).then(canvas => {
      console.log(canvas);
      const contentDataURL = canvas.toDataURL('image/png');
      console.log(contentDataURL);


      //let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 18.0);
      pdf.save('Filename.pdf');
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  AgregarFicha() {
    var tratamientoficha = "";
    var revisioesficha = "";
    var i = 0;
    this.Tratamiento.forEach(element => {
      if (element["id"]==0) {
        this.AgregarMedicamento(element);
      }
      if (i == 0) {
        tratamientoficha += element["id"] + "~" + element["Posologia"];
      }
      else {
        tratamientoficha += "|" + element["id"] + "~" + element["Posologia"];
      }
      i++;
    });
    i = 0;
    this.RevisionesAgregadas.forEach(element => {
      if (element["id"]==0) {
        this.AgregarSector(element["Nombre"]);
      }
      if (i == 0) {
        revisioesficha += element["id"] + "~" + element["Nombre"];
      }
      else {
        revisioesficha += "|" + element["id"] + "~" + element["Nombre"];
      }
      i++;



    });
    var fichaenvida = {
      "idCliente": this.IDcli,
      "idCita": this.IDCita,
      "idDoc": this.IdDoctor,
      "motCons": this.MotivoConsulta,
      "enferAct": this.EnfermedadAct,
      "antecedentes": this.Antecedentes,
      "diagnistico": this.Diacnostico,
      "metodosComple": this.MetodoComple,
      "frecuenciaCard": parseInt(this.FrecuenciaCar),
      "tensionArterial": this.TensionArterial,
      "frecuenciaRespiratoria": parseInt(this.FrecuenciaRes),
      "temperatura": parseFloat(this.Temperatura),
      "peso": parseInt(this.Peso),
      "altura": parseInt(this.Altura),
      "imc": parseInt(this.IMC),
      "sectores": revisioesficha,
      "trat": tratamientoficha
    }

    this.FichaMedicaService.AgregarFichaTecnica(fichaenvida);

    console.log(fichaenvida);

  }

  AgregarSector(sector){

   var sectorenv = {
      "nombre": sector
    }
    this.FichaMedicaService.AgregarSector(sectorenv);
  }

  AgregarMedicamento(medicamento){

    var medicamentoenv = {
      "nombre": medicamento.Farmaco,
      "gramaje": medicamento.Gramaje
    }
     this.FichaMedicaService.AgregarMedicamento(medicamentoenv);
   }

   async ObtenerDatosBono(){

    var actcita ={
      "id": "e",
      "idestado": this.Nbono.toString()
    }
    var respuesta = await  this.FichaMedicaService.obtenerDatosCitaFicha(actcita);
    var datos = JSON.parse(respuesta.toString());
    var esto = this;
    this.Clintes.filter(function (array) {
      if (array["iIdCli"] == datos[0]["Idcli"]) {
        esto.RUT = array["sRutCli"];
        esto.CompararCliente();
      }
    });
    this.IdDoctor = datos[0]["IdDoc"];
    this.IDCita = datos[0]["IdCita"];
    console.log(this.IDCita);
   }

}
