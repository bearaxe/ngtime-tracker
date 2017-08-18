import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs/Subscription';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    projectList: Project[];
    subscription: Subscription;

    constructor(private projectServ:ProjectService) { }

    ngOnInit() {
      this.projectList = this.projectServ.getProjects();
      this.subscription = this.projectServ.updatedProjectList.subscribe(
        (newList) => {
          console.log('found an update!');
          this.projectList = newList;
        });
    }

    startTimer(id){
      console.log('you started card number: ', id);
      this.projectServ.timerSubj.next(id);
    }

}
