import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Itoken } from '../interfaces/itoken';
import { Token } from '@angular/compiler';

@Injectable()
export class AccountService {

  private loginurl : string =  environment.apiUrl + 'token';
  private user : User;

  constructor(private _http : HttpClient ) { }

  public doLogin(email:string,password:string) : Observable<any> {
    //subscribe
    let body = new URLSearchParams();
    body.set("grant_type","password");
    body.set("username",email);
    body.set("password",password);
    body.set("client_id","web");

    let options = {
      headers : new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    };

    return this._http.post(this.loginurl,body.toString(),options)
    .do(data=>{
      localStorage.setItem("token",JSON.stringify(data));
    })
    .catch(this.handleError);
  }
  
  public doLogOut(){
    localStorage.removeItem("token");
  }

  public getToken():string{
    var currentSession = this.getCurrentSession();
    if(currentSession != null) {
      return currentSession.access_token;
    }
    else return null;
  }

  public getCurrentSession() : Itoken {
    var token = localStorage.getItem('token');
    if (token == undefined) return null;

    var getToken = JSON.parse(token);
    return getToken;
  }

  handleError(ex:HttpErrorResponse){
    return Observable.throw(ex.error.error_description);
  }
}
