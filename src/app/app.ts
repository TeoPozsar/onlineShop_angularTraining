import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { Product } from './types/products.types';
import { PRODUCTS } from './mocks/products.mocks';
import { ShoppingCartModule } from './features/shopping-cart/shopping-cart.module';

@Component({
  imports: [RouterOutlet, ProductsListComponent, ProductsDetailsComponent, ShoppingCartModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('online-shop');

  protected readonly selectedProduct: Product = PRODUCTS[0];
}
