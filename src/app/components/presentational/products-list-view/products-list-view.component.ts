import { Component, Input , Output , EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../types/products.types';

@Component({
  selector: 'app-products-list-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss']
})
export class ProductsListViewComponent {
  @Input() products: Product[] = [];

  @Output() productSelected = new EventEmitter<Product>();

  selectProduct(product: Product): void {
    this.productSelected.emit(product);
  }
}
