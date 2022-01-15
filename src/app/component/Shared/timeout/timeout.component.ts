import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements OnInit, OnDestroy {

  constructor(private Router: Router) { }
  segundos;
  seguirTiempo;
  ngOnInit(): void {
    this.segundos = 180;
    this.seguirTiempo = true;
    this.detectarclick();
    this.tiempo();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async tiempo() {
    await this.delay(1000);
    this.segundos = this.segundos - 1;
    if (this.seguirTiempo == true) {
      if (this.segundos == 0) {
        this.seguirTiempo = false;
        this.Router.navigate([""]);
      }
      else {
        this.tiempo();
      }
    }
  }

  detectarclick() {
    const boton = document.querySelector("body");
    // Agregar listener
    var esto = this;
    boton.addEventListener("click", function (evento) {
      if (esto.seguirTiempo == true) {
        esto.actualizaseg();
      }
    });
  }

  actualizaseg() {
    this.segundos = 180;
  }

  ngOnDestroy() {
    this.seguirTiempo = false;
  }

}
