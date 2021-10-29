import { Component, OnInit } from '@angular/core';
import { ContactInterface } from 'src/app/models/contact.interface';
//import { ContactInterface } from 'src/app/models/contact.interface';
import { AuthService, ListService, ContactsService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  file:any

  contact:ContactInterface = {
    first_name:''
  }
  paisList:any[]=[]
  positionList:any[]=[]
  imageLoad!:string
  imageTemp:any

  // private datos:any = {
  //   name:'',
  //   last_name:'',
  //   email:'',
  //   phone:'',
  //   country:'',
  //   city:'',
  //   position:'',
  //   enterprise:'',
  //   businessArea:'',
  //   type:'',
  //   image:'',
  //   idContact:'',
  //   idProveedor:''
  // }

  // public supplier:any={
  //   name:"",
  //   type:"",
  //   businessArea:"",
  //   country:"",
  //   image:"",
  //   idContact:""
  // }

  //private idUser!:number

  constructor(
    private authService:AuthService,
    private _service:ListService,
    private _contact:ContactsService,
    ) {
      this.contact = this._contact.contact
      console.log(this.contact)
    
      this.positionList=_service.getPositionsList()
      //console.log(this.positionList)
      this.paisList=this._service.getPaisList()
      //console.log(this.paisList)
  }

  ngOnInit(): void {
    
  }

  showPosition(value:any){
    let res:string='No encontrado'
    for (let position of this.positionList){
      if(position.code==value){
        res=position.name
      }
    }
    return res
  }

  updateContact(contact:any){
    let idContact:any = this.contact.id
    //console.log(contact)
    this._contact.updateContact(idContact, contact).subscribe(res=>console.log(res))
  }

  //llama al servicio de imagen y lo modifica
  updateImage(){
    //let img:any
    let file:object={
      img:this.imageTemp
    }
    // console.log(file)
    // return;
    let idContact:any = this.contact.id
    //console.log(contact)
    this._contact.updateImage(file, idContact).subscribe(res=>console.log(res))
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
      //console.log(reader.result)
      this.imageTemp = reader.result
    }
    //console.log(this.file)
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   console.log(file)
    // }
  }
}
