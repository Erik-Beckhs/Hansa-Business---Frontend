import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ContentInfoComponent } from "./content-info/content-info.component";
import { ContentPrincipalComponent } from "./content-principal.component";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { QuotationComponent } from "./quotation/quotation.component";
import { RespuestasComponent } from "./respuestas/respuestas.component";

const principal_routes:Routes=[
    {path:'cot-principal', canActivate:[AuthGuard], component:ContentPrincipalComponent,
    children:[
      {path:'', component:CotizacionesComponent},
      {path:'content-info/:id', component:ContentInfoComponent,
      children:[
        {path:'', component:InformacionComponent},
        {path:'quotation', component:QuotationComponent},
        {path:'respuestas', component:RespuestasComponent},
    ]
    },
    ]
  },
]

export const PrincipalRoutes = RouterModule.forChild(principal_routes)