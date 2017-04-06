import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { User } from './model';
import { UserService } from '../signup/signup.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  users: User;

  ngOnInit() {
    this.titleService.setTitle("Your Dashboard");
    this.signin();
  };

  signin() {
    this.userService.getuser(localStorage.getItem('user'))
      .subscribe(
      User => {
        this.users = User;
      },
      Error => {
        console.log(Error);
      }
      )
  }
  public constructor(private titleService: Title, private router: Router, private userService: UserService) {
  }
}