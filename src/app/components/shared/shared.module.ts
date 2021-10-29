import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/material/material.module";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations:[
       HeaderComponent,
       SidebarComponent
    ],
    exports:[
       HeaderComponent,
       SidebarComponent
    ],
    imports:[
        MaterialModule,
        RouterModule
    ]
}) 

export class SharedModule {}