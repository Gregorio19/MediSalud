import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaserviceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    this.apiUrl = "http://200.104.114.157/APImweb/api/v1";
   // this.apiUrl = "http://localhost:59510/api/v1";
  }

  async ObtenerLatLong(req) {

    var direccion =
    {
      "direccion":req
    } 

    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ObtenerLatLng" ,direccion, { headers: this.headers }
      ).toPromise();
    } catch (error) {
      let resultado =
      {
        'status': false,
        'data': 'error al ejeceutar petición',
        'codeStatus': error.status
      };
      return resultado;
    }
  }
  
}
