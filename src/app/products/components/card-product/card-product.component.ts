import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/response.interface';

@Component({
  selector: 'product-card',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() product?:Product;
}
