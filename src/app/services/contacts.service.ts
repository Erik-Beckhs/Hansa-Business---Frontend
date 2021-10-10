import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private positions:any[]=[
    {code:'1', name:'Gerente de Logística'},
    {code:'2', name:'Ejecutivo de Logística'},
    {code:'99', name:'Otro'},
  ];
  
  constructor() { }

  getPositions(){
    return this.positions;
  }
}
