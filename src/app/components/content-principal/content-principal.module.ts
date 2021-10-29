import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/components/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { PipesModule } from "src/app/pipes/pipes.modules";
import { ContentInfoComponent } from "./content-info/content-info.component";
import { ContentPrincipalComponent } from "./content-principal.component";
import { PrincipalRoutes } from "./content-principal.routes";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { ResponderComponent } from './responder/responder.component';

@NgModule({
    declarations:[
        ContentPrincipalComponent,
        CotizacionesComponent,
        ContentInfoComponent,
        InformacionComponent,
        ResponderComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        PrincipalRoutes,
        PipesModule
    ],
    exports:[
        ContentPrincipalComponent,
        CotizacionesComponent,
        ContentInfoComponent,
        InformacionComponent
    ]
})

export class ContentPrincipalModule {}