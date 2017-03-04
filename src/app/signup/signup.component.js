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
var forms_1 = require('@angular/forms');
var SignupComponent = (function () {
    function SignupComponent(router, route, fb) {
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.Title = 'Taxxo || Your Solutions For Common ERP';
        this.msgs = [];
        this.signupform = this.fb.group({
            name: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required],
            phone: ["", forms_1.Validators.required],
            password1: ["", forms_1.Validators.required],
            password2: ["", forms_1.Validators.required]
        });
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (Params) {
            _this.name = Params['name'];
            _this.email = Params['email'];
            _this.phone = Params['phone'];
        });
    };
    SignupComponent.prototype.showError = function (message) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
    };
    SignupComponent.prototype.onsubmit = function () {
        var password1 = this.signupform.value.password1;
        var password2 = this.signupform.value.password2;
        if (!password1 || !password2) {
            this.showError("Passwords cant be empty");
            return;
        }
        if (password1 != password2) {
            this.showError("Passwords Mismatch!!");
            return;
        }
        if (password1.toString().length < 6) {
            this.showError("Password too short(minimum length 6)");
            return;
        }
        this.router.navigate(['/']);
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: 'app/signup/Signup.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map