
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '../../../../../types/products.types';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ProductsService } from '../../../../../services/products';
import { CartItem } from '../../../types/cart-item.type';

@Component({
  selector: 'app-shopping-cart-details',
  standalone: true,
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrls: ['./shopping-cart-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails implements OnInit {
  private readonly cartService = inject(ShoppingCartService);
  private readonly productsService = inject(ProductsService);

  protected readonly items = signal<CartItem[]>([]);
  public readonly total = signal(0);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        const latestProducts = new Map(
          products.map((product) => [product.id, product]),
        );

        const refreshedItems = this.cartService.items()
          .filter((item) => latestProducts.has(item.product.id))
          .map((item) => ({
            ...item,
            product: latestProducts.get(item.product.id)!,
          }));

        this.cartService.updateItems(refreshedItems);
        this.items.set(refreshedItems);
        this.total.set(this.cartService.total());
      },
      error: (error) => {
        console.error('Failed to refresh cart products:', error);
        this.items.set(this.cartService.items());
        this.total.set(this.cartService.total());
      },
    });
  }

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
