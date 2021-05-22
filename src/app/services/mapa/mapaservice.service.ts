import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaserviceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    //this.apiUrl = "http://190.47.237.221/ApiAgenda/api/v1";
  //this.apiUrl = "https://localhost:44393/api/v1";
  this.apiUrl = "http://localhost/ApiAgenda/api/v1";
  }

  async ObtenerLatLong(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/ObtenerLatLng" ,'"'+req+'"', { headers: this.headers }
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
