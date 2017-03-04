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
var dashboard_component_1 = require('./dashboard.component');
var material_1 = require('@angular/material');
var company_component_1 = require('./company/company.component');
var router_1 = require('@angular/router');
var primeng_1 = require('primeng/primeng');
var forms_1 = require('@angular/forms');
var ledgers_component_1 = require('./ledgers/ledgers.component');
var vouchers_component_1 = require('./vouchers/vouchers.component');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                material_1.MaterialModule,
                router_1.RouterModule,
                primeng_1.CalendarModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                company_component_1.CompanyComponent,
                ledgers_component_1.LedgersComponent,
                vouchers_component_1.VouchersComponent
            ],
            providers: [
                platform_browser_1.Title
            ],
            bootstrap: [dashboard_component_1.DashboardComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map