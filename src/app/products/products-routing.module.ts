import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductPageComponent } from './pages/list-product-page/list-product-page.component';
import { AdministrationProductPageComponent } from './pages/administration-product-page/administration-product-page.component';

const routes: Routes = [
  { path: 'list', component: ListProductPageComponent },
  { path: 'admin', component: AdministrationProductPageComponent },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
