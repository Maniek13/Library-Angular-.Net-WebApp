import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { staticVariables } from 'src/app/statics/staticVariables';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userId : number = staticVariables.userId;
  
  constructor(private route: Router) {
  }

  ngOnInit(): void {
    if(staticVariables.userId <= 0){
      this.route.navigate(['index'])
    }
    else{
      this.userId = staticVariables.userId;
    }
  }

}
