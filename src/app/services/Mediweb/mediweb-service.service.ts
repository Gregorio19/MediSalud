import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediwebServiceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    this.apiUrl = "https://localhost:44393/api/v1";
    //this.apiUrl = "http://190.47.237.221/ApiAgenda/api/v1";
    //this.apiUrl = "http://localhost/ApiAgenda/api/v1";
  }

  async AgregarSucursal(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/AdministracionSucursales" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionSucursales" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionClientes" ,req, { headers: this.headers }
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

  async AgregarMascota(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/AdministracionMascotas" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/ActualizarCliente" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionEspecialidades" ,req, { headers: this.headers }
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

  async AgregarRaza(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/AdministracionRazas" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionEspecialidades" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionDoctores" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/AdministracionDoctores" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/InsertarHorasMedicos" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/GetHorarios" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/InsertarHorasMedicos" ,req, { headers: this.headers }
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

  async GetDatosCliente(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetDatosCliente" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/GetDatos" ,req, { headers: this.headers }
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

  async GetDataRazaxtipo(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetRazas" ,req, { headers: this.headers }
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

  async GetDataMacotaCliente(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetMascotas" ,req, { headers: this.headers }
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

  async LogDoctor(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetCredencialesDoc" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/GetCitas" ,req, { headers: this.headers }
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

  async ObtenerCitasMedicas(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/ObtenerCitasMedicas" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/ObtenerDocXSucursalXEspecialidades" ,req, { headers: this.headers }
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

  async ConsDetCitDoc(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetDetalleCitasDoc" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/ObtenerEspecialidades" , { headers: this.headers }
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
        this.apiUrl  + "/Listar/updateCitas" ,req, { headers: this.headers }
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

  async ActuNBonoCita(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/ActuNBonoCita" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/InsertarCitasVarias" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/EnviarCorreoSobrecupo" ,req, { headers: this.headers }
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

  async EnviarCorreorotatorio(req) {
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/EnviarCorreorotatorio" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/InsertarCitas" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/GuardarImagen" ,req, { headers: this.headers }
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
        this.apiUrl  + "/Listar/EnviarCorreo" ,req, { headers: this.headers }
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
