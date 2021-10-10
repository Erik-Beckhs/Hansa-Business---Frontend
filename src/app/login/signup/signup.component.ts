import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ContactsComponent } from '../../pages/contacts/contacts.component';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ContactInterface } from '../../models/contact.interface';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide:boolean=true;
  //hide2:boolean=true
  isChecked:boolean=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  positionsList:any[]=[];
  rubros:any[]=[
    {codigo:'A0', name:	'AGRIC-PECUA-Y-AGROIN'},
    {codigo:'B0', name:	'ARTESANIA, MYPES'},
    {codigo:'C0', name:	'COMERCIO E IMPORTAC'},
    {codigo:'C001', name:	'TAT'},
    {codigo:'C002', name:	'AASS'},
    {codigo:'C003', name:	'Farmacias'},
    {codigo:'C004', name:	'Tradicional'},
    {codigo:'C005', name:	'Otro'},
    {codigo:'C006', name:	'Instituciones'},
    {codigo:'C007', name:	'Canales Alternativos'},
    {codigo:'D0', name:	'CONST-URBAN Y EQUIP'},
    {codigo:'E0', name:	'EDUC-CULTU. Y CIENC'},
    {codigo:'F0', name:	'EXPORT. Y COM. EXT.'},
    {codigo:'G0', name:	'FINANZ., VAL. Y SEG.'},
    {codigo:'H0', name:	'HIDROC-MINE. Y ENERG'},
    {codigo:'I0', name:	'INDUSTRIA Y MANUFAC.'},
    {codigo:'J0', name:	'INST-ENTID. Y ORGAN'},
    {codigo:'K0', name:	'PUBLIC-COMUNIC-IMPR'},
  ];
  //firstName:string=''
  //lastName:string=''
  //phone:string=''
  //country:string=''
  //password:string=''
  //passRepeat:string=''
  public supplier:SupplierInterface = {
    id:'',
    name:'',
    type:'',
    rubro:'',
    country:'',
    image:'',
    idContact:''
  };

  public contact:ContactInterface = {
    id:"",
    first_name:"",
    last_name:"",
    email:"",
    phone:"",
    country:"",
    city:"",
    position:'',
    idUser:0
  }

  public user:UserInterface={
    email:"",
    password:""
  }

  paisList:any[]=[]
  constructor(
    private _pais:PaisService,
    public dialog:MatDialog,
    private authService:AuthService,
    private router:Router,
    private contactsService:ContactsService
    ) {
      this.paisList=_pais.getPaisList().sort() 
      this.positionsList=contactsService.getPositions()
      // this._pais.getPaisList().subscribe(data=>{this.paisList=data, console.log(this.paisList)});
      //this._http.getRequest().subscribe(res=>this.requests=res);
      //this.paisList=data
    //console.log(this.paisList)
  }

  ngOnInit(): void {
  }

  //metodo para registrar a los contactos
  /*onRegister():void{
    this.authService.
    registerContact( 
      this.contact.id=this.generateID(),
      this.contact.first_name!, 
      this.contact.last_name!, 
      this.contact.email!,
      this.contact.phone!,
      this.contact.country!,
      this.contact.city!
      ).subscribe(contact => {
        //console.log(contact)
        this.authService.setUser(contact);
        const token = contact.id;
        this.authService.setToken(token!);
        this.addUser();
        this.router.navigate(['principal']);
        //location.reload();
      })
      //console.log(this.contact)
  }*/

  //registro de usuario
  onRegister(): void {
    //por mientras el username es un id generado
    if(this.isChecked==true){
      this.user.username=this.generateID()
      this.authService
      .registerUser(this.user.email!,  this.user.password!)
      .subscribe(user => {
        this.authService.setUser(user);
        const token = user.id;
        this.authService.setToken(token!);
  
        this.contact.idUser = user.id;
        this.contact.email = user.email;
        this.contact.id=this.generateID();
  
        //console.log(this.contact)
        this.authService.registerContact(
          this.contact.id!,
          this.contact.first_name!,
          this.contact.last_name!,
          this.contact.email!,
          this.contact.phone!,
          this.contact.country!,
          this.contact.city!,
          this.contact.position!,
          this.contact.idUser!
           ).subscribe(contact => {
              this.router.navigate(['/principal/profile']);
              //console.log(contact)
              /*this.supplier.id=this.generateID();
              this.supplier.idContact=contact.id;
              this.supplier.country=contact.country;
              this.authService.registerSupplier(
                this.supplier.id!,
                this.supplier.name!,
                this.supplier.rubro!,
                this.supplier.country!,
                this.supplier.idContact!
              ).subscribe(supplier=>{
                this.router.navigate(['/cot-principal']);
              })*/
           })
      })
    }
    else{
      alert('Debe aceptar los terminos y condiciones')
    }
  }

  addUser():void{

  }

  send(form: NgForm){
    //console.log(form.value.user)
  }
  openDialogContacts(){
    this.dialog.open(ContactsComponent)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //generador de id
  generateID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
}

