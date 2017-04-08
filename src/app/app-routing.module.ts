import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './dashboard/company/company.component';
import { LedgersComponent } from './dashboard/ledgers/ledgers.component';
import { VouchersComponent } from './dashboard/vouchers/vouchers.component';
import { DashboardhomeComponent } from './dashboard/dashboardhome/dashboardhome.component'
import { SigninComponent } from './signin/signin.component';
import { DashboardAuth } from './dashboard/dashboardhome/dashboard-auth.service'

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuth],
    children: [
      { path: 'company', component: CompanyComponent },
      { path: 'ledgers', component: LedgersComponent },
      { path: 'vouchers', component: VouchersComponent },
      { path: 'home', component: DashboardhomeComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DashboardAuth
  ]
})
export class AppRoutingModule { }