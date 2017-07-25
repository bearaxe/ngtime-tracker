import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    projectList: Project[];

    constructor(private projectServ:ProjectService) { }

    ngOnInit() {
        this.projectList = this.projectServ.getProjects();
    }

}
