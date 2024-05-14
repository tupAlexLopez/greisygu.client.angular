import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { map } from 'rxjs';

import { ProductService } from '../../services/product.service';

import { Params } from '../../interfaces/response.interface';
@Component({
  selector: 'product-search',
  templateUrl: './search-products.component.html'
})
export class SearchProductsComponent {
  @Output() eventSearchValue = new EventEmitter<string>();
  private param:Params = { description: undefined };

  public descriptions:string[] = [];
  public searchInput:FormControl = new FormControl();

  constructor(
    private productService:ProductService
  ){ }

  public searchProduct() {
    const value:string = this.searchInput.value || '';
    if(value === '') { 
      this.descriptions = []
      return
    };
    
    this.param.description = value;
    this.productService.searchBy( this.param )
    .pipe(
      map( response => response.content ),
      map( content => content.map( prod => prod.description ) ),
    )
    .subscribe( response => this.descriptions = response );
  }

  public onSelectedOption( event:MatAutocompleteSelectedEvent ):void { 
    this.eventSearchValue.emit( event.option.value ); 
  }
  
  public onInputEnter( value:string ):void { this.eventSearchValue.emit( value ); }
}
