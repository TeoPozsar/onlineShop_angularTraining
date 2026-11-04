import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../../types/products.types';
import { ShoppingCartService } from '../../../features/shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './shop-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent {
  private readonly cartService = inject(ShoppingCartService);

  protected onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
