import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { MainComponent } from './main/main.component';
import { CardComponent } from './main/card/card.component';
import { TimeFormatPipe } from './shared/time-format.pipe';
import { EditorMainComponent } from './editor/editor.component';
import { EditorComponent } from './shared/editor/editor.component';
import { BottomControlsComponent } from './bottom-controls/bottom-controls.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    MainComponent,
    CardComponent,
    TimeFormatPipe,
    EditorMainComponent,
    EditorComponent,
    BottomControlsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
