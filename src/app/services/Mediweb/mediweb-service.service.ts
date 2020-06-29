import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediwebServiceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    this.apiUrl = "http://200.104.114.157/APImweb/api/v1";
  }

  async AgregarSucursal(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgregarSucursal" ,req, { headers: this.headers }
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

  async AgregarCliente(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgrearCliente" ,req, { headers: this.headers }
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
  async ActualizarCliente(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActualizarCliente" ,req, { headers: this.headers }
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

  async AgregarEspecialidad(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgrearEspecialidad" ,req, { headers: this.headers }
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

  async AgregarDocotr(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgrearDoctor" ,req, { headers: this.headers }
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

  async AgregarHorarioDoctor(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgrearHorariosDoc" ,req, { headers: this.headers }
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

  async GetDataGeneral(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ConsultaGeneral" ,req, { headers: this.headers }
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

  async GetAllCitas(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/TraerCitas" ,req, { headers: this.headers }
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

  async ObtenerDocXSucursalXEspecialidades(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ObtenerDocXSucursalXEspecialidades" ,req, { headers: this.headers }
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

  async SucursalsxEspecialiad(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ObtenerSucursalXEspecialidades" ,req, { headers: this.headers }
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

  async Traerespecialidad() {
    try {
      return await this.http.get(
        this.apiUrl  + "/Cita/ObtenerEspecialidades" , { headers: this.headers }
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

  async ActCita(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActuCita" ,req, { headers: this.headers }
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
