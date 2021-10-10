import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'dias', 'cantidad', 'tarifaUnidad', 'precioOfertado', 'vigencia', 'beneficios', 'fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { 
    this.dataSource = new MatTableDataSource(lista_cotizacion);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

const lista_cotizacion: any[] = [
  {position: 1, dias: '15', cantidad: 5, tarifaUnidad: 50, precioOfertado:250, vigencia:30, beneficios:'Garantia de 1 año', fecha:'2021-10-06'},
  {position: 2, dias: '20', cantidad: 5, tarifaUnidad: 52, precioOfertado:260, vigencia:45, beneficios:'Soporte gratuito', fecha:'2021-10-05'},
  {position: 3, dias: '30', cantidad: 5, tarifaUnidad: 40, precioOfertado:200, vigencia:20, beneficios:'Rebaja del 20% en su proxima compra', fecha:'2021-10-06'}
];