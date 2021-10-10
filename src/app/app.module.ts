import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

import { LoginService } from './services/login.service';

import { PrincipalComponent } from './pages/principal/principal.component';
import { RankingComponent } from './pages/principal/ranking/ranking.component';
//import { ProfileComponent } from './pages/principal/profile/profile.component';
//import { PaysComponent } from './pages/principal/pays/pays.component';
import { SupplierComponent } from './pages/principal/supplier/supplier.component';
import { QuoteComponent } from './pages/principal/quote/quote.component';
import { RetrieveComponent } from './pages/retrieve/retrieve.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
//import { HeaderComponent } from './shared/header/header.component';
import { LogoutUserComponent } from './pages/dialogs/logout-user/logout-user.component';
import { MainComponent } from './pages/principal/main/main.component';
import { CotizacionesComponent } from './pages/content-principal/cotizaciones/cotizaciones.component';
import { ContentPrincipalComponent } from './pages/content-principal/content-principal.component';
import { EditProveedorComponent } from './pages/dialogs/edit-proveedor/edit-proveedor.component';
import { PasswordComponent } from './pages/principal/password/password.component';
import { InformacionComponent } from './pages/content-principal/informacion/informacion.component';
import { RespuestasComponent } from './pages/content-principal/respuestas/respuestas.component';
import { ContentInfoComponent } from './pages/content-principal/content-info/content-info.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { Page404Component } from './shared/page404/page404.component';
//import { SharedModule } from './shared/shared.module';
import { SharedComponent } from './shared/shared.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
//import { PagesComponent } from './pages/pages.component';
//import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    PrincipalComponent,
    RankingComponent,
    //ProfileComponent,
    //PaysComponent,
    SupplierComponent,
    QuoteComponent,
    RetrieveComponent,
    ContactsComponent,
    //HeaderComponent,
    LogoutUserComponent,
    MainComponent,
    CotizacionesComponent,
    ContentPrincipalComponent,
    EditProveedorComponent,
    PasswordComponent,
    InformacionComponent,
    RespuestasComponent,
    ContentInfoComponent,
    Page404Component,
    SharedComponent
    //PagesComponent,
    //SidebarComponent
  ],
  entryComponents:[ContactsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //RouterModule.forRoot(routes),
    BrowserAnimationsModule, 
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    //SharedModule,
    PagesModule,
    SharedModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
