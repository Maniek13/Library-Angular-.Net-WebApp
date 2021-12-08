import { Component, OnInit} from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { iUserPassword } from 'src/app/interfaces/IUserPassword';
import { Router } from '@angular/router';
import { staticVariables } from 'src/app/statics/staticVariables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: iUserPassword = <iUserPassword>{};
  modelReg: iUserPassword = <iUserPassword>{};
  regVis : boolean = false;

  constructor(private usersService: UsersService, private route: Router) { }

  ngOnInit(): void {

  }
  
  login(): void {
    this.usersService.postUserLogin(this.model)
    .subscribe(resp => {
      if(typeof(resp) === 'number' && resp !== 0){
        staticVariables.userId = resp;
        this.route.navigate(['main'])
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
        staticVariables.userId = resp;
        this.route.navigate(['main'])
      }
      else{
          alert("Wrong data");
      }
    });
  }

}
