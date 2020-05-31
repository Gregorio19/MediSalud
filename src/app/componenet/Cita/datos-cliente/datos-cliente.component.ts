import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss']
})
export class DatosClienteComponent implements OnInit {

  fechaN: Date
  minDate: Date;
  maxDate: Date;
  añoactual;
  es: any;
  sexo:string;
  titular:string;
  constructor() { }

  ngOnInit(): void {
    this.sexo = "Masculino";
    this.titular = "NO";
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    console.log(year);
    
    this.añoactual = "1915:"+year;
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  cambiosexo(){
    console.log(this.sexo);
    
  }
}
