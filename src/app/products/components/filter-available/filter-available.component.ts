import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-filter-available',
  templateUrl: './filter-available.component.html',
  styleUrls: ['./filter-available.component.css']
})
export class FilterAvailableComponent {
  @Output() eventAvailable = new EventEmitter<boolean>();

  onClickItem( value:boolean ):void {
    this.eventAvailable.emit( value );
  }
}
