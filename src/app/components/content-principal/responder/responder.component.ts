import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { QuotationService, SurveyService } from 'src/app/services/service.index';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {
  idQuot:any=''
  quotation!:QuotationInterface
  survey:any={
    name:''
  }
  surveyGral:any = 'sin valor'
  querys:object[]=[]

  constructor(
    private route:ActivatedRoute,
    private _quotation:QuotationService,
    private _survey:SurveyService
    ) { 
      //obtenemos el parametro id de la cotizacion
      this.idQuot=this._quotation.getIdQuotation()
      this._quotation.getQuotationById(this.idQuot).subscribe(res=>{
        this.quotation=res
        this._survey.getSurveyAndSectionByIdSurvey(this.quotation.idSurvey).pipe(map(
          (res:any)=>res=res[0]
        )).subscribe((res:any)=>{
          //this.survey=res
          this.surveyGral=res
          let section:any = res.sections
          for (let i=0;i<section.length;i++){
            let querys:object[]=[]
            this._survey.getQueriesByIdSection(section[i].id)
            .subscribe((res:any)=>{
              
              //console.log(res)
              //for(let resp of res){
              for(let j=0; j<res.length;j++){
                this._survey.getQueriesAndOptionsByIdQuery(res[j].id)
              .subscribe((resp:any)=>{
                querys.push(resp)
              })
              }
            })
            this.surveyGral.sections[i].querys = querys
          }
          //console.log(this.surveyGral)
        })
      })
  }

  ngOnInit(): void {
    //console.log(this.surveyGral)
    this.getProducts()
  }

  getProducts(){
    this._quotation.getAnswersByIdQuot(this.idQuot)
    .pipe(map((res:any)=>{
      if(res.length==1){
        return res[0]
      }
    }))
    .subscribe(res=>{
      console.log(res.id) // id de answer
    })
  }
}
