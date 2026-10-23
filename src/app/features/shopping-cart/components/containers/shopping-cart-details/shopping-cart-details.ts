
import { Component, computed, signal } from '@angular/core';
import { Product } from '../../../../../types/products.types';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart-details',
  standalone: true,
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrls: ['./shopping-cart-details.scss'],
})
export class ShoppingCartDetails {
  protected readonly items = signal<CartItem[]>([]);

  public readonly total = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  public addToCart(product: Product): void {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }
}
