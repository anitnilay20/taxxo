import { Component, OnInit } from '@angular/core';
import { User } from '../model';
import { UserService } from '../../signup/signup.service';

@Component({
	selector: 'user-detail',
	templateUrl: 'user-detail.component.html',
	providers: []
})

export class Userdetailcomponent implements OnInit{
	user: User;

	constructor(public userService: UserService) {
	}

	ngOnInit(){
		this.userService.user$.subscribe(
			User => {
				this.user = User;
			});
	}
}