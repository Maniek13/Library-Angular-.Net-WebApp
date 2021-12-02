import { Component, OnInit, Input} from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User = <User>{};
  userId : number = 0; 
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }
  
  login(): void {
    this.usersService.postUserLogin(this.model.login, this.model.password)
    .subscribe(resp => {
      if(typeof(resp) === 'number' && resp !== 0){
        this.userId = resp;
      }
      else{
          alert(resp);
      }
    });
  }

}
