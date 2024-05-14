import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/page/home.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [ 
  { path: '', component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home - GreisyGu$' },
      { path: 'products', loadChildren: () => import('./products/products.module').then( products => products.ProductsModule ) },
      { path: '**', redirectTo: 'home' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
