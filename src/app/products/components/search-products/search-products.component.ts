import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { ProductService } from '../../services/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'product-search',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
  public searchInput:FormControl = new FormControl();
  @Output() eventEmitter = new EventEmitter<ProductResponse[]>();

  public products:ProductResponse[] = [];

  constructor( private service:ProductService )
  { }

  
  public searchProduct():void{
    if(this.searchInput.value === '') return;
    const description:string = this.searchInput.value;
    
    this.service.getAllProductsBy( description )
      .subscribe(products =>  this.products = products );
  }

  onSelectedOption( event:MatAutocompleteSelectedEvent ):void {
    this.eventEmitter.emit( this.products );
  }

  onInputEnter(){
    this.searchProduct();
    this.eventEmitter.emit( this.products );
  }
}
