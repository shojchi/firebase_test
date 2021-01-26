import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CustomerDetailsComponent} from './customer-details/customer-details.component';
import {CustomersHostComponent} from './customers-host/customers-host.component';
import {CustomersListComponent} from './customers-list/customers-list.component';
import {LoginRegisterComponent} from './login-register/login-register.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from './shared/auth.service';


import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailsComponent,
    CustomersHostComponent,
    CustomersListComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
