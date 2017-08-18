import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  showBatch = false;
  showOptions = false;

  constructor(public projectServ: ProjectService) { }

  ngOnInit() {
  }

  open(set){
    //close possible opens
    if(set !== 'showBatch'){
      this.showBatch = false;
    }else{
      this.showOptions = false;
    }
    //toggle
    this[set] = !this[set];
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

  toggleScreen(){
    this.projectServ.saveOption('wideScreen', !this.projectServ.options.wideScreen)
  }

}
