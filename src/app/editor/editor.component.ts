import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../shared/editor/editor.component';

@Component({
  selector: 'app-main-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorMainComponent implements OnInit {
  showEditor = false;

  constructor() { }

  ngOnInit() {
  }



}
