import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { Console } from '@angular/core/src/console';


@Injectable()
export class MasterDetailService {

  private _user:User;
  private _apiUrl : string =  environment.apiUrl + 'api/masterdetail/';
  
  constructor(private _http:HttpClient,private _accountService:AccountService) { }

  // API: GET /todos
  public getAll(): Observable<any> {
    // will use this.http.get()
    const httpOptions = {
      headers : new HttpHeaders(
        {"Authorization":"bearer " + this._accountService.getToken()}
      )
    };
      
    return this._http.get(this._apiUrl + "Get",httpOptions)
    .do(
      data => {       
        console.log(data);
      })
    .catch(this.handleError);
  }

  postMasterDetail(masterDetail:any):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders(
        {"Authorization":"bearer " + this._accountService.getToken()
      })
    };

    return this._http.post(this._apiUrl + "Post",masterDetail,httpOptions)
    .do(
      data => {
        console.log(data);
      })
    .catch(this.handleError)
  }

  public doLogOut(){
    this._accountService.doLogOut();
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
