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
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var ledgers_service_1 = require('../ledgers/ledgers.service');
var VouchersComponent = (function () {
    function VouchersComponent(titleService, LedgersService, snackbar, fb) {
        this.titleService = titleService;
        this.LedgersService = LedgersService;
        this.snackbar = snackbar;
        this.fb = fb;
    }
    VouchersComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Your Dashboard || Vouchers");
        this.getLedgers();
    };
    VouchersComponent.prototype.changeFirstAc = function (event) {
        this.firstAc = event['value'];
    };
    VouchersComponent.prototype.changeSecondAc = function (event) {
        this.secondAc = event['value'];
    };
    VouchersComponent.prototype.getLedgers = function () {
        var _this = this;
        this.LedgersService.getLedgers()
            .subscribe(function (ledgers) { _this.ledgers = ledgers; console.log(_this.ledgers); }, function (error) { console.log(error); });
    };
    VouchersComponent = __decorate([
        core_1.Component({
            selector: 'vouchers',
            templateUrl: 'app/dashboard/vouchers/vouchers.component.html',
            providers: [ledgers_service_1.LedgersService]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, ledgers_service_1.LedgersService, material_1.MdSnackBar, forms_1.FormBuilder])
    ], VouchersComponent);
    return VouchersComponent;
}());
exports.VouchersComponent = VouchersComponent;
//# sourceMappingURL=vouchers.component.js.map