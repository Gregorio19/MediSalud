import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private Router: Router) { }
  usu;
  ngOnInit(): void {
    this.usu = JSON.parse(localStorage.getItem('tipou'));
    console.log(this.usu)
    if (this.usu.toString() != "1" && this.usu.toString() != "2") {
      this.Router.navigate([""]);
      return
    }
  }

}
