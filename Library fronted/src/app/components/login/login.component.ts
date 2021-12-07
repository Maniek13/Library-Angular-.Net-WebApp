import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { iUserPassword } from 'src/app/interfaces/IUserPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: iUserPassword = <iUserPassword>{};
  modelReg: iUserPassword = <iUserPassword>{};
  userId : number = 0; 
  regVis : boolean = false;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }
  
  login(): void {
    this.usersService.postUserLogin(this.model)
    .subscribe(resp => {
      if(typeof(resp) === 'number' && resp !== 0){
        this.userId = resp;
      }
      else{
          alert("Wrong data");
      }
    });
  }

  regVisibleChangeBtn(): void{
    this.regVis = !this.regVis;
  }

  register(): void {
    this.usersService.addUser(this.modelReg)
    .subscribe(resp => {
      if(typeof(resp) === 'number' && resp !== 0){
        this.userId = resp;
      }
      else{
          alert("Wrong data");
      }
    });
  }

}
