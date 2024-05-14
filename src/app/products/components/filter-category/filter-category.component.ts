import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CategoryService } from '../../services/category.service';

import { CategoryResponse } from 'src/app/products/interfaces/response.interface';

@Component({
  selector: 'product-filter-category',
  templateUrl: './filter-category.component.html'
})
export class FilterCategoryComponent implements OnInit{
  @Output() eventCategory:EventEmitter<string> = new EventEmitter();
  public categories:CategoryResponse[] = [];

  constructor( private categoryService:CategoryService ) {}
  
  ngOnInit(): void {
    this.categoryService.getAll()
    .subscribe( response => this.categories = response );
  }

  onSelectCategory( categoryName:string|undefined ):void {
    this.eventCategory.emit( categoryName );
  }
}
