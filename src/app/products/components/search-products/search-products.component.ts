import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { ProductService } from '../../services/product.service';
@Component({
  selector: 'product-search',
  templateUrl: './search-products.component.html'
})
export class SearchProductsComponent {
  @Output() eventSearchValue = new EventEmitter<string>();

  public descriptions:string[] = [];
  public searchInput:FormControl = new FormControl();

  constructor(
    private productService:ProductService
  ){ }

  searchProduct() {
    const value:string = this.searchInput.value || '';
    if(value === '') return;
    
    this.productService.getProductDescriptions( value )
    .subscribe( response => this.descriptions = response );
  }

  onSelectedOption( event:MatAutocompleteSelectedEvent ):void { 
    this.eventSearchValue.emit( event.option.value ); 
  }
  
  onInputEnter( value:string ):void { this.eventSearchValue.emit( value ); }
}
