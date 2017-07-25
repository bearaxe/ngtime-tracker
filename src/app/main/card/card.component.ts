import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../shared/project.model';
import { ProjectService } from '../../project.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() project: Project;
  timer;
  activeTimer = false;


  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
      const tick = Observable.interval(1000)//.filter(activeTimer=>{})
      this.timer = tick.subscribe(
        (number: number) => {
          console.log(number);
        }
      );
  }

}
