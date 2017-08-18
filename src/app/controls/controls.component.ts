import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  open = ' ⋀';
  close = ' ⋁';
  showBatch = false;
  showBatchDef = "Mass Ops";
  showBatchLbl = this.showBatchDef + this.close;
  showOptions = false;
  showOptionsDef = "Options";
  showOptionsLbl = this.showOptionsDef + this.close;


  constructor(public projectServ: ProjectService) { }

  ngOnInit() {
  }

  toggle(set){
    //close possible opens
    if(set !== 'showBatch'){
      this.showBatch = false;
      this.showBatchLbl = this.showBatchDef + this.close;
    }else{
      this.showOptions = false;
      this.showOptionsLbl = this.showOptionsDef + this.close;
    }
    //toggle
    this[set] = !this[set];
    this[set + 'Lbl'] = this[set + 'Def'] + (this[set]?this.open:this.close);
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
