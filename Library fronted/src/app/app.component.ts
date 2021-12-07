import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';

  constructor(){
    document.body.style.background = "rgb(29,29,29)";
    document.body.style.padding = "0";
    document.body.style.margin = "0";
  }
}
