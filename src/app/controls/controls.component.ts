import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(public projectServ: ProjectService) { }

  ngOnInit() {
  }

  unpinAll(){
    this.projectServ.setPins(false);
  }

  pinAll(){
    this.projectServ.setPins(true);
  }

  deleteAll(){
    this.projectServ.deleteAll();
  }

}
