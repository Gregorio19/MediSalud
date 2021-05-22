import { Component, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
    // var domain = "meet.jit.si";
    // var options = {
    //     roomName: "JitsiMeetAPIExample",
    //     width: 700,
    //     height: 580,
    //     parentNode: undefined,
    //     configOverwrite: {},
    //     interfaceConfigOverwrite: {
    //         filmStripOnly: true
    //     }
    // }
    // var api = new JitsiMeetExternalAPI(domain, options);
const domain = 'meet.jit.si';
const options = {
    roomName: 'Softmediksala1',
    width: 700,
    height: 700,
    parentNode: undefined,
    userInfo: {
      email: 'jgpaz19@gmail.com',
      displayName: 'Jose Paz'
  }
};
const api = new JitsiMeetExternalAPI(domain, options);
    console.log("HOLA");
  }

}
