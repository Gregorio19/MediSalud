import { Component, OnInit } from '@angular/core';
import { MapaserviceService } from '../../../services/mapa/mapaservice.service';
import { MediwebServiceService } from '../../../services/Mediweb/mediweb-service.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
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

  constructor(private MapaserviceService: MapaserviceService, private MediwebServiceService: MediwebServiceService) { }

  ngOnInit(): void {
    this.options = {
      center: { lat: -33.44889, lng: -70.69265 },
      zoom: 12
    };
    this.Editar = false;
    this.TraerSucursales();
    this.cols = [
      { header: 'Nombre', nombre: 'sNombre' },
      { header: 'Hora Inicio', nombre: 'iHIni' },
      { header: 'Hora  Fin', nombre: 'iHFin' },
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
    var respuesta = await this.MapaserviceService.ObtenerLatLong(this.Direccion);
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

  async CrearSucursal() {

    var Sucursal = {
      "nombre": this.Nombre,
      "direccion": this.Direccion,
      "horaInicio": this.Horini,
      "horaFin": this.Horafin,
      "latitud": this.Latitud.toString(),
      "longitud": this.Longitud.toString()
    }
    console.log(Sucursal);

    var respuesta = await this.MediwebServiceService.AgregarSucursal(Sucursal);
    console.log(respuesta);
  }

  async TraerSucursales() {
    var GetSucursales = { "Tipo": "S" }
    var respuesta = await this.MediwebServiceService.GetDataGeneral(GetSucursales);
    var JsonSucursales = JSON.parse(respuesta.toString());
    console.log(JsonSucursales);
    this.Sucursales = JsonSucursales;
  }

  Sucursal_seleccionado(doc) {
    var horainicio = (parseInt(doc["iHIni"])<10 ?  "0"+doc["iHIni"] : doc["iHIni"]) +":"+  (parseInt(doc["iMFin"])<10 ?  "0"+doc["iMFin"] : doc["iMFin"]);
    var horaFin = (parseInt(doc["iHFin"])<10 ?  "0"+doc["iHFin"] : doc["iHFin"]) +":"+  (parseInt(doc["iMFin"])<10 ?  "0"+doc["iMFin"] : doc["iMFin"]);

    console.log(doc);
    this.Editar = true;
    this.id = doc["iIdSuc"];
    this.Nombre = doc["sNombre"];
    this.Direccion = doc["sDirec"];
    this.Horini = horainicio;
    this.Horafin = horaFin;
    this.Latitud =parseFloat(doc["slati"]);
    this.Longitud = parseFloat(doc["slong"]) ;
    
  }

  async ActualizarSucursal() {
    var Sucursal = {
      "id": this.id.toString(),
      "nombre": this.Nombre,
      "direccion": this.Direccion,
      "horaInicio": this.Horini,
      "horaFin": this.Horafin,
      "latitud": this.Latitud.toString(),
      "longitud": this.Longitud.toString()
    }
    console.log(Sucursal);

    var respuesta = await this.MediwebServiceService.ActualizarSucursal(Sucursal);
    console.log(respuesta);
    this.TraerSucursales();

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

  formathora(hora,minutos){
    var horainicio = (parseInt(hora)<10 ?  "0"+hora : hora) +":"+  (parseInt(minutos)<10 ?  "0"+minutos : minutos);
  return horainicio;
  }

}
