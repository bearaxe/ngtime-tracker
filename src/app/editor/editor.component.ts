import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  showEditor = false;

  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log('form values:', form.value);
    this.projectServ.addNewProject(form.value);
  }

}
