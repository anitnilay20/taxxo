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
var company_service_1 = require('../company/company.service');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var ledgers_service_1 = require('./ledgers.service');
var LedgersComponent = (function () {
    function LedgersComponent(titleService, LedgersService, snackbar, fb) {
        this.titleService = titleService;
        this.LedgersService = LedgersService;
        this.snackbar = snackbar;
        this.fb = fb;
        this.addLedgerForm = this.fb.group({
            name: ["", forms_1.Validators.required],
            groups: ["", forms_1.Validators.required],
            opening_balance: ["", forms_1.Validators.required],
            inventory: ["", forms_1.Validators.required],
        });
        this.accounts = ["bank OCC AC",
            "bank OD AC",
            "branch Division",
            "capital AC",
            "cash in   hand",
            "current assets",
            "current liabilities",
            "deposits assets",
            "direct expenses",
            "direct income",
            "duties n taxes",
            "expenses direct",
            "expenses indirect",
            "fixed assets",
            "income direct",
            "income indirect",
            "indirect expenses",
            "indirect income",
            "investments",
            "loans n advances assets",
            "loan liability",
            "misc exoenses",
            "provisions",
            "purchase AC",
            "reserve n surpulus",
            "retaines earnings",
            "sales accounts",
            "secured loans",
            "stock in hand",
            "sundry creditors",
            "sundry debitors",
            "suspense Account",
            "unsecured loans",];
    }
    LedgersComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Your Dashboard || Ledgers");
        this.getLedgers();
    };
    LedgersComponent.prototype.getLedgers = function () {
        var _this = this;
        this.LedgersService.getLedgers()
            .subscribe(function (ledgers) { _this.ledgers = ledgers; console.log(_this.ledgers); }, function (error) { console.log(error); });
    };
    LedgersComponent.prototype.addLedger = function () {
        var _this = this;
        var formobj = this.addLedgerForm.getRawValue();
        formobj['company'] = localStorage.getItem('company');
        formobj['inventory'] = this.inventory;
        formobj['type'] = 'Accounts';
        formobj['groups'] = this.groups;
        var data = JSON.stringify(formobj);
        this.LedgersService.addLedgers(data)
            .subscribe(function (Ledger) {
            _this.ledgers.push(Ledger);
            console.log(_this.ledgers);
            _this.addLedgerForm.reset();
            _this.snackbar.open("Ledger Added", "X");
        }, function (error) { return _this.error = error; });
    };
    LedgersComponent.prototype.change_inventory = function () {
        if (this.inventory === true)
            this.inventory = false;
        else
            this.inventory = true;
    };
    LedgersComponent.prototype.select_accounts = function (value) {
        this.groups = value['value'];
    };
    LedgersComponent = __decorate([
        core_1.Component({
            selector: 'ledgers',
            templateUrl: 'app/dashboard/ledgers/ledgers.component.html',
            providers: [company_service_1.CompanyService, ledgers_service_1.LedgersService]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, ledgers_service_1.LedgersService, material_1.MdSnackBar, forms_1.FormBuilder])
    ], LedgersComponent);
    return LedgersComponent;
}());
exports.LedgersComponent = LedgersComponent;
//# sourceMappingURL=ledgers.component.js.map