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
  @Input() inCard = false;
  title = 'null';
  description = 'null';
  @Input() project = {'title': '', 'description': ''};

  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
    console.log('Id of Project this form will edit:', this.id );
    console.log('poject data:', this.project)
    this.title = this.project.title;
    this.description = this.project.description;
  }

  onSubmit(form: NgForm){
    console.log('form values:', form.value);
    if(this.id === -1){
      this.projectServ.addNewProject(form.value);
    } else {
      this.projectServ.updateProject(this.id, form.value);
    }
  }

  delete(){
    this.projectServ.deleteProject(this.id);
  }

  close(){
    this.editorShowing = false;
  }

}
