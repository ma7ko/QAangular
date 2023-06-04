import { Component } from '@angular/core';
import { User } from 'src/model/user/User';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  user: User = {};

  constructor(public _userService: UserService) {}

  public logout() {}
}
