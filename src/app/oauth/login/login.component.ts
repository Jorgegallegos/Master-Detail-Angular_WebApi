import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { DefaultUrlSerializer } from '@angular/router/src/url_tree';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private user:User;
  private userLogo:String = 'http://localhost:4200/assets/img/UserLogin.svg';
  private errorMessage:string ="";

  constructor(private _accountService:AccountService,private _router:Router) { }

  ngOnInit() {
    //Create a new user object
    this.user = new User(
      {
        email:"", 
        password:""
      });
  }

  public onSubmit(user : User) {
    
    this._accountService.doLogin(this.user.email, this.user.password)
    .subscribe(data=>{/*redirect*/
       this.errorMessage=""; 
       this._router.navigate([("/master-detail")])},
       
    error=>{
      this.errorMessage=error;
    });
  }

}
