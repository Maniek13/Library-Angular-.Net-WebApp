import { Component, OnInit, Input} from '@angular/core';
import { User } from 'src/app/interfaces/iUser';
import { UsersService } from 'src/app/services/users/users.service';
import {Router} from '@angular/router';
import { UserPassword } from 'src/app/interfaces/IUserPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: UserPassword = <UserPassword>{};
  modelReg: UserPassword = <UserPassword>{};
  userId : number = 0; 
  regVis : boolean = false;
  constructor(private usersService: UsersService, private router: Router) { }

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
