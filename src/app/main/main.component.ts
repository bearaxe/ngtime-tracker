import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    projectList: Project[];

    constructor(private projectServ:ProjectService) { }

    ngOnInit() {
        this.projectList = this.projectServ.getProjects();
    }

}
