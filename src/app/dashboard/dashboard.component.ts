import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  ngOnInit() {
    this.titleService.setTitle("Your Dashboard");
  };
  public constructor(private titleService: Title, private router: Router) { }
}