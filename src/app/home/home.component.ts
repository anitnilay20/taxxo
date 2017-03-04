import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'

export class User{
    id: number;
    name: string;
    email: string;
    number: number;
}

@Component({
  selector: 'Home',
  templateUrl: 'home.component.html'
})

export class HomeComponent  {
  Title = 'Taxxo || Your Solutions For Common ERP';
  public signupform = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required]
  });
  
  constructor(public fb: FormBuilder) {}
  redirect_to_signup(event:any){
    var name = this.signupform.value.name;
    var email = this.signupform.value.email;
    var phone = this.signupform.value.phone;
    window.location.href = '/signup?name='+name+'&email='+email+'&phone='+phone;
  }
 }