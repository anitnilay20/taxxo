import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router,Event as RouterEvent,NavigationStart,NavigationEnd,NavigationCancel,NavigationError} from '@angular/router'

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  loading:boolean = true;
  
  ngOnInit() { 
    this.titleService.setTitle("Your Dashboard"); 
  };
  public constructor(private titleService: Title, private router: Router ) { 
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
   }

   navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
   }
}