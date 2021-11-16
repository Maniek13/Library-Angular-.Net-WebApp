import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user?: User;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('userId'));
    this.usersService.getUser(id)
      .subscribe(user => this.user = <User>(user));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.user) {
      this.usersService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
  }

}
