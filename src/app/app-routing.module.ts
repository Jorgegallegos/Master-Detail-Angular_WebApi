import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './oauth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MasterDetailComponent } from './masterdetail/master-detail/master-detail.component';
import { OauthGuard } from './guards/oauth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const ROUTES: Routes =
 [
  {path:'login',component:LoginComponent},
  {path:'master-detail',component:MasterDetailComponent ,canActivate:[OauthGuard]},
  {path:'',redirectTo:'master-detail',pathMatch:'full'},
  {path:'***',redirectTo:'master-detail',pathMatch:'full'},
  {path:'**',component : PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
