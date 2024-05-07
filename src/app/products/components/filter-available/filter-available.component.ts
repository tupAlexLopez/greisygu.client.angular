import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-filter-available',
  templateUrl: './filter-available.component.html'
})
export class FilterAvailableComponent {
  @Output() eventAvailable = new EventEmitter<boolean>();

  onClickItem( value:boolean|undefined ):void {
    this.eventAvailable.emit( value );
  }
}
