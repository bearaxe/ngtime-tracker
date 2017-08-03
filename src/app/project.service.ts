import { Project } from './shared/project.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { current } from 'codelyzer/util/syntaxKind';

// import { Injectable } from '@angular/core';
//
// @Injectable()
export class ProjectService {
  private projects: Project[] = [
      new Project('TestProj 1',0,'A small description'),
      new Project('TestProj 2',0,'A small description'),
      new Project('TestProj 3',0,'A small description')
  ];

  idSubj = new Subject<number>();
  currentSub: Subscription;
  runningId: number;

  constructor() {
    this.idSubj.subscribe(
      (id: number) => {
        // If this is already running, ignore click to prevent weird timer behavior
        if(this.runningId === id){
          return;
        }
        // if you already have a subscription, delete it
        if(this.currentSub){
          this.currentSub.unsubscribe();
          this.pauseTimerForProject(this.runningId);
        }
        // set new id and run timer
        this.runningId = id;
        this.runTimerForProject(this.runningId);
      }
    );
  }



  pauseTimerForProject(id: number){
    // Save whenever you make the localSotorage service
  }

  runTimerForProject(id: number){
      // this first one just makes it instant response instead of wait for a second to respond (aka accurate time)
      this.projects[this.runningId].time++;
      const tick = Observable.interval(1000);
      // should reset every call
      this.currentSub = tick.subscribe(
        (number: number) => {
          this.projects[this.runningId].time++;
          console.log(number);
        }
      );
  }

  saveDataLocally(){

  }

  getProjects(){
      return this.projects.slice();
  }

}
