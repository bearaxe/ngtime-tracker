import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
    projectList: Project[];
    private subscription: Subscription;
    widescreen = false;

    constructor(private projectServ:ProjectService) { }

    ngOnInit() {
        this.projectList = this.projectServ.getProjects();
        this.subscription = this.projectServ.updatedProjectList.subscribe(
        (newList) => {
            console.log('found an update!');
            this.projectList = newList;
        });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    toggleScreen(){
      this.widescreen = !this.widescreen;
    }

}
