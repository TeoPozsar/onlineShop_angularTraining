import { Component } from '@angular/core';
import { Product } from '../../../types/products.types';
import { PRODUCTS } from '../../../mocks/products.mocks';
import { ProductsListViewComponent } from '../../presentational/products-list-view/products-list-view.component';
import { ProductsDetailsComponent } from '../products-details/products-details.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductsListViewComponent, ProductsDetailsComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  protected readonly products: Product[] = PRODUCTS;
  protected selectedProduct: Product | null = null;

  protected onProductSelected(product: Product): void {
    this.selectedProduct = product;
  }
}
