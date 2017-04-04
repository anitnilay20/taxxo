import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../signup/signup.service';

@Component({
    selector: 'signin',
    templateUrl: 'signin.component.html',
    providers: [UserService]
})
export class SigninComponent {
    public loginForm = this.fb.group({
        email: ["", Validators.required],
        password: ["", Validators.required],
    });

    constructor(public fb: FormBuilder, private userService: UserService) { }
}
