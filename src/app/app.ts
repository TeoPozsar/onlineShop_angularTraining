import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ShoppingCartDetails } from './features/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details';
import { Product } from './types/products.types';
import { CartItem } from './features/shopping-cart/components/presentational/shopping-cart-details-view/shopping-cart-details-view';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsListComponent, ShoppingCartDetails],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('online-shop');

  protected cartItems: CartItem[] = [];

  protected addToCart(product: Product): void {
    const existingItem = this.cartItems.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      this.cartItems = this.cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      this.cartItems = [...this.cartItems, { product, quantity: 1 }];
    }
  }
}
