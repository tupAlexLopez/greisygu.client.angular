import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { CategoryService } from '../../services/category.service';

import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'product-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnInit{
  @Output() eventCategory:EventEmitter<string> = new EventEmitter();
  public categories:CategoryResponse[] = [];

  constructor( private categoryService:CategoryService ) {}
  
  ngOnInit(): void {
    this.categoryService.getAll()
    .subscribe( response => this.categories = response );
  }

  onSelectCategory( categoryName:string ):void {
    this.eventCategory.emit( categoryName );
  }
}
