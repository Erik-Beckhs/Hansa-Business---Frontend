import { Component, OnInit, ViewChild } from '@angular/core';
//import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort' ;
import { map } from 'rxjs/operators';
import { AuthService, ApplicantService, QuotationService, SuppliersService, ContactsService } from 'src/app/services/service.index';
import { ContactInterface, QuotationInterface, SupplierInterface } from 'src/app/models/interface.index';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})

export class CotizacionesComponent implements OnInit {
  dataSource:any
  answers:any
  quotation!:QuotationInterface
  quotations:any[]=[]
  array:quote = {
    pos:0
  }
  arrayList:quote[]=[]

  private user!:any
  contact:any

  public supplier:any=[{
    name:"",
    type:"",
    businessArea:"",
    country:"",
    image:"",
    idContact:""
  }]
  
  applicant:any

  displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money', 'tipocot', 'fechaini', 'fechafin'];
  //displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private quotationService:QuotationService,
    private authService:AuthService,
    private supplierService:SuppliersService,
    private applicantService:ApplicantService,
    private contactService:ContactsService
    ) { 
     
  }

  ngOnInit(){
    this.contact=this.contactService.getCurrentContact()
    this.supplierService.getQuotationsByIdSupplier(this.contact.suppliers.id)
    .subscribe(
      (res:any)=>{
        this.answers=res[0].answers
        console.log(this.answers)
        for(let i=0;i<this.answers.length;i++){
          this.quotationService.getQuotationById(this.answers[i].idQuotation)
          .subscribe(res=>{
            this.quotation=res
            this.quotations.push(res)

            this.applicantService.getApplicantById(this.quotation.idApplicant)
            .subscribe(res=>{
              this.applicant = res

              this.array={
                pos:i+1,
                id:this.answers[i].idQuotation,
                name:this.quotations[i].name,
                state:this.answers[i].state,
                applicant:this.applicant.name+' '+this.applicant.last_name,
                money:this.quotations[i].money,
                type:this.quotations[i].typeReq,
                start:this.quotations[i].start,
                end:this.quotations[i].end
              }

              this.arrayList.push(this.array)
              if(i+1==this.answers.length){
                this.dataSource=new MatTableDataSource(this.arrayList),
                //this.dataSource.setData(this.arrayList)
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                console.log(this.arrayList)
              }
            })
            //console.log(this.arrayList)
          })
        }
        
      }
    ) 

    this.dataSource = new MatTableDataSource(this.arrayList)
    //this.getContact(this.user.id)
  }

  ngAfterViewInit() {
    //this.dataSource.setData(this.array)
  }

  getState(n:any){
    let stateValue:string=''
    //case no funciona
    if(n==1){
      stateValue='Invitado'
    }
    else if(n==2){
      stateValue='Respondido'
    }
    else if(n==3){
      stateValue='Ganada la cotización'
    }
    else if(n==4){
      stateValue='Rechazado'
    }
    else if(n==5){
      stateValue='Concluyó la cotización'
    }
    return stateValue
  }

  buildArray(answers:any, quotations:any){

  }

  styleState(value:any){
    return {
      'text-success':value==1 || value==3,
      'text-info':value==2,
      'text-danger':value==4,
      'text-warning':value==5,
    }
  }

  //convertir en pipe
  getTipoSolicitud(value:number){
    let tipoSolicitud:string=''
    if(value==1){
      tipoSolicitud='Solicitud de Propuesta'
    }
    else if(value==2){
      tipoSolicitud='Solicitud de Costos'
    }
    else if(value==3){
      tipoSolicitud='Solicitud de Información'
    }
    else if(value==4){
      tipoSolicitud='Subasta'
    }
    return tipoSolicitud
  }

}

// export interface quotes {
//   position:number,
//   applicant:string,
//   state:number
// }

// const lista_cotizacion: Cotizacion[] = [
//   {position: 1, name: 'Hydrogen', state: 1.0079, symbol: 'H', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 2, name: 'Helium', state: 4.0026, symbol: 'He', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 3, name: 'Lithium', state: 6.941, symbol: 'Li', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 4, name: 'Beryllium', state: 9.0122, symbol: 'Be', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 5, name: 'Boron', state: 10.811, symbol: 'B', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 6, name: 'Carbon', state: 12.0107, symbol: 'C', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 7, name: 'Nitrogen', state: 14.0067, symbol: 'N', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 8, name: 'Oxygen', state: 15.9994, symbol: 'O', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 9, name: 'Fluorine', state: 18.9984, symbol: 'F', moneda:0, tipocot:'', fechaini:'', fechafin:''},
//   {position: 10, name: 'Neon', state: 20.1797, symbol: 'Ne', moneda:0, tipocot:'', fechaini:'', fechafin:''},
// ];

export interface quote {
  pos?:number,
  id?:string,
  name?:string,
  state?:string,
  applicant?:string,
  money?:string,
  type?:string,
  start?:string,
  end?:string
}