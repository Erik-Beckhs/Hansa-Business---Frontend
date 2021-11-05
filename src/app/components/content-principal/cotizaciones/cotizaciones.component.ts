import { Component, OnInit, ViewChild } from '@angular/core';
//import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort' ;
import { map } from 'rxjs/operators';
import { AuthService, ApplicantService, QuotationService, SuppliersService, ContactsService } from 'src/app/services/service.index';
import { ContactInterface, QuotationInterface, QuoteInterface, SupplierInterface } from 'src/app/models/interface.index';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})

export class CotizacionesComponent implements OnInit {
  loading:boolean=false
  dataSource:any
  answers:any[]=[]
  quotation!:QuotationInterface
  quotations:any[]=[]
  array:QuoteInterface = {
    pos:0
  }

  arrayList:QuoteInterface[]=[]

  private user!:any
  contact:any

  supplier:SupplierInterface[]=[]

  applicant:any

  displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money', 'tipocot', 'fechaini', 'fechafin'];
  //displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _quotation:QuotationService,
    private authService:AuthService,
    private _supplier:SuppliersService,
    private _applicant:ApplicantService,
    private _contact:ContactsService
    ) { 
     
  }

  ngOnInit(){
    this.contact=this._contact.contact
    this.loadQuotations()
    this.dataSource = new MatTableDataSource(this.arrayList)
    //this.getContact(this.user.id)
  }

  loadQuotations(){
    this.loading=true

    this._supplier.getQuotationsByIdSupplier(this.contact.suppliers.id)
    .subscribe(
      (res:any)=>{
        this.answers=res[0].answers
        //console.log(this.answers)
        for(let i=0;i<this.answers.length;i++){
          this._quotation.getQuotationById(this.answers[i].idQuotation)
          .subscribe(res=>{
            this.quotation=res
            this.quotations.push(res)

            this._applicant.getApplicantById(this.quotation.idApplicant)
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
                //console.log(this.arrayList)
              }
              this.loading=false
            })
            //console.log(this.arrayList)
          })
        }
        
      }
    ) 
  }

  ngAfterViewInit() {
    //this.dataSource.setData(this.array)
  }

  styleState(value:any){
    return {
      'text-success':value==1 || value==3,
      'text-info':value==2,
      'text-danger':value==4,
      'text-warning':value==5,
    }
  }
}

