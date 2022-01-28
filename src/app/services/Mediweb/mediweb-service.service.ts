import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediwebServiceService {

  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private http: HttpClient) { 
    //.apiUrl = "http://demo.nexacon.cl:8084/api/v1";
    //this.apiUrl = "http://190.47.237.221/ApiAgenda/api/v1";
    //this.apiUrl = "http://demo.nexacon.cl:8080/ApiAgenda/api/v1";
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

  async AgregarSucursal(req) {
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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

  async TraerClienteRut(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetCliente" ,req, { headers: this.headers }
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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

  async AgregarTipoMascota(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/AdministracionTipoMascotas" ,req, { headers: this.headers }
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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

  async GetHorasMedicas(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/GetHorasMedicasV1" ,req, { headers: this.headers }
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

  async GetHorariosAAgenda(req) {
    await this.getConfig();
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

  async Logear(req) {
    await this.getConfig();
    try {
      return await this.http.post(
        this.apiUrl  + "/Listar/login" ,req, { headers: this.headers }
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
    await this.getConfig();
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
