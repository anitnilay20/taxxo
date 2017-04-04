import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/primeng';
import { User } from '../dashboard/model';
import { UserService } from './signup.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  providers: [UserService]
})

export class SignupComponent implements OnInit {
  Title = 'Taxxo || Your Solutions For Common ERP';
  name: string;
  email: string;
  phone: string;
  msgs: any = [];
  users: User;
  private sub: any;
  constructor(private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private userService: UserService, public snackbar: MdSnackBar) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((Params: Params) => {
      this.name = Params['name'];
      this.email = Params['email'];
      this.phone = Params['phone'];
    });
  }

  public signupform = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    number: ["", Validators.required],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    username: ["", Validators.required]
  });

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }
  onsubmit() {
    var password = this.signupform.value.password;
    var password2 = this.signupform.value.password2;

    if (!password || !password2) {
      this.showError("Passwords cant be empty");
      return;
    }
    if (password != password2) {
      this.showError("Passwords Mismatch!!");
      return;
    }
    if (password.toString().length < 6) {
      this.showError("Password too short (minimum length 6)");
      return;
    }

    delete this.signupform.value.password2;
    this.signup();
  }

  signup() {
    let formobj = this.signupform.getRawValue();
    formobj['is_superuser'] = false;
    let data = JSON.stringify(formobj);
    this.userService.addUser(data)
      .subscribe(
      User => {
        this.users = User;
        this.signupform.reset;
        this.snackbar.open("Registration Complete", 'X');
        localStorage.setItem('user', String(User.id))
        this.router.navigate(['dashboard']);
      },
      Error => {
        let error = Error.replace(/["{}\[\]]/g, '');
        error = error.replace(/[\:]/g, ' ');
        error = error.replace(/400 - Bad Request username/i, ' ')
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: error });
      }
      );
  }

  redirect() {
    this.router.navigate(['dashboard']);
  }
}
