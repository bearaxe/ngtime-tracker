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

  constructor(private projectServ: ProjectService) { }

  ngOnInit() {
  }

  onClick(){
    console.log('you clicked card number: ', this.id);
    this.projectServ.idSubj.next(this.id);
  }

}
