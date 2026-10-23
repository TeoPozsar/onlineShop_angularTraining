import { Component, Input , Output , EventEmitter} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../types/products.types';

@Component({
  selector: 'app-products-details-view',
  imports: [CurrencyPipe],
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
})
export class ProductsDetailsViewComponent {
  @Input() product: Product | null = null;

  @Output() productSelected = new EventEmitter<Product>();

  selectProduct(product: Product): void {
    this.productSelected.emit(product);
  }
}
