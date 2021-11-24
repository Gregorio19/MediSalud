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
  //this.apiUrl = "https://demo.nexacon.cl:8080:44393/api/v1";
  this.ngoninit();
}

async ngoninit() {
  var resp = await this.getConfig();
  this.apiUrl = resp["Api_base"];
}

async getConfig(): Promise<any> {
  //await this.getConfig();
  try {
    return await this.http.get('./assets/config/config.json').toPromise();
  } catch (error) {
    return { status: false, code: 804, message: 'Error al ejecutar petición' };
  }
}

  async ObtenerLatLong(req) {
    await this.getConfig();
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
