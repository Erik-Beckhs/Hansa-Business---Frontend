import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { TermsConditionsService } from 'src/app/services/others/terms-conditions.service';
import { ContactsService, QuotationService } from 'src/app/services/service.index';

//sanitizador
import { DomSanitizer } from '@angular/platform-browser';

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
  answer:any

  constructor(
    private _terms:TermsConditionsService,
    private route:ActivatedRoute,
    private _quotation:QuotationService,
    private router:Router,
    private domSanitizer:DomSanitizer,
    private _contact:ContactsService
    ) { 
    
    //obtenemos el parametro id de la ruta
    this.route.paramMap.subscribe(params=>{
      if(params.has("id")){
        this.idQuot=params.get("id")
        //console.log(this.idQuot)
        //seteamos el id de cotizacion
        this._quotation.idQuot=this.idQuot
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

    this.getAnswer()
    //console.log(this._contact.contact)
  }

  //listado de terminos y condiciones
  getConditions(iq:any){
    this._terms.getTermsAndConditionsByIdQuotation(iq).subscribe(
      res=>{
        this.termsConditions=res
        //console.log(this.termsConditions)

        for(let i=0;i<this.termsConditions.length;i++){

          this.termsConditions[i].documentSanitized=this.domSanitizer.bypassSecurityTrustUrl(this.termsConditions[i].document);
          this.termsConditions[i].doc=this.dataURLtoFile(this.termsConditions[i].document, this.termsConditions[i].name)
        }
        //console.log(this.termsConditions[0].document)
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

  getAnswer(){
    //this.idQuot, this._contact.contact.suppliers.id
    //console.log("ANSWER VERDADERO")
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this._contact.contact.suppliers.id)
    .subscribe(res=>this.answer=res)
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

  // false12(valor:any){
  //   if(valor=='si'){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  // send(formInfo:any){
  //   console.log(formInfo)
  //   swal({
  //     title:'HANSA Business',
  //     text:'¿Desea ingresar sus respuestas ahora?',
  //     icon:'info',
  //     buttons:['Si','Más tarde'],
  //     dangerMode:true,
  //   }).then((res)=>{
  //     if(!res){
  //       //console.log('SI')
  //       this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
  //     }
  //     else{
  //       this.router.navigate(['cot-principal'])
  //       //console.log('Mas tarde')
  //     }
  //   })
  // }

  //metodo que envia la informacion al solicitante (cotizacion aceptada o rechazada y motivos)
  sendFormInformation(form:any){
    let c:number=0;
    for(let terms of this.termsConditions){
      if(!terms.checkSupplier){
        c+=1;
      }
    }
    if(c>0){
      console.log('Rechazado');
      swal({
        title:'HANSA Business',
        text:'Su participación en la cotización será registrada como rechazada.... ¿Está seguro de continuar?',
        icon:'info',
        buttons:['Estoy seguro','Cancelar'],
        dangerMode:true,
      }).then((res)=>{
        if(!res){
          //TODO: guardar informacion de terminos y condiciones rechazados
          console.log(this.termsConditions)
          for(let term of this.termsConditions){
            this.updateTermsAndConditions(term)
          }
          this.answer.state=4
          this.updateAnswer(this.answer)
          
          //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
        }
        // else{
        //   this.router.navigate(['cot-principal'])
        //   //console.log('Mas tarde')
        // }
      })
    }
    else{
      console.log('Aceptado');
      swal({
        title:'HANSA Business',
        text:'¿Desea ingresar sus respuestas ahora?',
        icon:'info',
        buttons:['Si','Más tarde'],
        dangerMode:true,
      }).then((res)=>{
        //cambiar estado a Aceptado
        if(!res){
          //console.log('SI')
          this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
        }
        else{
          //TODO: estado para registrar mas tarde
          this.router.navigate(['cot-principal'])
          //console.log('Mas tarde')
        }
      })
    }


    //console.log(form)
    //console.log(this.termsConditions)
    //TODO: 1. actualizar registros de terms y conditions
    //2. verificar si todo esta en si para que siga adelante
    //caso contrario se marca como rechazada la cotizacion y se envia a lista de cotizaciones
  }

  updateTermsAndConditions(term:any){
    //this._quotation.u
    this._quotation.updateTermsAndConditions(term).subscribe(()=>console.log('Actualización exitosa'))
  }

  updateAnswer(answer:object){
      this._quotation.updateAnswer(answer).subscribe((res:any)=>{
        if(res.state==4){
          swal("HANSA Business", "Se rechazó la cotización", "success").then(()=>{
            this.router.navigate(['cot-principal'])
          })
        }
      })
  }
}
