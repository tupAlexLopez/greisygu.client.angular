import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { AdministrationProductPageComponent } from './pages/administration-product-page/administration-product-page.component';

import { SaveDialogComponent } from './components/dialogs/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';

import { MaterialModule } from '../shared/material/material.module';

import { StringBooleanPipe } from './pipes/string-boolean.pipe';
import { UrlImagePipe } from './pipes/url-image.pipe';
import { FilterAvailableComponent } from './components/filter-available/filter-available.component';
import { CategoryAdminComponent } from './components/dialogs/category-admin-dialog/category-admin-dialog.component';


@NgModule({
  declarations: [
    AdministrationProductPageComponent,
    SaveDialogComponent,
    ConfirmDialogComponent,
    SearchProductsComponent,
    FilterCategoryComponent,
    FilterAvailableComponent,
    CategoryAdminComponent
  ],
  imports: [
    // Pipes:
    StringBooleanPipe,
    UrlImagePipe,
    // Modules:
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
