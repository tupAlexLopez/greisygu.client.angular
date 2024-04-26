import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'product-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent {
  @Input() categories:CategoryResponse[] = [];
  
  @Output() eventCategory:EventEmitter<string> = new EventEmitter();

  onSelectCategory( categoryName:string ):void {
    this.eventCategory.emit( categoryName );
  }
}
