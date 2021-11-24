import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/service.index';

import swal from 'sweetalert'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {
  type!:number
  imageTemp:any
  file:any 
  imageLoad!:string

  document:any
  documentLoad:any
  nameDocument!:string

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _product:ProductsService,
    private dialogRef: MatDialogRef<any>
  ) { 
    //console.log(this.data)

    if(data.type="producto"){
      this.type = 1
    }
    else if (data.type="servicio"){
      this.type = 2
    }

    if(data.doc){

      this.nameDocument = data.nameDoc
      this.document = this.dataURLtoFile(data.doc, data.nameDoc)
    }
  }

  ngOnInit(): void {
    
  }

  onFileChange(event:any) {
    this.file=event.target.files[0]
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error")
      this.file=null
      return ;
    }

    this.imageLoad=this.file

    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL(this.file)
    reader.onloadend = ()=>{
      this.imageTemp = reader.result
    }
  }

  onDocChange(event:any) {
    this.document=event.target.files[0]
    //console.log(this.document)

    if(!event){
      this.document = null
      return ;
    }

    if(this.document.name.split('.')[1] === 'xlsx' || this.document.name.split('.')[1] === 'docx' || this.document.name.split('.')[1] === 'pdf' || this.document.name.split('.')[1] === 'csv' || this.document.name.split('.')[1] === 'txt' || this.document.name.split('.')[1] === 'ppt'){
      this.documentLoad=this.document
      this.nameDocument=this.document.name

      let reader = new FileReader()
      let urlImagenTemp = reader.readAsDataURL(this.document)
      reader.onloadend = ()=>{
        this.data.docb64 = reader.result
      }
    }
    else{
      swal("HANSA Business", "Tipo de archivo no permitido", "error")
      this.document=null
      return ;
    }
  }

  saveProduct(value:any){
    let answerProd = {
      id : this.data.idAnswerProd,
      unitPrice : this.data.unitPriceOffer,
      total : this.data.subTotalOffer,
      offerName : value.offerName,
      about : value.about,
      timeService : value.timeService,
      link : value.link,
      advantage : value.advantage,
      nameDoc : this.document.name,
      doc : this.data.docb64,
      img : this.imageTemp
    };

    this._product.updateAnswerProds(answerProd.id, answerProd)
    .subscribe((res:any)=>
    swal("HANSA Business", "Se registro su respuesta para el producto " + res.offerName, "success")
    .then(()=> {
    this._product.notificacion.emit(res);
    this.dialogRef.close();
    }
    )
    )
  }

    //convierte codigo base 64 en archivo
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
}
