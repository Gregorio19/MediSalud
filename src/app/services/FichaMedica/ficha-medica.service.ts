import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  apiUrl = "";
  constructor(private http: HttpClient) {
    //this.apiUrl = "http://190.47.237.221/ApiAgenda/api/v1/Listar";
    //this.apiUrl = "http://demo.nexacon.cl:8080/api/v1/Listar";
    //this.apiUrl = "http://demo.nexacon.cl:8080/ApiAgenda/api/v1/Listar";
    this.ngoninit();
  }

  async ngoninit() {
    var resp = await this.getConfig();
    this.apiUrl = resp["Api_base"];
  }

  async getConfig(): Promise<any> {
    try {
      return await this.http.get('./assets/config/config.json').toPromise();
    } catch (error) {
      return { status: false, code: 804, message: 'Error al ejecutar petición' };
    }
  }

  async AdministracionSectores(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl + "/AdministracionSectores", req, { headers: this.headers }
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
  async AdministracionMedicamentos(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl + "/AdministracionMedicamentos", req, { headers: this.headers }
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

  async AgregarFichaTecnica(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl + "/InsertarFichaMedica", req, { headers: this.headers }
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

  async obtenerDatosCitaFicha(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl + "/obtenerDatosCitaFicha", req, { headers: this.headers }
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
