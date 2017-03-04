import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {MessagesModule} from 'primeng/primeng';

@Component({
  selector: 'signup',
  templateUrl: './Signup.component.html',
})

export class SignupComponent  implements OnInit{
  Title = 'Taxxo || Your Solutions For Common ERP';
  name: string;
  email: string;
  phone: string;
  msgs:any = [];
  private sub: any;
  constructor(private router: Router,private route: ActivatedRoute, public fb:FormBuilder) {}

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
    phone: ["", Validators.required],
    password1: ["", Validators.required],
    password2: ["", Validators.required]
  });

  showError(message :string) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:message});
    }
  onsubmit(){
    var password1 = this.signupform.value.password1;
    var password2 = this.signupform.value.password2;

    if(!password1 || !password2)
    {
      this.showError("Passwords cant be empty");
      return;
    }
    if(password1 != password2){
      this.showError("Passwords Mismatch!!");
      return;
    }
    if(password1.toString().length < 6)
    {
      this.showError("Password too short(minimum length 6)");
      return;
    }
    this.router.navigate(['/']);
  }
}