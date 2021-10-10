import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort' ;
import { QuotationService } from 'src/app/services/quotation.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ContactInterface } from 'src/app/models/contact.interface';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { ApplicantService } from 'src/app/services/applicant.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  private user!:any
  public contact:ContactInterface={
    first_name:'',
    last_name:'',
    email:'',
    phone:'',
    position:''
  }
  public supplier:any=[{
    name:"",
    type:"",
    rubro:"",
    country:"",
    image:"",
    idContact:""
  }]
  quotationRel!:any[]
  //quotationsList:quotList[]=[]
  quotationsList:quotes[]=[]
  //cotizacionesList:QuotationInterface[] = 
  //dataSource = new MatTableDataSource<Cotizacion>(lista_cotizacion);
  dataSource =new MatTableDataSource<any>(this.quotationRel);
  displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money', 'tipocot', 'fechaini', 'fechafin'];
  //displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private quoteService:QuotationService,
    private authService:AuthService,
    private supplierService:SuppliersService,
    private applicantService:ApplicantService
    ) { 
      this.user=authService.getCurrentUser()
      /*this.quotationRel=[
        {
          //id?:string
          name:'Cotizacion 1',
          money:'BOB',
          type:'internacional',
          start:'2021-10-04',
          end:'2021-10-11'
        },
        {
          //id?:string
          name:'Cotizacion 2',
          money:'USD',
          type:'local',
          start:'2021-10-03',
          end:'2021-10-05'
        },{
          //id?:string
          name:'Cotizacion 3',
          money:'EUR',
          type:'internacional',
          start:'2021-10-01',
          end:'2021-10-03'
        }
      ]*/

    //this.showQuotations()
  }

  ngOnInit(){
    this.getContact(this.user.id)
    //this.getApplicant('a_001')
    /*this.quoteService.getIdQuotationsByIdSupplier('_54gjclb7r').then(res=>
      {
        this.quotationRel=res,
        this.dataSource=new MatTableDataSource(this.quotationRel),
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })*/
  }

  ngAfterViewInit() {
    
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

  getContact(id: string) {
    this.authService.getContactByUserId(id).subscribe(con => {
      (
        this.contact = con
        ),
      this.getProveedor()

    });
  }
  getProveedor():void{
    this.supplierService.getSupplierByContactId(this.contact.id).then(
      (supplier: SupplierInterface) => {
        //console.log(supplier),
        this.supplier=supplier,
        this.quoteService.getQuotationsRelByIdSupplier(this.supplier.id).then(res=>
          {
            this.quotationRel=res
            const sizeRel=this.quotationRel.length
            //for(let quote of this.quotationRel){
              for(let i=0;i<sizeRel;i++){
              //console.log(quote.idQuotation)
              this.quoteService.getQuotationById(this.quotationRel[i].idQuotation).pipe(
                map(
                  res=>{
                    this.quotationsList.push(res)
                    this.quotationsList[i].position=i+1
                    this.quotationsList[i].state=this.quotationRel[i].state
                    this.applicantService.getApplicantById(res.idApplicant).pipe(map(
                      result=>this.quotationsList[i].applicant=`${result.name} ${result.last_name}`
                    )).subscribe()
                    /*this.quotationsList.push({
                      //id:res[i].id,
                      name:res[i].name,
                      money:res[i].money,
                      type:res[i].type,
                      start:res[i].start,
                      end:res[i].end,
                      state:this.quotationRel[i].state
                    })*/
                    //console.log(this.quotationsList)
                    if(i+1==sizeRel){
                      //this.quotationRel=res,
                      //console.log(this.quotationsList),
                      //console.log(this.quotationRel),
                      this.dataSource=new MatTableDataSource(this.quotationsList),
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      //console.log(this.quotationsList)
                    }
                  }
                )
              ).subscribe()
            }
            //console.log(this.quotationsList)
          })
      });
  }

  /*getApplicant(value:any){
    return this.applicantService.getApplicantById(value).pipe(map(
      res=>res
    )).subscribe()
  }*/

  styleState(value:any){
    return {
      'text-success':value==1 || value==3,
      'text-info':value==2,
      'text-danger':value==4,
      'text-warning':value==5,
    }
  }
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

export interface quotes {
  position:number,
  applicant:string,
  state:number
}

/*const lista_cotizacion: Cotizacion[] = [
  {position: 1, name: 'Hydrogen', state: 1.0079, symbol: 'H', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 2, name: 'Helium', state: 4.0026, symbol: 'He', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 3, name: 'Lithium', state: 6.941, symbol: 'Li', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 4, name: 'Beryllium', state: 9.0122, symbol: 'Be', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 5, name: 'Boron', state: 10.811, symbol: 'B', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 6, name: 'Carbon', state: 12.0107, symbol: 'C', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 7, name: 'Nitrogen', state: 14.0067, symbol: 'N', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 8, name: 'Oxygen', state: 15.9994, symbol: 'O', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 9, name: 'Fluorine', state: 18.9984, symbol: 'F', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 10, name: 'Neon', state: 20.1797, symbol: 'Ne', moneda:0, tipocot:'', fechaini:'', fechafin:''},
];*/
