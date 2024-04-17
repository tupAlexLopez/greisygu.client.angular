import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-list-product-page',
  templateUrl: './list-product-page.component.html',
  styleUrls: ['./list-product-page.component.css']
})
export class ListProductPageComponent implements OnInit{
  public products:ProductResponse[] = []
  
  constructor( private service:ProductService ){ }
  
  ngOnInit(): void {
    this.service.getAll()
      .subscribe( products => this.products = products );
  }

  public loadProductsSearch( products:ProductResponse[] ){
    console.log(products);
    this.products = products;
  }
}
