import { Project } from './shared/project.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

// import { Injectable } from '@angular/core';
//
// @Injectable()
export class ProjectService {
  updatedProjectList = new Subject<Project[]>();

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
        // this is pause, make it a function eventually for when you need to pause
        if(this.currentSub){
          this.currentSub.unsubscribe();
          this.pauseTimerProtocol(this.runningId);
        }
        // set new id and run timer
        this.runningId = id;
        this.runTimerForProject(this.runningId);
      }
    );
  }


  // this is the OLD id number
  pauseTimerProtocol(id: number){
    // Pause by destroying sub

    // Save whenever you make the localSotorage service
    this.saveDataLocally();
  }


  // this is the NEW id number
  runTimerForProject(id: number){
      // this first one just makes it instant response instead of wait for a second to respond (aka accurate time)
      if(id === -1){
        return;
      }
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
    const saveData = JSON.stringify(this.getProjects());
    console.log('Trying to save this to local storage:', saveData);
    window.localStorage.setItem('time-tracker-data', saveData);
  }

  fetchLocalData(){
    const retrievedData = JSON.parse(window.localStorage.getItem('time-tracker-data'));
    console.log('got data from browser:\n', retrievedData);
    if(retrievedData !== null){
      this.setProjects(retrievedData);
    }
  }

  setProjects(data: Object[]){
    let result: Project[] = [];
    for(const each in data){
      console.log( data[each]);
      result.push(new Project(data[each]['title'], data[each]['time'], data[each]['description']));
      console.log('results: ', result);
    }
    this.projects = result;
  }

  getProjects(){
      return this.projects.slice();
  }

  addNewProject(data: {'title': string, 'description': string}){
    // console.log("adding:", data);
    this.projects.push(new Project(data.title, 0, data.description));
    // console.log('projects now:', this.projects);
    this.updatedProjectList.next(this.projects);
    this.saveDataLocally();
  }

  updateProject(id: number, data: {'title': string, 'description': string}){
    console.log('testing update:');
    console.log('updating project at index:', id, ' to ', new Project(data['title'], this.projects[id]['time'], data['description']) );
    const newTitle =
      (data.title === ''
        ? this.projects[id].title
        : data.title);
    const newDesc =
      (data.description === ''
        ? this.projects[id].description
        : data.description);
    this.projects[id] = new Project(newTitle, this.projects[id]['time'], newDesc);
    this.updatedProjectList.next(this.projects);
    this.saveDataLocally();
  }

  deleteProject(id: number){
    this.projects.splice(id,1);
    this.updatedProjectList.next(this.projects);
    // Do not save here. Let the user reload if they made a mistake
  }

}
