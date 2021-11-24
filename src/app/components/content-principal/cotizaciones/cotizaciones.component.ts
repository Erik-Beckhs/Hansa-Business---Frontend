import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort' ;
import { AuthService, ApplicantService, QuotationService, SuppliersService, ContactsService } from 'src/app/services/service.index';
import { QuotationInterface, QuoteInterface, SupplierInterface } from 'src/app/models/interface.index';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})

export class CotizacionesComponent implements OnInit {
  loading:boolean=false;
  dataSource:any;
  answers:any[]=[];
  quotation!:QuotationInterface;
  quotations:any[]=[];
  array:QuoteInterface = {
    pos:0
  };

  arrayList:QuoteInterface[]=[];

  private user!:any;
  contact:any;

  supplier:SupplierInterface[]=[];

  applicant:any;

  displayedColumns: string[] = ['position', 'name', 'state', 'applicant', 'money', 'tipocot', 'fechaini', 'fechafin'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _quotation:QuotationService,
    private authService:AuthService,
    private _supplier:SuppliersService,
    private _applicant:ApplicantService,
    private _contact:ContactsService,
    private router:Router
    ) { 
     
  }

  ngOnInit(){
    this.contact=this._contact.contact;
    this.loadQuotations();
    this.dataSource = new MatTableDataSource(this.arrayList);
    //this.getContact(this.user.id)
  }

  loadQuotations(){
    this.loading=true

    this._supplier.getQuotationsByIdSupplier(this.contact.suppliers.id)
    .subscribe(
      (res:any)=>{
        this.answers=res[0].answers
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
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
              this.loading=false
            })
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

  routing(quotation:any){
    
    let id = quotation.id;

    if(quotation.type == 4){
      let now = new Date();
      let start = new Date(quotation.start) 
      let end = new Date(quotation.end) 
      // console.log(start)
      // console.log(typeof start)


      // const date = new Date(quotation.start); 
      // const month = date.toLocaleString('en-us', { month: 'long' });
      // console.log(month);

      if(now >= start && now <= end ){
        console.log('Estamos en fecha, dirige a subasta');
        this.router.navigate(['cot-principal/content-side', id, 'auction']);
      }
      else if (now < start){
        console.log('Envia a sala de espera');
        this.router.navigate(['cot-principal/content-side', id, 'lobby']);
      }
      else if (now > start){
        console.log('La subasta culminó');
      }
      else{
        console.log('no dirige a ningun lado');
      }

      //if()
      //subasta
      //TODO: preguntamos por la fecha de subasta, si corresponde nos manda a subasta
      // si no corresponde nos manda a sala de espera
      // si ya pasó la fecha el estado de la subasta es venció o algo asi
      //this.router.navigate(['cot-principal/auction', id]);
    }
    else{
      let state = quotation.state;

      this._quotation.idQuot = id;
      localStorage.setItem('idQuot', id);
  
      switch(state){
        case 1:
          this.router.navigate(['cot-principal/content-side/', id]);
          break;
        case 4:
          //this.router.navigate(['cot-principal/content-info', id]);
          swal("HANSA Business", "No puede acceder a la cotización debido a que ya la rechazó", "error")
          break;
        case 6:
          this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
          //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
          break;
        case 7:
            this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
            //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
            break;
        default:
          console.log('ruta no existente');
          break;
      }
    }
    //this.route.navigate(['content-info', element.id])
    //[routerLink]="['content-info', element.id]"
  }
}

