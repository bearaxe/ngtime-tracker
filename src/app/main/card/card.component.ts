import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../shared/project.model';
import { ProjectService } from '../../project.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() project: Project;
  @Input() id: number;
  showSubEditor = false;
  pinned = false;


  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
    this.pinned = (typeof this.project.pinned === 'undefined'? false: this.project.pinned);
  }

  startTimer(){
    console.log('you started card number: ', this.id);
    this.projectServ.timerSubj.next(this.id);
  }

  pauseTimer(){
    console.log('you stopped card number: ', this.id);
    this.projectServ.timerSubj.next(-1);
  }

  pinProject(){
    console.log('you\'ve pinned project number: ', this.id);
    this.pinned = this.projectServ.togglePinProject(this.id);
  }

}
