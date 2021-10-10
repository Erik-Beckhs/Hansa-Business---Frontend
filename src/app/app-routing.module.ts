import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesModule } from './pages/pages.module';

import { PrincipalComponent } from './pages/principal/principal.component';
import { RankingComponent } from './pages/principal/ranking/ranking.component';
//import { ProfileComponent } from './pages/principal/profile/profile.component';
//import { PaysComponent } from './pages/principal/pays/pays.component';
import { SupplierComponent } from './pages/principal/supplier/supplier.component';
//import { QuoteComponent } from './pages/principal/quote/quote.component';
import { RetrieveComponent } from './pages/retrieve/retrieve.component';
//import { MainComponent } from './pages/principal/main/main.component';
import { CotizacionesComponent } from './pages/content-principal/cotizaciones/cotizaciones.component';
import { ContentPrincipalComponent } from './pages/content-principal/content-principal.component';
import { AuthGuard } from './guards/auth.guard';
import { PasswordComponent } from './pages/principal/password/password.component';
import { ContentInfoComponent } from './pages/content-principal/content-info/content-info.component';
import { InformacionComponent } from './pages/content-principal/informacion/informacion.component';
import { RespuestasComponent } from './pages/content-principal/respuestas/respuestas.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { Page404Component } from './shared/page404/page404.component';
//import { PagesComponent } from './pages/pages.component';


const routes: Routes = [  
{path:'', component:LoginComponent,
children:[
  {path:'', component:SigninComponent},
  {path:'register', component:SignupComponent},
]
},
/*{path:'pages', component:PagesComponent,
children:[
  {path:'', component:ProfileComponent},
  {path:'password', component:PasswordComponent},
  {path:'profile', component:ProfileComponent},
  {path:'ranking', component:RankingComponent},
  {path:'pays', component:PaysComponent},
  {path:'supplier', component:SupplierComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
]},*/

{path:'principal', canActivate:[AuthGuard], component:PrincipalComponent, 
children:[
  //{path:'', component:ProfileComponent},
  {path:'password', component:PasswordComponent},
  //{path:'profile', component:ProfileComponent},
  {path:'ranking', component:RankingComponent},
  //{path:'pays', component:PaysComponent},
  {path:'supplier', component:SupplierComponent},
  {path:'**', redirectTo:'', pathMatch:'full'}
]},

{path:'cot-principal', canActivate:[AuthGuard], component:ContentPrincipalComponent,
  children:[
    {path:'', component:CotizacionesComponent},
    {path:'content-info', component:ContentInfoComponent,
    children:[
      {path:'informacion', component:InformacionComponent},
      {path:'respuestas', component:RespuestasComponent},
  ]
  },
  ]
},
{path:'retrieve', component:RetrieveComponent},
{path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
