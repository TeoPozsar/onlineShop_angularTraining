import {Component, ChangeDetectionStrategy, input, output} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../types/products.types';

@Component({
  selector: 'app-products-list-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListViewComponent {
  readonly products = input<Product[]>([]);

  readonly productSelected = output<Product>();
  readonly addToCart = output<Product>();

  selectProduct(product: Product): void {
    this.productSelected.emit(product);
  }

  addProductToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
