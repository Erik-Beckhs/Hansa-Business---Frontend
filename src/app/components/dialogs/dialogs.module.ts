import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material/material.module";
import { PipesModule } from "src/app/pipes/pipes.modules";
import { SharedModule } from "../shared/shared.module";
import { TermsConditionsHansaComponent } from "./terms-conditions-hansa/terms-conditions-hansa.component";
import { ProductComponent } from './product/product.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    declarations:[
       TermsConditionsHansaComponent,
       ProductComponent,
       ConfirmPasswordComponent,
       ChangePasswordComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        //PagesRoutes,
        PipesModule
    ],
    exports:[
        TermsConditionsHansaComponent
    ]
})

export class DialogsModule { }