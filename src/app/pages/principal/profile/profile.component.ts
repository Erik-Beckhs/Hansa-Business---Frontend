import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ContactInterface } from 'src/app/models/contact.interface';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { EditProveedorComponent } from '../../dialogs/edit-proveedor/edit-proveedor.component';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user!:any;
  private rubros:any;
  private nameRubro:string='No asignado';
  private positionList:any[]=[]

  private datos:any = {
    name:'',
    last_name:'',
    email:'',
    phone:'',
    country:'',
    city:'',
    position:'',
    enterprise:'',
    rubro:'',
    type:'',
    image:'',
    idContact:'',
    idProveedor:''
  }

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

  private idUser!:number

  constructor(
    private authService:AuthService,
    private supplierService:SuppliersService, 
    private dialog:MatDialog,
    private contactsService:ContactsService
    ) {
    this.user=authService.getCurrentUser();
    this.rubros=supplierService.getRubros();
    this.positionList=contactsService.getPositions()
    //console.log(this.rubros)
    //idUser=localStorage.get
  }

  ngOnInit(): void {
    //this.getContact()
    //console.log('VALOR'+ this.user.id)
    this.getContact(this.user.id)
  }

  /*getContact():void{
    this.authService.getContactByUserId(this.user.id).
    pipe(
      tap(res => 
        {
          this.contact=res,
          console.log(this.contact)
          //console.log(this.contact[0].first_name)
          this.getProveedor()
        }))
          .subscribe();
  }*/
  
  getContact(id: string) {
    this.authService.getContactByUserId(id).subscribe(con => {
      (
        //console.log('valores'),
        //console.log(con)
        this.contact = con
        //console.log(this.contact.first_name)
        ),
      this.getProveedor()
      //console.log(con)
    });
  }

  getProveedor():void{
    this.supplierService.getSupplierByContactId(this.contact.id).then(
      (supplier: SupplierInterface) => {
        //console.log(supplier),
        this.supplier=supplier,

        //console.log(this.contact)
        this.datos.idContact=this.contact.id,
        this.datos.idProveedor=this.supplier[0].id,
        this.datos.email=this.user.email,
        this.datos.name=this.contact.first_name,
        this.datos.last_name=this.contact.last_name,
        this.datos.email=this.contact.email,
        this.datos.phone=this.contact.phone,
        this.datos.country=this.contact.country,
        this.datos.enterprise=this.supplier[0].name,
        this.datos.rubro=this.supplier[0].rubro,
        this.datos.position=this.contact.position,
        this.datos.city=this.contact.city,
        this.datos.type=this.supplier[0].type
      });
  }

  openDialogEdit(){
    this.dialog.open(EditProveedorComponent,{
      width: "48%",
      data: this.datos,
    })
  }
  showRubro(idRubro:string){
    for(let rubro of this.rubros){
      if(rubro.codigo == idRubro){
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
