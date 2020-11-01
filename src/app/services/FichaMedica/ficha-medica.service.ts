import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  apiUrl="";
  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:59510/api/v1/FichaTecnica";
   }

   async TraerSector() {
    try {
      return await this.http.get(
        this.apiUrl  + "/TraerSector" , { headers: this.headers }
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


async TraerMedicamento() {
  try {
    return await this.http.get(
      this.apiUrl  + "/TraerMedicamento" , { headers: this.headers }
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

async AgregarMedicamento(req) {
  try {
    return await this.http.post(
      this.apiUrl  + "/AgregarMedicamento" ,req, { headers: this.headers }
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


async AgregarSector(req) {
  try {
    return await this.http.post(
      this.apiUrl  + "/AgregarSector" ,req, { headers: this.headers }
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
      this.apiUrl  + "/AgregarFichaTecnica" ,req, { headers: this.headers }
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
