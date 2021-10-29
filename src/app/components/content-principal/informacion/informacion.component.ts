import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { TermsConditionsService } from 'src/app/services/others/terms-conditions.service';
import { QuotationService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  intencion:boolean=true
  idQuot!:any
  quotation:QuotationInterface = {
    name:''
  }
  termsConditions:any

  constructor(
    private _terms:TermsConditionsService,
    private route:ActivatedRoute,
    private _quotation:QuotationService,
    private router:Router
    ) { 
    
    //obtenemos el parametro id de la ruta
    this.route.paramMap.subscribe(params=>{
      if(params.has("id")){
        this.idQuot=params.get("id")
        //console.log(this.idQuot)
        //seteamos el id de cotizacion
        this._quotation.setIdQuot(this.idQuot)
      }
      else{
        console.log("No existe el parametro id")
      }
    })
  }
    
  ngOnInit(): void {
    this.getConditions(this.idQuot)
    this.getQuotation(this.idQuot)
  }

  //listado de terminos y condiciones
  getConditions(iq:any){
    this._terms.getTermsAndConditionsByIdQuotation(iq).subscribe(
      res=>{
        this.termsConditions=res
        for(let i=0;i<this.termsConditions.length;i++){
          this.termsConditions[i].doc=this.dataURLtoFile(this.termsConditions[i].document, this.termsConditions[i].name)
        }
        console.log(this.termsConditions[0])
        //console.log(this.dataURLtoFile(this.termsConditions[0].document, 'Nuevo archivo'))
      }
    )
  }

  getQuotation(iq:any)
  {
    this._quotation.getQuotationById(iq).subscribe(res=>{
      this.quotation = res
      //console.log(this.quotation)
    })
  }

  dataURLtoFile(dataurl:any, filename:string) {
 
    let arr:any = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  send(formInfo:any){
    console.log(formInfo)
    //swal("HANSA Business", "¿Desea ingresar sus respuestas ahora?", "info")
    // swal("Are you sure?", {
    //   dangerMode: true,
    //   buttons: true,
    // });
    swal({
      title:'HANSA Business',
      text:'¿Desea ingresar sus respuestas ahora?',
      icon:'info',
      buttons:['Si','Más tarde'],
      dangerMode:true,
    }).then((res)=>{
      if(!res){
        //console.log('SI')
        this.router.navigate([`cot-principal/content-info/${this.idQuot}/responder`])
      }
      else{
        this.router.navigate(['cot-principal'])
        //console.log('Mas tarde')
      }
    })
  }
}
