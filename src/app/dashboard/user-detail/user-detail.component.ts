import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../../signup/signup.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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

	constructor(public userService: UserService, private slimLoadingBarService: SlimLoadingBarService) {
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