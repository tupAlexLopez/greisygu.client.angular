import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AdministrationProductPageComponent } from './pages/administration-product-page/administration-product-page.component';
import { ListProductPageComponent } from './pages/list-product-page/list-product-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StringBooleanPipe } from '../pipes/string-boolean.pipe';
import { UrlImagePipe } from '../pipes/url-image.pipe';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';


@NgModule({
  declarations: [
    AdministrationProductPageComponent,
    ListProductPageComponent,
    SaveDialogComponent,
    ConfirmDialogComponent,
    SearchProductsComponent,
    FilterCategoryComponent
  ],
  imports: [
    // Pipes:
    StringBooleanPipe,
    UrlImagePipe,
    
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
