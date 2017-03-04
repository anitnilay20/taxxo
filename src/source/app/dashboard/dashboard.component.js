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
var router_1 = require('@angular/router');
var DashboardComponent = (function () {
    function DashboardComponent(titleService, router) {
        var _this = this;
        this.titleService = titleService;
        this.router = router;
        this.loading = true;
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Your Dashboard");
    };
    ;
    DashboardComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
        }
        if (event instanceof router_1.NavigationEnd) {
            this.loading = false;
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard/dashboard.component.html',
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map