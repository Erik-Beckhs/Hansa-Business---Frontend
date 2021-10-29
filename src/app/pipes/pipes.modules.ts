import { NgModule } from '@angular/core';
import { FillEmptyPipe } from './fill-empty.pipe';
import { ImgDocPipe } from './img-doc.pipe';
import { MoneySupplierPipe } from './money-supplier.pipe';
import { PayconditionSupplierPipe } from './paycondition-supplier.pipe';

@NgModule({
  declarations: [
    FillEmptyPipe,
    MoneySupplierPipe,
    PayconditionSupplierPipe,
    ImgDocPipe
  ],
  imports: [
    
  ],
  exports:[
    FillEmptyPipe,
    MoneySupplierPipe,
    PayconditionSupplierPipe,
    ImgDocPipe
  ]
})
export class PipesModule { }
