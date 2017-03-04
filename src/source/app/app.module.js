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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var primeng_1 = require('primeng/primeng');
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var router_1 = require('@angular/router');
var signup_component_1 = require('./signup/signup.component');
var app_routing_module_1 = require('./app-routing.module');
var home_component_1 = require('./home/home.component');
var dashboard_module_1 = require('./dashboard/dashboard.module');
var material_1 = require('@angular/material');
var http_1 = require('@angular/http');
var company_service_1 = require('./dashboard/company/company.service');
require('hammerjs');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                primeng_1.RadioButtonModule,
                forms_1.ReactiveFormsModule,
                forms_2.FormsModule,
                primeng_1.InputTextModule,
                app_routing_module_1.AppRoutingModule,
                primeng_1.MessagesModule,
                dashboard_module_1.DashboardModule,
                material_1.MaterialModule,
                router_1.RouterModule,
                http_1.HttpModule,
                http_1.JsonpModule
            ],
            declarations: [
                app_component_1.AppComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [company_service_1.CompanyService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map