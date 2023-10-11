import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { services } from '../services/services';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userRegistrationForm: any={};
  emailValidation: boolean = true;
  PasswordValidation: boolean = true;
  email: any='';
  password: any='';
  userName=''
  constructor(private fb: FormBuilder,private services:services,private router:Router,private afAuth:AngularFireAuth) {
    
   }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({

      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      userName: ["", Validators.compose([Validators.required])]
    });
  }
  login()
  {
    console.log(this.email)
    this.afAuth.signInWithEmailAndPassword(this.email,this.password).then((user:any)=>{

    })
this.services.userLogin({emailId:this.email,password:this.password}).subscribe((res:any)=>{

  this.services.setCurrUser(res,{})
this.router.navigate(["/dashboard"])
})
  }
  signup()
  {
    this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then((user:any)=>{
      console.log(user)
      this.services.addUser({_id:user.user.uid,emailId:this.email,password:this.password,userName:this.userName,timestamps:Date.now()})
      .subscribe((res:any)=>{
        console.log(res)
        
  this.services.setCurrUser(res,{})
  
this.router.navigate(["/dashboard"])
      })
    })
  }
}
