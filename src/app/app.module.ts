import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RadioButtonModule, InputTextModule, MessagesModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardModule } from './dashboard/dashboard.module'
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { CompanyService } from './dashboard/company/company.service'
import { SigninComponent } from './signin/signin.component';
import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CovalentCoreModule } from '@covalent/core';

import 'hammerjs'

@NgModule({
  imports: [
    BrowserModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    AppRoutingModule,
    MessagesModule,
    DashboardModule,
    MaterialModule,
    RouterModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    CovalentCoreModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    SigninComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    CompanyService,
  ]
})
export class AppModule { }
