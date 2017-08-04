import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../project.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() id: number = -1;
  editorShowing = false;

  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
    console.log('this linter is obnoxious:', this.id );
  }

  onSubmit(form: NgForm){
    console.log('form values:', form.value);
    if(this.id === -1){
      this.projectServ.addNewProject(form.value);
    } else {
      this.projectServ.updateProject(this.id, form.value);
    }
  }

  close(){
    this.editorShowing = false;
  }

}
