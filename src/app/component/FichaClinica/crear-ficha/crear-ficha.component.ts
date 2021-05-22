import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
  Imprimiendo: boolean;
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
    this.RUT = localStorage.getItem('RutFicha');
    this.GetClientes();
    this.GetrevisionesSistematicas();
    this.GetSintomas();
    this.getMedicamentos();
    this.Imprimiendo = false;
    //this.downloadAsPDF();

  }


  async GetClientes() {
    var getcli = {
      "acc": "C"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    console.log(respuesta);
    if (respuesta["status"]) {
      this.Clintes = respuesta["dataCli"];
      console.log(this.Clintes);
      await this.GetPreviciones();
    }
  }

  async GetPreviciones() {

    var getcli = {
      "acc": "P"
    }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(getcli);
    if (respuesta["status"]) {
      this.Previciones = respuesta["dataPre"];
      console.log(this.Previciones);
      this.CompararCliente();
    }
  }

  async GetrevisionesSistematicas() {
    var req = {
      "acc": "L"
    }
    var respuesta = await this.FichaMedicaService.AdministracionSectores(req);
    this.RevisionesSist = respuesta["data"];
    console.log(this.RevisionesSist);
    
  }

  async GetSintomas() {
    this.Sintomas.push("Fiebre", "Dolor de Cabeza", "Malestar")
  }

  async getMedicamentos() {
    var req ={
      "acc": "L"
    }
    var respuesta = await this.FichaMedicaService.AdministracionMedicamentos(req);
    this.Medicamentos = respuesta["data"];
    console.log(this.Medicamentos);

  }




  CompararCliente() {
    var esto = this;
    var clienteEncontrado = false;
    var nrut = this.RUT.replace(".", "").replace(".", "").replace(".", "").trim();
    this.Clintes.forEach(element => {
      if (element["sRutCli"].replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim() == nrut.replace(".", "").replace(".", "").replace(".", "").replace("-", "").trim()) {
       console.log(element);
       
        clienteEncontrado = true;
        this.ClienteAntiguo = true;
        this.IDcli = element["iIdCli"];
        this.Nombre = element["sNombre"];
        this.Correo = element["sMail"];
        this.fechaN = new Date(element["dfechNac"].toString()).toLocaleString().split(" ")[0];
        this.NUmTel = element["sNumTel"];
        this.Direccion = element["sDirec"];
        this.Previciones.filter(function (array) {
          if (element["iIdPrev"] == array["iIdPrev"]) {
            esto.Prevision = array;
          }
        });
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
        return;
      }
    });
    if (!this.Rutvalido) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Cliente no encontrado', detail: 'El cliente no se encuentra registrado, por favor ingrese sus datos y agreguelo para continuar.' });  
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
    if (this.RevisionSelect.trim() != "" && this.RevisionSelect) {
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
    if (this.MedicamentoSelec.trim() != "" && this.MedicamentoSelec) {
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
        esto.RevisionesAgregadas.push({ "id": array["iIdsec"], "Nombre": esto.RevisionSelect, "Valor": "" });
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
        esto.Tratamiento.push({ "id": array["iIdmed"], "Farmaco": array["sMedic"], "Gramaje": array["sGraMed"], "Posologia": "" });
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

  async AgregarFicha() {
    var tratamientoficha = "";
    var revisioesficha = "";
    var i = 0;
    console.log(this.Tratamiento);
    
    this.Tratamiento.forEach(element => {
      if (element["id"] == 0) {
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
    console.log(this.RevisionesAgregadas);
    
    this.RevisionesAgregadas.forEach(element => {
      if (element["id"] == 0) {
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
    var iddoctor = parseInt(localStorage.getItem("iddoclog"));
    var IdCita = parseInt(localStorage.getItem("idCitaBono"));
    var fichaenvida =   {
      "acc": "N",
      "idFichM": 0,
      "idCli": this.IDcli,
      "idCit": IdCita,
      "idDoc": iddoctor,
      "motCons": this.MotivoConsulta,
      "enfActual":  this.EnfermedadAct,
      "antec":this.Antecedentes,
      "lisDia": this.Diacnostico,
      "metComp": this.MetodoComple,
      "freCard":  parseInt(this.FrecuenciaCar),
      "tenArt":this.TensionArterial,
      "freRes": parseInt(this.FrecuenciaRes),
      "temp": parseFloat(this.Temperatura),
      "peso":  parseInt(this.Peso),
      "altura": parseInt(this.Altura),
      "imc":  parseInt(this.IMC),
      "detSec":  revisioesficha,
      "detTrat":  tratamientoficha
    }
    //  {
    //   "idCliente": this.IDcli,
    //   "idCita": this.IDCita,
    //   "idDoc": this.IdDoctor,
    //   "motCons": this.MotivoConsulta,
    //   "enferAct": this.EnfermedadAct,
    //   "antecedentes": this.Antecedentes,
    //   "diagnistico": this.Diacnostico,
    //   "metodosComple": this.MetodoComple,
    //   "frecuenciaCard": parseInt(this.FrecuenciaCar),
    //   "tensionArterial": this.TensionArterial,
    //   "frecuenciaRespiratoria": parseInt(this.FrecuenciaRes),
    //   "temperatura": parseFloat(this.Temperatura),
    //   "peso": parseInt(this.Peso),
    //   "altura": parseInt(this.Altura),
    //   "imc": parseInt(this.IMC),
    //   "sectores": revisioesficha,
    //   "trat": tratamientoficha
    // }

 
    console.log(fichaenvida);
    var resp = await this.FichaMedicaService.AgregarFichaTecnica(fichaenvida);
    console.log(resp);
    

    

  }

  AgregarSector(sector) {

    var sectorenv = {
      "acc": "N",
      "idSec": 0,
      "nomSec": sector
    }
    this.FichaMedicaService.AdministracionSectores(sectorenv);
  }

  AgregarMedicamento(medicamento) {

    var medicamentoenv = 
    {
      "acc": "N",
      "idMed": 0,
      "nomMed": medicamento.Farmaco,
      "graMed": medicamento.Gramaje
    }
    this.FichaMedicaService.AdministracionMedicamentos(medicamentoenv);
  }

  async ObtenerDatosBono() {

    var actcita = {
      "id": "e",
      "idestado": this.Nbono.toString()
    }
    var respuesta = await this.FichaMedicaService.obtenerDatosCitaFicha(actcita);
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
