import {computed, Injectable, signal} from '@angular/core';
import {Product} from '../../../types/products.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({providedIn: 'root'})
export class ShoppingCartService {
  private readonly cartItems = signal<CartItem[]>([]);

  public readonly items = this.cartItems.asReadonly();

  public readonly totalQuantity = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  public readonly total = computed(() =>
    this.cartItems().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  );

  public addToCart(product: Product): void {
    this.cartItems.update(currentItems => {
      const existingItem = currentItems.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }

      return [...currentItems, {product, quantity: 1}];
    });
  }
}
