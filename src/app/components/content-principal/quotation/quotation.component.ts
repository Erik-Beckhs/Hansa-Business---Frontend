import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuotationInterface, ProductInterface, DocumentInterface } from 'src/app/models/interface.index';
import { DocumentsService, ProductsService, QuotationService, SurveyService } from 'src/app/services/service.index';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {


  idQuot:string=''
  quotation!:QuotationInterface
  survey:any={
    name:''
  }

  surveyGral:any = 'sin valor';
  querys:object[]=[];
  products:ProductInterface[]=[];
  documents:DocumentInterface[]=[];

  displayedColumns: string[] = ['name', 'unit', 'amount', 'myprice', 'subtotal', 'edit'];
  dataSource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private route:ActivatedRoute,
    private _quotation:QuotationService,
    private _survey:SurveyService,
    private _product:ProductsService,
    private _document:DocumentsService
    ) { 
      //obtenemos el id de la cotizacion
      //this.idQuot=this._quotation.getIdQuotation()   
      this.idQuot=this._quotation.idQuot
      //console.log(this.idQuot)
      
  }

  // ngAfterViewInit() {
  //   //this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {

    this.getSurveyGral(this.idQuot)

    this.getDocuments()

    this.getProducts();
  }

  getSurveyGral(idQuot:any){
    this._quotation.getQuotationById(idQuot).subscribe(res=>{
      this.quotation=res
      this._survey.getSurveyAndSectionByIdSurvey(this.quotation.idSurvey).pipe(map(
        (res:any)=>res=res[0]
      )).subscribe((res:any)=>{
        //this.survey=res
        this.surveyGral=res;
        let section:any = res.sections;
        for (let i=0;i<section.length;i++){
          let querys:object[]=[];
          this._survey.getQueriesByIdSection(section[i].id)
          .subscribe((res:any)=>{
            //console.log(res)
            //for(let resp of res){
            for(let j=0; j<res.length;j++){
              this._survey.getQueriesAndOptionsByIdQuery(res[j].id)
              .subscribe((resp:any)=>{
              querys.push(resp);
            })
            }
          })
          this.surveyGral.sections[i].querys = querys;
        }
        console.log('***FORMULARIO DE PREGUNTAS***');
        console.log(this.surveyGral);
      })
    })
  }

  getProducts(){
    this._quotation.getAnswersByIdQuot(this.idQuot)
    .subscribe((res:any)=>{
      this._survey.getIdProdListByIdAnswer(res.id)
      .subscribe((res:any)=>
      {
        for(let i=0;i<res.length;i++){
          this._product.getProductById(res[i].idProdServ)
          .subscribe(producto=>{
            this.products.push(producto)
            if(i+1==res.length){
              console.log('***LISTA DE PRODUCTOS***')
              console.log(this.products);
              this.dataSource = new MatTableDataSource(this.products);
              this.dataSource.paginator = this.paginator;
            }
          })
        }
      }
      )
    })
  }

  getDocuments(){
    this._document.getDocumentsAssocQuotation(this.idQuot).subscribe((documents:any)=>{
      this.documents=documents
      console.log('***LISTA DE DOCUMENTOS***')
      console.log(documents)
    })
  }

  verProducto(value:any){
    console.log(value)
  }
}