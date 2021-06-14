import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(private Router: Router) { }
  derecho = false;
  ngOnInit(): void {
    localStorage.setItem('tipou', JSON.stringify(3));
  }

  clickderecho() {
    this.derecho = true
  }

  clickizquierdo() {
    if (this.derecho == true) {
      console.log("hola");
      
      //this.Router.navigate(["/Login"]);
      this.Router.navigate(["/Login"]);
    }
    else {
      this.derecho = false;
    }

  }


}
