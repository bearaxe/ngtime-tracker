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
      new Project('TestProj 1',0,'A small description',false),
      new Project('TestProj 2',0,'A small description',false),
      new Project('TestProj 3',0,'A small description',false)
  ];

  timerSubj = new Subject<number>();
  currentSub: Subscription;
  runningId: number;

  // any user set options that should be saved go here
  options = {
    'wideScreen': false
  }

  constructor() {
    this.timerSubj.subscribe(
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
    const saveOpts = JSON.stringify(this.options);
    window.localStorage.setItem('time-tracker-data', saveData);
    window.localStorage.setItem('time-tracker-options', saveOpts);
    console.log('loc store:', window.localStorage);
  }

  fetchLocalData(){
    const retrievedData = JSON.parse(window.localStorage.getItem('time-tracker-data'));
    const retrievedOpts = JSON.parse(window.localStorage.getItem('time-tracker-options'));
    console.log('options set to:', this.options);
    console.log('got data from browser:\n', retrievedData);
    if(retrievedData !== null){
      this.setProjects(retrievedData);
    }

    if(retrievedOpts !== null){
      this.setOpts(retrievedOpts);
    }

  }

  setOpts(opts: Object){
    const keys = Object.keys(opts);
    if(keys[0].length === 1){return;} //something went wrong, so use default options instead.
    //NOTE: YOU CAN NOT EVER USE AN OPTIONS WITH 1 CHARACTER NAMES NOW.

    for(const key in keys){
      const currKey=keys[key];
      this.options[currKey] = opts[currKey];
    }
  }

  setProjects(data: Object[]){
    let result: Project[] = [];
    for(const each in data){
      console.log( data[each]);
      result.push(new Project(data[each]['title'], data[each]['time'], data[each]['description'], (data[each]['pinned']?data[each]['pinned']:false)));
      console.log('results: ', result);
    }
    this.projects = result;
  }

  getProjects(){
      return this.projects.slice();
  }

  addNewProject(data: {'title': string, 'description': string}){
    // console.log("adding:", data);
    this.projects.unshift(new Project(data.title, 0, data.description, false));
    // console.log('projects now:', this.projects);
    this.updatedProjectList.next(this.projects);
    this.saveDataLocally();
  }

  updateProject(id: number, data: {'title': string, 'description': string, 'pinned': boolean}){
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
    const newPin =
      (data.pinned === true
        ? this.projects[id].pinned = true
        : this.projects[id].pinned = false);
    this.projects[id] = new Project(newTitle, this.projects[id]['time'], newDesc, newPin);
    this.updatedProjectList.next(this.projects);
    this.saveDataLocally();
  }

  deleteProject(id: number){
    if(!this.projects[id].pinned){
      this.projects.splice(id,1);
      this.updatedProjectList.next(this.projects);
    } else {
      console.log("lol, no. this is protected, my dude");
    }
    // Do not save here. Let the user reload if they made a mistake
  }

  deleteAll(){
    var index = 0;
    const initProjLen = this.projects.length;
    if(this.projects.length === 0){return;}
    for(let attempt = 0; attempt < initProjLen; attempt++ ){
      console.log('attempting to delete ', index, 'at attempt ', attempt, 'of', this.projects.length, 'left');
      if(!this.projects[index].pinned){
        this.deleteProject(index);
      } else {
        index++;
      }
    }
  }

  setPins(setTo){
    for(let i in this.projects ){
      this.updateProject(parseInt(i), {title: '', description: '', pinned: setTo});
    }
  }

  togglePinProject(id: number){
    this.projects[id]['pinned'] = !this.projects[id]['pinned'];
    console.log('The statement "Project', id, 'is pinned" is ' + this.projects[id]['pinned']);
    this.saveDataLocally();
    return this.projects[id]['pinned'];
  }

  saveOption(optionKey, newValue){
    this.options[optionKey] = newValue;
    this.saveDataLocally();
  }

  resetAll(){
    for(let i in this.projects ){
      this.projects[i].time = 0;
    }
  }

  toCSV(){
    console.log("i am doin a run");
    let csvArr = [['title', 'time', 'description']];
    for(let i in this.projects ){
      const csvRow = [this.projects[i].title, ''+this.projects[i].time, this.projects[i].description]
      csvArr.push(csvRow);
    }
    console.log('csvArr:', csvArr);
    this.exportToCsv('projectsCSVFile', csvArr);
  }

  exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

}
