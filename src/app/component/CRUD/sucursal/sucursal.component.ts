import { Component, OnInit } from '@angular/core';
import { MapaserviceService } from '../../../services/mapa/mapaservice.service';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss'],
  providers: [MessageService]
})
export class SucursalComponent implements OnInit {

  Nombre;
  Direccion: string;
  Horini;
  Horafin;
  Latitud;
  Longitud;

  options: any;
  overlays: any[];

  id;
  Editar;
  Sucursales;
  cols;

  CargaCompleta;

  constructor(private Router:Router, private MapaserviceService: MapaserviceService, private MediwebServiceService: MediwebServiceService, private MessageService: MessageService) { }

  ngOnInit(): void {
    this.CargaCompleta = false;
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1" && usu.toString() != "2") {
      this.Router.navigate([""]);
      return
    }
    this.Nombre = "";
    this.Direccion = "";
    this.options = {
      center: { lat: -33.44889, lng: -70.69265 },
      zoom: 12
    };
    this.Editar = false;
    this.TraerSucursales();
    this.cols = [
      { header: 'Nombre', nombre: 'sNombre' },
      { header: 'Hora Inicio', nombre: 'iHini' },
      { header: 'Hora  Fin', nombre: 'iHfin' },
      { header: 'Direccion', nombre: 'sDirec' }
    ];




  }

  handleMapClick(event) {
    var lat = event["latLng"].lat();
    var long = event["latLng"].lng();
    console.log(lat);
    console.log(long);

    //event: MouseEvent of Google Maps api
  }

  handleOverlayClick(event) {
    console.log(event);
    //event.originalEvent: MouseEvent of Google Maps api
    //event.overlay: Clicked overlay
    //event.map: Map instance
  }

  async obtenerlatlon(map) {
    this.CargaCompleta = true;
    if (this.Direccion == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe ingresar una direccion para ubicar la sucursal en el mapa' });
    }
    else {
      var respuesta = await this.MapaserviceService.ObtenerLatLong(this.Direccion+"");
      console.log(respuesta);

      var direccion = JSON.parse(respuesta.toString())
      console.log(direccion);
      var lat = direccion["results"]["0"]["geometry"]["location"].lat;
      var long = direccion["results"]["0"]["geometry"]["location"].lng;
      this.Latitud = lat;
      this.Longitud = long;
      console.log(long);

      map.setCenter({ lat: lat, lng: long });
      map.setZoom(16);
      this.overlays = [new google.maps.Marker({ position: { lat: lat, lng: long }, title: "mapa", draggable: false })];
    }
    this.CargaCompleta = false;
  }

  async CrearSucursal() {
    this.CargaCompleta = true;
    var horainicio =  moment(this.Horini.toString()).format('HH:mm');
    if (horainicio.toString() == "Invalid date") {
      horainicio = this.Horini.toString();
    }
    var Horafinal =  moment(this.Horafin.toString()).format('HH:mm');
    if (Horafinal.toString() == "Invalid date") {
      Horafinal = this.Horafin.toString();
    }
    var crear = true;
    if (this.Horini == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe indicar una hora de Apertura para la sucursal' });
    }
    else if (this.Horafin == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe indicar una hora de Cierre para la sucursal' });
    }
    else if (Horafinal.split(":")[0] < horainicio.split(":")[0]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser menor a la hora de apertura' });
    }
    else if (Horafinal.split(":")[0] == horainicio.split(":")[0] && Horafinal.split(":")[1] < horainicio.split(":")[1]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser menor a la hora de apertura' });
    }
    else if (Horafinal.split(":")[0] == horainicio.split(":")[0] && Horafinal.split(":")[1] == horainicio.split(":")[1]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser igual a la hora de apertura' });
    }
    else if (this.Nombre == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El nombre no puede estar vacio' });
    }
    else if (this.Direccion == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe ingresar una direccion para ubicar la sucursal en el mapa' });
    }
    else {
      this.Sucursales.forEach(element => {
        if (element["sDirec"] == this.Direccion && element["sNombre"] == this.Nombre) {
          crear = false;
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Sucursal ya existente', detail: 'Ya existe un sucursal creada con el mismo nombre y direccion' });
        }
      });

      if (crear == true) {
        await this.ActualizarCoodernadas();
        var Sucursal = {
            "acc": "N",
            "idsuc": 0,
            "nomSuc": this.Nombre.toString(),
            "direc": this.Direccion.toString(),
            "hini": parseInt(horainicio.split(":")[0]),
            "mini": parseInt(horainicio.split(":")[1]),
            "mFin": parseInt(Horafinal.split(":")[1]),
            "hFin": parseInt(Horafinal.split(":")[0]),
            "lat": this.Latitud.toString().length > 11 ? this.Latitud.toString().substring(0,10):this.Latitud.toString(),
            "lon": this.Longitud.toString().length > 11 ? this.Longitud.toString().substring(0,10):this.Longitud.toString()
        }
        console.log(Sucursal);

        var respuesta = await this.MediwebServiceService.AgregarSucursal(Sucursal);
        console.log(respuesta);
        if (respuesta["message"] == "OK") {
          this.Sucursales = respuesta["dataSuc"];
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Ingreso Correcto', detail: 'Los datos de la Sucursal se han Agregado correctamente' });
        }
        else {
          this.MessageService.clear();
          this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al agregar los datos: ' + respuesta["message"] });
        }
        this.TraerSucursales();
      }
    }
    this.CargaCompleta = false;
  }

  async TraerSucursales() {
    this.CargaCompleta = true;
    var GetSucursales = { "acc": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetSucursales);
    var JsonSucursales = respuesta["dataSuc"];
    console.log(JsonSucursales);
    this.Sucursales = JsonSucursales;
    this.CargaCompleta = false;
  }

  Sucursal_seleccionado(doc) {
    console.log(doc);
    
    var horainicio = (parseInt(doc["iHini"]) < 10 ? "0" + doc["iHini"] : doc["iHini"]) + ":" + (parseInt(doc["iMini"]) < 10 ? "0" + doc["iMini"] : doc["iMini"]);
    var horaFin = (parseInt(doc["iHfin"]) < 10 ? "0" + doc["iHfin"] : doc["iHfin"]) + ":" + (parseInt(doc["iMfin"]) < 10 ? "0" + doc["iMfin"] : doc["iMfin"]);
    horainicio = horainicio + ":00";
    horainicio = (moment(horainicio, 'HH:mm:ss').format('HH:mm'));
    horaFin = horaFin + ":00";
    horaFin = (moment(horaFin, 'HH:mm:ss').format('HH:mm'));
    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdSuc"];
    this.Nombre = doc["sNombre"];
    this.Direccion = doc["sDirec"];
    this.Horini = horainicio;
    this.Horafin = horaFin;
    this.Latitud = parseFloat(doc["slati"]);
    this.Longitud = parseFloat(doc["slong"]);

  }

  async ActualizarSucursal() {
    this.CargaCompleta = true;
    var horainicio =  moment(this.Horini.toString()).format('HH:mm');
    if (horainicio.toString() == "Invalid date") {
      horainicio = this.Horini.toString();
    }
    var Horafinal =  moment(this.Horafin.toString()).format('HH:mm');
    if (Horafinal.toString() == "Invalid date") {
      Horafinal = this.Horafin.toString();
    }

    if (this.Horini == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe indicar una hora de Apertura para la sucursal' });
    }
    else if (this.Horafin == undefined) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe indicar una hora de Cierre para la sucursal' });
    }
    else if (Horafinal.split(":")[0] < horainicio.split(":")[0]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser menor a la hora de apertura' });
    }
    else if (Horafinal.split(":")[0] == horainicio.split(":")[0] && Horafinal.split(":")[1] < horainicio.split(":")[1]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser menor a la hora de apertura' });
    }
    else if (Horafinal.split(":")[0] == horainicio.split(":")[0] && Horafinal.split(":")[1] == horainicio.split(":")[1]) {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Datos Incorrectos', detail: 'La Hora de cierre no puede ser igual a la hora de apertura' });
    }
    else if (this.Nombre == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'El nombre no puede estar vacio' });
    }
    else if (this.Direccion == "") {
      this.MessageService.clear();
      this.MessageService.add({ key: 'tc', severity: 'warn', summary: 'Faltan datos por llenar', detail: 'Debe ingresar una direccion para ubicar la sucursal en el mapa' });
    }
    else {
      await this.ActualizarCoodernadas();
      // var Sucursal = {
      //   "acc": "U",
      //   "idsuc": this.id.toString(),
      //   "nomSuc": this.Nombre.toString(),
      //   "direc": this.Direccion.toString(),
      //   "hini": horainicio.split(":")[0],
      //   "mini": horainicio.split(":")[1],
      //   "mFin": Horafinal.split(":")[1],
      //   "hFin": Horafinal.split(":")[0],
      //   "lat": this.Latitud.toString(),
      //   "lon": this.Longitud.toString()
      // }
      var Sucursal = {
        "acc": "U",
        "idsuc": this.id,
        "nomSuc": this.Nombre.toString(),
        "direc": this.Direccion.toString(),
        "hini": parseInt(horainicio.split(":")[0]),
        "mini": parseInt(horainicio.split(":")[1]),
        "mFin": parseInt(Horafinal.split(":")[1]),
        "hFin": parseInt(Horafinal.split(":")[0]),
        "lat": this.Latitud.toString().length > 11 ? this.Latitud.toString().substring(0,10):this.Latitud.toString(),
        "lon": this.Longitud.toString().length > 11 ? this.Longitud.toString().substring(0,10):this.Longitud.toString()
      }
      console.log(Sucursal);

      var respuesta = await this.MediwebServiceService.ActualizarSucursal(Sucursal);
      console.log(respuesta);
      if (respuesta["message"] == "OK") {
        this.Sucursales = respuesta["dataSuc"];
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'success', summary: 'Actualizacion Correcta', detail: 'Los datos de la Sucursal se han Actualizado correctamente' });
      }
      else {
        this.MessageService.clear();
        this.MessageService.add({ key: 'tc', severity: 'error', summary: 'Error al Ingresar', detail: 'Ha ocurrido un error al actualizar los datos: ' + respuesta["message"] });
      }
      this.TraerSucursales();
    }

    this.CargaCompleta = false;
  }
  Cargar_Nuevamente() {
    this.Editar = false;
    this.id = "";
    this.Nombre = "";
    this.Direccion = "";
    this.Horini = "";
    this.Horafin = "";
    this.Latitud = "";
    this.Longitud = "";

  }

  formathora(hora, minutos) {
    var horainicio = (parseInt(hora) < 10 ? "0" + hora : hora) + ":" + (parseInt(minutos) < 10 ? "0" + minutos : minutos);
    return horainicio;
  }

  async ActualizarCoodernadas() {
    var coordenadas = await this.MapaserviceService.ObtenerLatLong(this.Direccion);
    var direccion = JSON.parse(coordenadas.toString())
    console.log(direccion);
    var lat = direccion["results"]["0"]["geometry"]["location"].lat;
    var long = direccion["results"]["0"]["geometry"]["location"].lng;
    this.Latitud = lat;
    this.Longitud = long;
  }

}
