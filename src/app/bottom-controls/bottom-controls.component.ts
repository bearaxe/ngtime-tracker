import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-bottom-controls',
  templateUrl: './bottom-controls.component.html',
  styleUrls: ['./bottom-controls.component.css']
})
export class BottomControlsComponent implements OnInit {

  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
  }

  placeholder(){

  }

  deleteAll(){
    console.log('why the hek')
    this.projectServ.deleteAll();
  }

}
