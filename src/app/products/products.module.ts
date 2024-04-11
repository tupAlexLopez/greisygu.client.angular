import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AdministrationProductPageComponent } from './pages/administration-product-page/administration-product-page.component';
import { ListProductPageComponent } from './pages/list-product-page/list-product-page.component';


@NgModule({
  declarations: [
    AdministrationProductPageComponent,
    ListProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
