import { Component, OnInit } from '@angular/core';
import { MasterDetailService } from '../../services/master-detail.service';
import { Router } from '@angular/router/';
import { AccountService } from '../../services/account.service';
import { MasterDetailViewModel } from '../../models/master-detail-view-model';
import { SaleDetailsViewModel } from '../../models/sale-details-view-model';
import { User } from '../../models/user';
import * as $ from 'jquery';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  private _userName:string="";
  private _date = new Date().toISOString().slice(0,10);
  private _saleMaster:MasterDetailViewModel[] = [];
  private _masterDetail={};
  private _saleDetail={};
  private _arraySaleDetails = [];
  private _enableBtn : boolean = false;

  constructor(private _masterDetailService:MasterDetailService,
  private _accountService:AccountService,private _router:Router) { }

  ngOnInit() {
    this._userName=this._accountService.getCurrentSession().userName;
    this.getAll();
    this.onEnableBtnDelete();
  }

  getAll(){
    this._masterDetailService.getAll().subscribe(
      data =>
      {
        this._saleMaster = data;
      },
      error => {
        console.log("An error ocurred");
      });
  }

  onDelete(event){ 
    var element = event.currentTarget;
    var deleted = $(element).closest("tr").remove();
    var removed = $(deleted).children()[0].innerText;
    removed = parseInt(removed);

    var index = this._arraySaleDetails.map((obj) => obj.Id ).indexOf(removed);

    this._arraySaleDetails.splice(index,1);
    this.onEnableBtnDelete();
   
  }

  onSubmit(item){
    if(item){
        let detail={
          Id : this._arraySaleDetails.length + 1,
          Units : item.Units,
          Article : item.Article,
          AmountUnit : item.AmountUnit,
          AmountTotal : parseFloat(item.Units) * parseFloat(item.AmountUnit)
      }
      this._arraySaleDetails.push(detail);
      this.onEnableBtnDelete();
    }
  }

  onSave(){
    this._masterDetail = {
      Customer:this._accountService.getCurrentSession().userName,
      Date:this._date,
      Total: this.calculateTotal(this._arraySaleDetails),
      SaleDetails : this._arraySaleDetails,
    }

    this._masterDetailService.postMasterDetail(this._masterDetail)
    .subscribe(
      data => {
        this._saleMaster.push(data);
        //Materialize.toast("successfully", 6000)
        this._masterDetail={};
        this._arraySaleDetails = [];
        this.resetForm();
      },
      error => {
        console.log("An error ocurred");
      })
  }

  onEnableBtnDelete(){
    if(this._arraySaleDetails.length)
    {
      this._enableBtn=true;
    }else{
      this._enableBtn=false;
    }
  }

  calculateTotal(array){
    if(array){
      var total = 0;
      array.forEach(element => {
        total += parseFloat(element.AmountTotal);
      });
      return total;
    }
  }

  resetForm(){
    $("input[name=Units]").val("");
    $("input[name=Article]").val("");
    $("input[name=AmountUnit]").val("");
  }


  doLogOut(){
    this._masterDetailService.doLogOut();
    this._router.navigate(['/login']);
  }
}
