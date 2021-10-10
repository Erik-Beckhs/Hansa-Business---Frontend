import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutes } from "./pages.routes";
import { PaysComponent } from "./principal/pays/pays.component";
import { ProfileComponent } from "./principal/profile/profile.component";
import { PrincipalComponent } from "./principal/principal.component";

@NgModule({
    declarations:[
        PagesComponent,
        ProfileComponent, 
        PaysComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        PagesRoutes  
    ],
    exports:[
        PagesComponent,
        ProfileComponent, 
        PaysComponent
    ]
})

export class PagesModule { }