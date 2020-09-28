import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediwebServiceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    this.apiUrl = "http://localhost/APImweb/api/v1";
    //this.apiUrl = "http://localhost:59510/api/v1";
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

  async ActualizarSucursal(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActualizarSucursal" ,req, { headers: this.headers }
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

  async ActualizarEspecialidad(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActualizarEspecialidad" ,req, { headers: this.headers }
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

  async ActualizarDoctor(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActualizarDoctor" ,req, { headers: this.headers }
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

  async ObtenerHorario(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ObtenerHorario" ,req, { headers: this.headers }
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

  async ActualizaHorariosDoc(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/ActualizaHorariosDoc" ,req, { headers: this.headers }
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

  async CrearCitasRotatoria(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/CrearCitasRotatoria" ,req, { headers: this.headers }
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

  async EnviarCorreoSobrecupo(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/EnviarCorreoSobrecupo" ,req, { headers: this.headers }
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

  

  async AgregarCita(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/AgrearCitas" ,req, { headers: this.headers }
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

  async GuardarImagen(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/GuardarImagen" ,req, { headers: this.headers }
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

  async EnviarCorreo(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Cita/EnviarCorreo" ,req, { headers: this.headers }
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
