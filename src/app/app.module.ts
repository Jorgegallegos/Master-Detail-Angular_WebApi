import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ContentComponent } from './common/content/content.component';
import { LoginComponent } from './oauth/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { MasterDetailComponent } from './masterdetail/master-detail/master-detail.component';
import { MasterDetailService } from './services/master-detail.service';
import { OauthGuard } from './guards/oauth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    LoginComponent,
    MasterDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule   ,
    HttpClientModule   
  ],
  providers: [AccountService,MasterDetailService,OauthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
