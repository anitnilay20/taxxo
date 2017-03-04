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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
        this.companyUrl = 'http://52.38.48.68/company/';
    }
    CompanyService.prototype.getCompany = function () {
        return this.http.get(this.companyUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CompanyService.prototype.addCompany = function (data) {
        console.log(data);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var option = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.companyUrl, data, option)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CompanyService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map