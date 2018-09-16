import { SaleDetailsViewModel } from "./sale-details-view-model";


export class MasterDetailViewModel {

         Id:number= 0;
         Customer:string ="";
         Date : string="";
         Total : number;
         SaleDetails:SaleDetailsViewModel[] = [];
}
