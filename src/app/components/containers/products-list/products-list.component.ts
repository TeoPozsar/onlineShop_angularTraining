import {Component,  ChangeDetectionStrategy, signal, output} from '@angular/core';
import { Product } from '../../../types/products.types';
import { PRODUCTS } from '../../../mocks/products.mocks';
import { ProductsListViewComponent } from '../../presentational/products-list-view/products-list-view.component';
import { ProductsDetailsComponent } from '../products-details/products-details.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListViewComponent, ProductsDetailsComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  readonly addToCart = output<Product>();

  protected readonly products = PRODUCTS;
  protected readonly selectedProduct = signal<Product | null>(null);

  protected onProductSelected(product: Product): void {
    this.selectedProduct.set(product);
  }

  protected onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
