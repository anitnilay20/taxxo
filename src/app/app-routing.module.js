"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var signup_component_1 = require('./signup/signup.component');
var home_component_1 = require('./home/home.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var company_component_1 = require('./dashboard/company/company.component');
var ledgers_component_1 = require('./dashboard/ledgers/ledgers.component');
var vouchers_component_1 = require('./dashboard/vouchers/vouchers.component');
var appRoutes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'company', component: company_component_1.CompanyComponent },
            { path: 'ledgers', component: ledgers_component_1.LedgersComponent },
            { path: 'vouchers', component: vouchers_component_1.VouchersComponent }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map