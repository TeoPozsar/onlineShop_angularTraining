import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../../services/products';
import { Product } from '../../../../../types/products.types';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

import {
  ShoppingCartDetailsView,
  ShoppingCartDisplayItem,
} from '../../presentational/shopping-cart-details-view/shopping-cart-details-view.component';

@Component({
  selector: 'app-shopping-cart-details',
  standalone: true,
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails implements OnInit {
  private readonly cartService = inject(ShoppingCartService);
  private readonly productsService = inject(ProductsService);
  private latestProducts = new Map<string, Product>();

  protected readonly items = signal<ShoppingCartDisplayItem[]>([]);
  public readonly total = signal<number | null>(0);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.latestProducts = new Map(products.map((product) => [product.id, product]));
        this.refreshDisplayItems();
      },
      error: (error) => {
        console.error('Failed to refresh cart products:', error);
        this.items.set([]);
        this.total.set(null);
      },
    });
  }

  public increaseQuantity(productId: string): void {
    this.cartService.increaseQuantity(productId);
    this.refreshDisplayItems();
  }

  public decreaseQuantity(productId: string): void {
    this.cartService.decreaseQuantity(productId);
    this.refreshDisplayItems();
  }

  public removeItem(productId: string): void {
    this.cartService.removeItem(productId);
    this.refreshDisplayItems();
  }

  private refreshDisplayItems(): void {
    const displayItems = this.cartService.items().flatMap((item) => {
      const product = this.latestProducts.get(item.productId);

      return product ? [{ ...item, product }] : [];
    });

    this.items.set(displayItems);
    this.total.set(
      displayItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    );
  }
}
