import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationProductPageComponent } from './pages/administration-product-page/administration-product-page.component';

const routes: Routes = [
  { path: 'admin', component: AdministrationProductPageComponent, title: 'Administracion - GreisyGu$' },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
