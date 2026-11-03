import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../../types/products.types';
import { CartItem } from '../types/cart-item.type';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private readonly cartItems = signal<CartItem[]>([]);

  public readonly items = this.cartItems.asReadonly();

  public readonly totalQuantity = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0),
  );

  public addToCart(product: Product): void {
    this.cartItems.update((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { productId: product.id, quantity: 1 }];
    });
  }

  public increaseQuantity(productId: string): void {
    this.cartItems.update((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  public decreaseQuantity(productId: string): void {
    this.cartItems.update((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.productId !== productId) {
          return [item];
        }

        return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
      }),
    );
  }

  public removeItem(productId: string): void {
    this.cartItems.update((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    );
  }

  public clearCart(): void {
    this.cartItems.set([]);
  }

  public updateItems(items: CartItem[]): void {
    this.cartItems.set(
      items.filter((item) => Number.isInteger(item.quantity) && item.quantity > 0),
    );
  }
}
