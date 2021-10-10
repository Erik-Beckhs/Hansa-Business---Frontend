import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort' ;
import { MonoTypeOperatorFunction } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  displayedColumns: string[] = ['position', 'name', 'state', 'symbol', 'moneda', 'tipocot', 'fechaini', 'fechafin'];
  dataSource = new MatTableDataSource<Cotizacion>(lista_cotizacion);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface Cotizacion {
  name: string;
  position: number;
  state: number;
  symbol: string;
  moneda:number;
  tipocot:string;
  fechaini:string;
  fechafin:string;
}

const lista_cotizacion: Cotizacion[] = [
  {position: 1, name: 'Hydrogen', state: 1.0079, symbol: 'H', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 2, name: 'Helium', state: 4.0026, symbol: 'He', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 3, name: 'Lithium', state: 6.941, symbol: 'Li', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 4, name: 'Beryllium', state: 9.0122, symbol: 'Be', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 5, name: 'Boron', state: 10.811, symbol: 'B', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 6, name: 'Carbon', state: 12.0107, symbol: 'C', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 7, name: 'Nitrogen', state: 14.0067, symbol: 'N', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 8, name: 'Oxygen', state: 15.9994, symbol: 'O', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 9, name: 'Fluorine', state: 18.9984, symbol: 'F', moneda:0, tipocot:'', fechaini:'', fechafin:''},
  {position: 10, name: 'Neon', state: 20.1797, symbol: 'Ne', moneda:0, tipocot:'', fechaini:'', fechafin:''},
];