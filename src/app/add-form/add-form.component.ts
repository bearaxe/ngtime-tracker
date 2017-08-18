import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../shared/editor/editor.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  showEditor = false;
  options = {'false': 'Add Project', 'true': 'Close'};
  text = this.options[''+this.showEditor];

  constructor(public projServ: ProjectService) { }

  ngOnInit() {
  }

  toggleEditor(){
    this.showEditor = !this.showEditor;
    this.text = this.options[''+this.showEditor];    
  }

}
