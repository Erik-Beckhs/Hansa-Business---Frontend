import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
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
        MaterialModule
    ]
}) 

export class SharedModule {}