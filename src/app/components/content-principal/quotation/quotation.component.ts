import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuotationInterface, ProductInterface, DocumentInterface } from 'src/app/models/interface.index';
import { ContactsService, DocumentsService, ProductsService, QuotationService, SurveyService } from 'src/app/services/service.index';
import { ProductComponent } from '../../dialogs/product/product.component';


//import swal from 'sweetalert';
declare var swal:any

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  isCompleted:boolean = false
  isCompleted2:boolean = true
  isCompleted3:boolean = true

  prueba:any='valor'
  //stepper
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  idQuot:string='';
  idSupplier:string='';
  idAnswer:any;
  quotation!:QuotationInterface
  survey:any={
    name:''
  };

  public surveyGral:any = {
    name : ''
  }

  cantAnswers:number = 0

  //surveyGral.name = ''

  querys:object[]=[];
  products:ProductInterface[]=[];
  documents:DocumentInterface[]=[];


  displayedColumns: string[] = ['name', 'unit', 'amount', 'unitPriceOffer', 'subTotalOffer', 'edit'];
  dataSource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private _quotation:QuotationService,
    private _survey:SurveyService,
    private _product:ProductsService,
    private _document:DocumentsService,
    public _contact:ContactsService,
    public dialog:MatDialog,
    private domSanitizer:DomSanitizer,
    ) {
      //obtenemos el id de la cotizacion
      this.idQuot = this._quotation.idQuot;

      this.idSupplier = this._contact.contact.suppliers.id

      this.getAnswer()
    }

  getAnswer(){
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this.idSupplier)
      .subscribe((res:any)=>
      {
        this.idAnswer=res.id;
      }
    )
  }

  // ngAfterViewInit() {
  //   //this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });

    this.getSurveyGral(this.idQuot);

    //this.getDocuments();
    this.loadDocuments();

    this.loadProducts();

    this._product.notificacion.subscribe(res=>this.loadProducts())
  }

  //devuelve el formulario de preguntas completo
  getSurveyGral(idQuot:any){
    this._quotation.getQuotationById(idQuot).subscribe(res=>{
      this.quotation=res
      this._survey.getSurveyAndSectionByIdSurvey(this.quotation.idSurvey).pipe(map(
        (res:any)=>res=res[0]
      )).subscribe((res:any)=>{
        this.surveyGral=res;
        let section:any = res.sections;
        for (let i=0;i<section.length;i++){
          let querys:object[]=[];
          this._survey.getQueriesByIdSection(section[i].id)
          .subscribe((res:any)=>{
            for(let j = 0; j < res.length ; j++){
              this._survey.getQueriesAndOptionsByIdQuery(res[j].id)
              .subscribe((resp:any)=>{
              
              //TODO: agregar su respuesta si existe
              this._survey.countAnswerSurveyByIdAnswerAndIdQuery(this.idAnswer, resp.id)
              .subscribe((res:any)=>
                  {
                    if(res.count > 0){
                      if(resp.type != 5){
                        this._survey.getAnswerSurveyByIdAnswerAndIdQueryFindOne(this.idAnswer, resp.id)
                        .subscribe((res:any)=>{
                            resp.answer = res.answer1
                            resp.idAnswerSurvey = res.id
                        })
                      }
                      else{
                        //es de tipo 5 cargar campo check a los options
                        //devolver el listado de answer survey dado idquery e idanswer
                        this._survey.getAnswerSurveyByIdAnswerAndIdQuery(this.idAnswer, resp.id)
                        .subscribe((res:any)=>{
                            resp.answer = res.answer1
                            resp.idAnswerSurvey = res.id
                            for (let option of resp.options){
                                for(let answerSurvey of res){
                                  if(option.name === answerSurvey.answer1){ //solo esta comparando con el primer valor
                                    option.check = true
                                    option.idAnswerSurvey = answerSurvey.id
                                  }
                                  // else{
                                  //   option.check = false
                                  // }
                                }
                            }
                        })
                        //hacer un for para options de query
                        //comparar si options.name == answerSurvey.answer1
                        //agregar campo check al option con true
                      }
                    }
                    else{
                      resp.answer = '';
                    }
                  }
                )
                //TODO: si es de tipo desplegable, entrar a answer survey y con idquery e idanswer
                //devolver un array de respuestas, answerSurvey.answer1 === options.name 

              querys.push(resp);
              //console.log('LISTA DE PREGUNTAS')
              //console.log(resp)
              this._survey.countAnswerSurveyByIdAnswer(this.idAnswer)
              .subscribe((res:any)=>this.cantAnswers=res.count)
            })
            }
          })
          this.surveyGral.sections[i].querys = querys;
          //TODO: asignar las respuestas de options
        }
        console.log('***FORMULARIO DE PREGUNTAS***');
        console.log(this.surveyGral);
      })
    })
  }

  //carga los productos de las tablas productos y answer products
  loadProducts(){
    this._quotation.getProductsAssocQuotation(this.idQuot)
    .subscribe((res:any)=>{
      this.products=res;

      for(let i=0; i<this.products.length; i++){

        this._product.countAnswerProdServByIdAnswerAndIdProdServ(this.idAnswer, this.products[i].id)
        .subscribe((res:any)=>{
          //console.log('EXISTE O NO')
          if(res.count === 0){
            this.products[i].unitPriceOffer = 0;
            this.products[i].subTotalOffer = 0;
            this.products[i].about= '',
            this.products[i].offerName= '',
            this.products[i].link= '',
            this.products[i].timeService= 0,
            this.products[i].advantage= '',
            this.products[i].nameDoc= '',
            this.products[i].doc= '',
            this.products[i].img= ''
          }
          else{
            //TODO: encontrar el registro y asignarlo a esos dos campos
            this._product.getAnswerProdServByIdAnswerAndIdProdServ(this.idAnswer, this.products[i].id)
            .subscribe((res:any)=>{
              this.products[i].idAnswerProd = res.id;
              this.products[i].unitPriceOffer = res.unitPrice;
              this.products[i].subTotalOffer = res.total;
              this.products[i].about= res.about;
              this.products[i].offerName = res.offerName,
              this.products[i].link = res.link,
              this.products[i].timeService = res.timeService,
              this.products[i].advantage = res.advantage,
              this.products[i].nameDoc = res.nameDoc,
              this.products[i].doc = res.doc,
              this.products[i].img = res.img
            })
          }
        })
      }

      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
    })
  }

  //carga los documentos de la tabla documentos y answerdocuments
  loadDocuments(){
    this._document.getDocumentsAssocQuotation(this.idQuot).subscribe((documents:any)=>{
      this.documents=documents;
    
      for(let i=0;i<this.documents.length;i++){
        let idDoc = this.documents[i].id
        this._document.countAnswerDocsByIdAnswerAndIdDoc(this.idAnswer, idDoc)
        .subscribe((res:any)=>{

          if(res.count === 0){
            // this.documentsLoad[i] = {
            //   idAnswer : this.idAnswer,
            //   idDoc : idDoc,
            //   name : '',
            //   document : ''
            // }
            //TODO. hay error por que no se encuentra a idAnswer
            this.documents[i].idAnswer = this.idAnswer
            //this.documents[i].idDoc = idDoc
            this.documents[i].nameDoc = ''
            this.documents[i].document = ''
            if(this.documents[i].template){
              this.documents[i].templateSanitized = this.domSanitizer.bypassSecurityTrustUrl(this.documents[i].template!)
            }
          }
          else{
            this._document.getAnswerDocumentByIdAnswerAndIdDocument(this.idAnswer, this.documents[i].id)
            .subscribe((resp:any)=>{
              //console.log('Respuesta de documento si existe')
              //console.log(resp)
              this.documents[i].idAnswer = resp.idAnswer
              //this.documents[i].idDoc = idDoc
              this.documents[i].nameDoc = resp.nameDoc
              this.documents[i].document = resp.document
              this.documents[i].idAnswerDoc = resp.id
              if(this.documents[i].template){
                this.documents[i].templateSanitized = this.domSanitizer.bypassSecurityTrustUrl(this.documents[i].template!)
              }
            })
          }
        })
      }
      console.log(this.documents)
    })
  }

  //muestra el dialog para responder a los productos de la cotizacion
  responseProduct(value:any){
    //let idProd = value.id
    //console.log(value);
    this.dialog.open(ProductComponent, {
      width:'60%',
      data: value
    });

  }

  //calcula el subtotal de la tabla de productos
  calculate(item:any, myPrice:any){
    let price:number =+ myPrice
    item.unitPriceOffer = price

    item.subTotalOffer = item.amount * item.unitPriceOffer
    //console.log(item)
    if(item.idAnswerProd){
      let answerProd = {
        unitPrice : item.unitPriceOffer,
        total : item.subTotalOffer
      }
      //actualizar
      this._product.updateAnswerProds(item.idAnswerProd, answerProd)
      .subscribe(res=>this.loadProducts())
    }
    else{
      let answerProd = {
        idAnswer : this.idAnswer,
        idProdServ : item.id,
        unitPrice : item.unitPriceOffer,
        total : item.subTotalOffer
      }
      this._product.createAnswerProd(answerProd)
      .subscribe(res=>{
        console.log('registro creado');
        this.loadProducts();
      })
      //crear nuevo
    }
    //console.log(item)
  }

  onDocChange(event:any, document:any)
  {

    let file = event.target.files[0]
    //console.log(file)
    if(!event){
      file = null
      return ;
    }

    if(file.name.split('.')[1] === 'xlsx' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'csv' || file.name.split('.')[1] === 'txt' || file.name.split('.')[1] === 'ppt' || file.name.split('.')[1] === 'JPG' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'PNG' || file.name.split('.')[1] === 'txt'){
      //this.documentLoad=file
      //this.nameDocument=file.name

      let reader = new FileReader()
      let urlImagenTemp = reader.readAsDataURL(file)
      reader.onloadend = ()=>{
        document.nameDoc = file.name
        document.document = reader.result
      }
    }
    else{
      swal("HANSA Business", "Tipo de archivo no permitido", "error")
      file=null
      return ;
    }
  }

  sendAnswer(){
    this.saveDocsRequired()

    swal({
      title:'Enviar respuesta a comprador',
      text:'Ingrese su comentario',
      content:'input',
      icon:'info',
      buttons:['Cancelar', 'Enviar'],
      dangerMode:true
    }).then((valor:string)=>{
      if(!valor || valor.length===0){
        //console.log('cancelado')
        return ;
      }
      //console.log(valor)
      this.updateAnswer(valor)
      //TODO: guardar comentario y cambiar el estado de la cotizacion

    })
    //swal()
  }

  saveDocsRequired(){
    for(let doc of this.documents){
      if(doc.idAnswerDoc){
        let newDoc:any = {
          nameDoc:doc.nameDoc,
          document:doc.document
        }
        //actualizar
        this._document.updateAnswerDocument(doc.idAnswerDoc, newDoc)
        .subscribe(()=>console.log('Se actualizó con exito'))
      }
      else{
        let newDoc:any = {
          idAnswer:doc.idAnswer,
          idDoc:doc.id,
          nameDoc:doc.nameDoc,
          document:doc.document
        }
        //crear nuevo
        this._document.saveAnswerDocument(newDoc).subscribe(()=>console.log('Se creó el registro de manera exitosa'))
      }
    }
  }

  updateAnswer(comment:string){
    let answerDocs = {
      id:this.idAnswer,
      state:2,
      commentSupplier:comment
    }
    //console.log(answerDocs)
    //return;
    this._quotation.updateAnswer(answerDocs)
    .subscribe(()=>
    swal("HANSA Business", "Se registró su respuesta de manera exitosa, gracias por participar en nuestras cotizaciones", "success")
    .then(()=>{
      this.router.navigate(['/cot-principal'])
    }))
  }

  formResponse(){
    // console.log(form.valid)
    // console.log(form.value)
    // console.log(this.surveyGral.sections[0].querys)
    // return;

    for(let section of this.surveyGral.sections){

      // if(this.verificaForm(this.surveyGral.sections)){
      //   console.log('devuelve true')
      //   return false;
      // }
      // else {
      //   return true;
      // }
      //comprobamos que no haya requeridos vacios
      for(let query of section.querys){
        if(query.type != 5){
          if(query.idAnswerSurvey){
            //actualizar
            //console.log('actualizar')
            let answerSurvey = {
              id : query.idAnswerSurvey,
              answer1 : query.answer
            }
            //console.log(answerSurvey)
            this._survey.updateAnswerSurvey(answerSurvey).subscribe(()=>{
              swal("HANSA Business", "Se actualizaron sus respuestas", "success")
            })
          }
          else{
            //crear
            //console.log('crear')
            let answerSurvey = {
              idAnswer : this.idAnswer,
              idQuery : query.id,
              answer1 : query.answer
            }
            //console.log(answerSurvey)
            this._survey.createAnswerSurvey(answerSurvey).subscribe(()=>{
              swal("HANSA Business", "Se registró sus respuestas", "success")
            })
          }
        }
        else{
          //TODO: guardar con opciones
          //for para eliminar los registros de answersurvey
          for(let option of query.options){
            console.log(option)
            if(option.idAnswerSurvey){
              
              // this._survey.updateAnswerSurvey()
              if(option.check == false){
                //eliminar
                this._survey.deleteAnswerSurvey(option.idAnswerSurvey).subscribe()
              }
              else{
                //actualizar
              let newOption = {
                id : option.idAnswerSurvey,
                answer1 : option.name,
              }
                this._survey.updateAnswerSurvey(newOption).subscribe()
              }
            }
            else{
              let newOption = {
                idAnswer : this.idAnswer,
                answer1 : option.name,
                idQuery : option.idQuery
              }
              //crear
              this._survey.createAnswerSurvey(newOption).subscribe()
            }
          }
          //por cada opcion guardar
        }
      }
    }
  }

  checkRequiredQuerys(stepper:MatStepper){
    //return 2;
    //return ;
    //this.isCompleted = true;
    console.log('vamos al siguiente')
    //stepper.next();
  }

  changeCheck(option:any, value:any){
    console.log(option)
    // if(value == 'on'){
    //   option.check=true
    // }
    // else{
    //   option.check=false
    // }
    // console.log(this.surveyGral)
  }


}

// export class surveyInterface {
//   name?:string
//   description?:string
//   sections?:any[]
// }