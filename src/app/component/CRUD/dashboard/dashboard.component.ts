import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private Router:Router) { }

  ngOnInit(): void {
    var usu = JSON.parse(localStorage.getItem('tipou'));
    if (usu.toString() != "1") {
      this.Router.navigate([""]);
    }
  }

}
