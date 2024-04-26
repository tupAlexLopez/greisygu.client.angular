import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { ProductService } from '../../services/product.service';
import { Subject, Subscription, debounceTime, map } from 'rxjs';

@Component({
  selector: 'product-search',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
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
    
    this.productService.getAllByDescription( value )
    .subscribe( response => this.descriptions = response );
  }

  onSelectedOption( event:MatAutocompleteSelectedEvent ):void { 
    this.eventSearchValue.emit( event.option.value ); 
  }
  
  onInputEnter( value:string ):void { this.eventSearchValue.emit( value ); }
}
