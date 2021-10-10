import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from '@angular/platform-browser';
import { ContactInterface } from 'src/app/models/contact.interface';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PaisService } from 'src/app/services/pais.service';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.component.html',
  styleUrls: ['./edit-proveedor.component.css']
})
export class EditProveedorComponent implements OnInit {
  files:any=[]
  preview!:string
  tipos:string[]=['Empresa', 'Individual']
  rubros:any

  contact:ContactInterface = {
    id:'',
    first_name:'',
    last_name:'',
    email:'',
    phone:'',
    country:'',
    city:'',
    position:''
  }

  supplier:SupplierInterface = {
    id:'',
    name:'',
    type:'',
    rubro:'',
    country:'',
    image:''
  }

  public paisList!:string[]

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private paisService:PaisService,
    private sanitizer: DomSanitizer,
    private authService : AuthService,
    private suppliersService : SuppliersService
    //public pdvService: PdvService,
    //private cuisService: CuisService,
    //public dialogRef: MatDialogRef<any>
    ) { 
      //console.log(data)
      this.rubros=this.suppliersService.getRubros()
    }

  ngOnInit(): void {
    console.log(this.data),
    this.paisList=this.paisService.getPaisList()
  }

  cargaImagen(e:any){
    const file=e.target.files[0]
    this.extraerBase64(file).then((image:any)=>{
      //console.log(image),
      this.preview=image.base
      this.data.image=image.base
    })
    //this.files.push(file)
    //console.log(this.files)
    
    //console.log(e.target.files)
  }
  /*onPreUpdateContact(contact: ContactInterface): void {
    this.authService.contact2 = Object.assign({}, contact);
  }*/
  updateInfo(){
    this.contact.id=this.data.idContact
    this.contact.first_name=this.data.name
    this.contact.last_name=this.data.last_name
    this.contact.email=this.data.email
    this.contact.phone=this.data.phone
    this.contact.country=this.data.country
    this.contact.city=this.data.city
    this.contact.position=this.data.position

    this.supplier.id=this.data.idProveedor
    this.supplier.name=this.data.enterprise
    this.supplier.type=this.data.type
    this.supplier.rubro=this.data.rubro
    this.supplier.country=this.data.country
    //this.supplier.image=this.data.image
    
    //console.log(this.contact)
    //console.log(this.data)
    this.authService.updateContact(this.contact).subscribe(res => console.log(res))
    this.suppliersService.updateSupplier(this.supplier).subscribe(sup => console.log(sup))
    location.reload()
    //modificar proveedor
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return $event;
    }
  })

}

/*const dialogRef = this.dialog.open(PdvCuisComponent, {
  width: "30%",
  data: datos_pdv,
});
dialogRef.afterClosed().subscribe();

----

constructor(
@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
public pdvService: PdvService,
private cuisService: CuisService,
public dialogRef: MatDialogRef<CierrePdvComponent>
)*/




