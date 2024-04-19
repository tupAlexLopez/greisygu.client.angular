import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-list-product-page',
  templateUrl: './list-product-page.component.html',
  styleUrls: ['./list-product-page.component.css']
})
export class ListProductPageComponent implements OnInit{  
  public category?:string;
  public products:ProductResponse[] = []
  
  constructor( private service:ProductService ){ }
  
  ngOnInit(): void {
    this.category = '';
    this.service.getAll()
      .subscribe( products => this.products = products );
  }

  public loadProductsSearch( products:ProductResponse[] ){
    this.products = products;
  }
  
  public filterProductsByCategory( category:string ):void {
    this.category = category;
    if(category === 'Todas')
      this.service.getAll().subscribe( products => products = this.products );


    this.service.getAllByCategoryName( category )
      .subscribe( products => this.products = products );
  }
}
