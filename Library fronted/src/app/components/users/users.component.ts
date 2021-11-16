import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user'
import { UsersService } from '../../services/users/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    model: User = <User>{};

    constructor(private usersService: UsersService) { }

    getUsers(): void {
        this.usersService.getUsers().subscribe(users => this.users = users);
    }

    ngOnInit() {
        this.getUsers();
    }

    add(): void {
        this.usersService.addUser(this.model as User)
          .subscribe(user => {
            this.users.push(user);
          });
    }

    delete(user: User): void {
        this.users = this.users.filter(u => u !== user);
        this.usersService.deleteUser(user.userID).subscribe();
      }

}