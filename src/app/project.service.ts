import { Project } from './shared/project.model';

// import { Injectable } from '@angular/core';
//
// @Injectable()
export class ProjectService {
  private projects: Project[] = [
      new Project('TestProj 1',0,'A small description'),
      new Project('TestProj 2',0,'A small description'),
      new Project('TestProj 3',0,'A small description')
  ];

  constructor() { }

  getProjects(){
      return this.projects.slice();
  }

}
