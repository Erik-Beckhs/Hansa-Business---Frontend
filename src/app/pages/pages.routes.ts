import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { PasswordComponent } from "./principal/password/password.component";
import { PaysComponent } from "./principal/pays/pays.component";
import { ProfileComponent } from "./principal/profile/profile.component";
import { RankingComponent } from "./principal/ranking/ranking.component";
import { SupplierComponent } from "./principal/supplier/supplier.component";

const pages_routes:Routes=[
    {path:'pages', component:PagesComponent,
    children:[
    //{path:'', component:ProfileComponent},
        {path:'password', component:PasswordComponent},
        {path:'profile', component:ProfileComponent},
        {path:'ranking', component:RankingComponent},
        {path:'pays', component:PaysComponent},
        {path:'supplier', component:SupplierComponent},
        {path:'**', redirectTo:'', pathMatch:'full'}
    ]},
]

export const PagesRoutes = RouterModule.forChild(pages_routes)