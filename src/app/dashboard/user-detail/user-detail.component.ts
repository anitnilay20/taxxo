import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../../signup/signup.service';

@Component({
	selector: 'user-detail',
	templateUrl: 'user-detail.component.html',
	providers: []
})

export class Userdetailcomponent implements OnInit {
	user: User;
	progress: string = String((7 / 11) * 100);

	calculateProgress() {
		var count = 0;
		for (var property in this.user) {
			if (this.user[property] != null) {
				count++;
			}
		}
		this.progress = String((count / 11) * 100);
	}

	constructor(public userService: UserService) {
	}

	ngOnInit() {
		this.userService.getuser(localStorage.getItem('user'))
			.subscribe(
			User => {
				this.user = User;
				this.calculateProgress();
			});
	}
}