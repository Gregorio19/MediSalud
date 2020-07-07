import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-cita',
  templateUrl: './resumen-cita.component.html',
  styleUrls: ['./resumen-cita.component.scss']
})
export class ResumenCitaComponent implements OnInit {

  Cita;
  cliente
  constructor() { }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('Cliente'));
    console.log(this.cliente);
    this.Cita = JSON.parse(localStorage.getItem('DatosCita'));
    console.log(this.Cita);
  }

}
