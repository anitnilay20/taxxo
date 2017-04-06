import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../signup/signup.service';
import { User } from '../dashboard/model';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'signin',
	templateUrl: 'signin.component.html',
	providers: [UserService]
})
export class SigninComponent {
	users: User;
	error: any;
	public loginForm = this.fb.group({
		email: ["", Validators.required],
		password: ["", Validators.required],
	});

	onsubmit() {
		this.signin();
	}

	signin() {
		let formObj = this.loginForm.getRawValue();
		let data = JSON.stringify(formObj);
		this.userService.login(data)
			.subscribe(
			User => {
				this.users = User;
				this.snackbar.open("Login Complete", 'X', {
					duration: 3000
				});
				console.log(User.id);
				localStorage.setItem('user', String(User.id));
				this.router.navigate(['dashboard']);
			},
			Error => {
				console.log(Error);
				this.error = Error;
			}
			)
	}

	constructor(public fb: FormBuilder, private userService: UserService, public snackbar: MdSnackBar, private router: Router) { }
}
