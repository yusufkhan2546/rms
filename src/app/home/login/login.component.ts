import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tab=false;
  loginType= false;
  loginForm1:FormGroup;
  loginForm2:FormGroup;
  userForm:FormGroup
    constructor(private router:Router,
                 private AuthenticationService:AuthenticationService,
                  private fb:FormBuilder) { }

    ngOnInit() {

      this.loginForm1 = this.fb.group({
        email:['',[Validators.required]],
        password:['',[Validators.required]],
        phone:['']
  });
  this.loginForm2 = this.fb.group({
    phone:['',[Validators.required]],
    password:['',[Validators.required]],
    email:['']
  });
  this.userForm = this.fb.group({
    name:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    phone:['',Validators.required],
    confirmpassword:['',Validators.required],
    address:this.fb.group({
      addressline1:[''],
      addressline2:[''],
      city:[''],
      state:[''],
      pin:[''],
      name:[''],
      phone:['']
    }),
    openingtime:[''],
    closingtime:[''],
    isOpen:false,
    difficultweather:false,
    startsFrom:'',
    currentOffer:''

  });
    }


  flipCrad(){
    const ele = document.getElementById('card');
   if(ele.classList.contains('flip')){
  ele.classList.remove('flip');

   } else {
    ele.classList.add('flip');
   }
  }

  changeTab(){
  this.tab =!this.tab;
  }

  login(){
    const form = this.loginType?this.loginForm1:this.loginForm2;
    if(form.valid){
      console.log(form.value);

      this.AuthenticationService.login(form.value)
      .pipe(first())
      .subscribe(
          data => {
            setTimeout(() => {
              this.router.navigate([`/tabs/tab1`]);
            }, 100);

          },
          error => {
            console.log(error);

              window.alert('Somethimg went Wrong')
          });
    }
    else {
      window.alert('Data not Core');
    }

  }
  changeMethod(){
    this.loginType = !this.loginType;
    this.loginForm1.reset();
    this.loginForm2.reset();
  }
  back(){

  }

  reset(){
    this.userForm.reset();
  }
  cancel(){
    if(this.userForm.touched){

    }else {
      this.userForm.reset();
      this.router.navigate([`/home`])
    }
  }

  submitUser(){
    if(this.userForm.valid){
      if(this.userForm.get('password').value === this.userForm.get('confirmpassword').value){
        console.log(this.userForm.value);
        this.AuthenticationService.register(this.userForm.value)
        .pipe(first())
        .subscribe(
            data => {
               window.alert('Success');
               this.changeTab();
            },
            error => {
              window.alert('Fail');
            });
      }else {
      window.alert('passwords wrong');
      }

    }else {
      window.alert('Invalid Data');
    }
  }

  ionViewWillEnter(){
    if(this.router.url === '/home/signup'){
    this.changeTab();
    } else{
     if(this.tab){
       this.changeTab();
     }

    }
  }
}
