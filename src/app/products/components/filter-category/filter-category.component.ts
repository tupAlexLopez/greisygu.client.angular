import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'product-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnInit {
  public categories:CategoryResponse[] = [];
  @Output() eventCategory:EventEmitter<string> = new EventEmitter();
  
  constructor( private service:CategoryService ) {}
  
  ngOnInit(): void {
    this.service.getAll()
      .subscribe( categories => this.categories = categories );
  }

  onClickMenuItem( categoryName:string ):void {
    this.eventCategory.emit( categoryName );
  }
}
