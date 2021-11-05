import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupplierInterface } from 'src/app/models/supplier.interface';
//import { ContactInterface } from 'src/app/models/contact.interface';
import { AuthService, ListService } from 'src/app/services/service.index';
import { SuppliersService } from 'src/app/services/service.index';
import { ContactsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  private user!:any;
  private rubros:any;
  private nameRubro:string='No asignado';
  private positionList:any[]=[]

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
  //   img:'',
  //   idContact:'',
  //   idProveedor:''
  // }

  contact:any

  supplier:any={
    name:"",
    type:"",
    businessArea:"",
    country:"",
    img:"",
    idContact:""
  }
  //supplier:SupplierInterface

  private idUser!:number

  constructor(
    private authService:AuthService,
    private _supplier:SuppliersService, 
    private dialog:MatDialog,
    private _service:ListService,
    private _contact:ContactsService
    ) {
    this.contact = _contact.contact
    console.log(this.contact)
    //console.log(this.contact)
    
    //si el contacto tiene registro de proveedor entonces lo cargamos aca
    if(this.contact.suppliers){
      // this.supplier = {
      //   name:this.contact.suppliers.name,
      //   type:this.contact.suppliers.type,
      //   businessArea:this.contact.suppliers.businessArea,
      //   country:this.contact.suppliers.country,
      //   img:this.contact.suppliers.img,
      //   idContact:this.contact.suppliers.idContact
      // }
      this.supplier=this.contact.suppliers
    }
    this.loadList()
  }

  ngOnInit(): void {

  }

  loadList(){
    //listado de rubros
    this.rubros=this._service.getRubroList()
    //listado de puestos
    this.positionList=this._service.getPositionsList()
  }

  // getSupplier(){
  //   this._supplier.getSupplierByContactId(this.contact.id).subscribe(
  //     (supplier: any) => {
  //       //console.log(supplier),
  //       this.supplier=supplier,

  //       //console.log(this.contact)
  //       this.datos.idContact=this.contact.id,
  //       this.datos.idProveedor=this.supplier.id,
  //       this.datos.email=this.user.email,
  //       this.datos.name=this.contact.first_name,
  //       this.datos.last_name=this.contact.last_name,
  //       this.datos.email=this.contact.email,
  //       this.datos.phone=this.contact.phone,
  //       this.datos.country=this.contact.country,
  //       this.datos.enterprise=this.supplier.name,
  //       this.datos.businessArea=this.supplier.businessArea,
  //       this.datos.position=this.contact.position,
  //       this.datos.city=this.contact.city,
  //       this.datos.type=this.supplier.type
  //     }
  //   )
  // }

  // openDialogEdit(){
  //   this.dialog.open(EditProveedorComponent,{
  //     width: "48%",
  //     data: this.datos,
  //   })
  // }

  showRubro(idRubro:string){
    for(let rubro of this.rubros){
      if(rubro.id == idRubro){
        this.nameRubro=rubro.name
      }
    }
    return this.nameRubro
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
}
