import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectService]
})
export class AppComponent implements OnInit{
  title = 'the app';
  constructor(private projectServ: ProjectService){

  }

  ngOnInit() {
    this.projectServ.fetchLocalData();
  }
}
