import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '@angular/material'
import { CompanyComponent } from './company/company.component'
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LedgersComponent } from './ledgers/ledgers.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { UserService } from '../signup/signup.service';
import { Userdetailcomponent } from './user-detail/user-detail.component';
import { Reportcomponent } from './report/report.component';
import { JournalComponent } from "./vouchers/journal/journal.component";


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    CompanyComponent,
    LedgersComponent,
    VouchersComponent,
    DashboardhomeComponent,
    Userdetailcomponent,
    Reportcomponent,
    JournalComponent
  ],
  providers: [
    Title
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }