import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, Subscription, debounceTime, map } from 'rxjs';

@Component({
  selector: 'product-search',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit, OnDestroy{
  
  @Output() searchBox = new EventEmitter<string>();

  private debouncerSubscription?:Subscription;
  private debounce:Subject<string> = new Subject();

  public searchInput:FormControl = new FormControl();
  public descriptions:string[] = [];

  constructor(
    private productService:ProductService
  ){ }

  ngOnInit(): void {
    this.debouncerSubscription = this.debounce
      .pipe(
        debounceTime(400),
      )
      .subscribe(value => this.searchBox.emit(value));
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  searchProduct() {
    const value:string = this.searchInput.value || '';
    if(value === '') return;

    this.productService.getAllByDescription( value )
      .subscribe(prod => {
        this.descriptions =prod.map( p => p.description )
      });
  }

  onSelectedOption( event:MatAutocompleteSelectedEvent ):void { 
    this.searchBox.emit( event.option.value ); 
  }

  onKeyPress( value:string ):void {
    this.debounce.next( value );
  }
  
  onInputEnter( value:string ):void { this.searchBox.emit( value ); }
}
