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
var company_service_1 = require('./company.service');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var CompanyComponent = (function () {
    function CompanyComponent(titleService, companyService, snackbar, fb) {
        this.titleService = titleService;
        this.companyService = companyService;
        this.snackbar = snackbar;
        this.fb = fb;
        this.mode = 'Observable';
        this.show_amounts_in_millions = false;
        this.accounts_with_inventory = false;
        this.addCompanyForm = this.fb.group({
            financial_year_from: ["", forms_1.Validators.required],
            books_beginning_from: ["", forms_1.Validators.required],
            address: ["", forms_1.Validators.required],
            country: ["", forms_1.Validators.required],
            city: ["", forms_1.Validators.required],
            state: ["", forms_1.Validators.required],
            pin_code: ["", forms_1.Validators.required],
            currency_symbols: ["", forms_1.Validators.required],
            accounts_with_inventory: ["", forms_1.Validators.required],
            show_amounts_in_millions: ["", forms_1.Validators.required],
            name: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required],
            telephone_number: ["", forms_1.Validators.required],
            alias_name: ["", forms_1.Validators.required]
        });
    }
    CompanyComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Your Dashboard || Comapny");
        this.getCompany();
    };
    ;
    CompanyComponent.prototype.selectCompany = function (id, name) {
        localStorage.setItem("company", id);
        this.snackbar.open("Using Company " + name, "X", {
            duration: 5000,
        });
    };
    CompanyComponent.prototype.getCompany = function () {
        var _this = this;
        this.companyService.getCompany()
            .subscribe(function (companies) { _this.companies = companies; console.log(_this.companies); }, function (error) { console.log(error); });
    };
    CompanyComponent.prototype.addCompany = function () {
        var _this = this;
        var formobj = this.addCompanyForm.getRawValue();
        formobj['admin'] = 4;
        formobj['accounts_with_inventory'] = this.accounts_with_inventory;
        formobj['show_amounts_in_millions'] = this.show_amounts_in_millions;
        var data = JSON.stringify(formobj);
        this.companyService.addCompany(data)
            .subscribe(function (Company) {
            _this.companies.push(Company);
            console.log(_this.companies);
            _this.addCompanyForm.reset();
            _this.snackbar.open("Company Added", "X");
        }, function (error) { return _this.errorMessage = error; });
    };
    CompanyComponent.prototype.change_accounts_with_inventory = function () {
        if (this.accounts_with_inventory === false) {
            this.accounts_with_inventory = true;
        }
        else {
            this.show_amounts_in_millions = false;
        }
    };
    CompanyComponent.prototype.change_show_amounts_in_millions = function () {
        if (this.show_amounts_in_millions === false) {
            this.show_amounts_in_millions = true;
        }
        else {
            this.show_amounts_in_millions = false;
        }
    };
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'company',
            templateUrl: 'app/dashboard/company/company.component.html',
            providers: [company_service_1.CompanyService]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.Title, company_service_1.CompanyService, material_1.MdSnackBar, forms_1.FormBuilder])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map