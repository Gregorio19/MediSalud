import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  apiUrl="";
  constructor(private http: HttpClient) {
    //this.apiUrl = "http://190.47.237.221/ApiAgenda/api/v1/Listar";
    this.apiUrl = "https://localhost:44393/api/v1/Listar";
    //this.apiUrl = "http://localhost/ApiAgenda/api/v1/Listar";
   }

   async AdministracionSectores(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/AdministracionSectores" ,req, { headers: this.headers }
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
  try {
    return await this.http.post(
      this.apiUrl  + "/AdministracionMedicamentos" ,req, { headers: this.headers }
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
  try {
    return await this.http.post(
      this.apiUrl  + "/InsertarFichaMedica" ,req, { headers: this.headers }
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
  try {
    return await this.http.post(
      this.apiUrl  + "/obtenerDatosCitaFicha" ,req, { headers: this.headers }
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
