import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Product} from '../../../../../types/products.types';
import {ShoppingCartDetailsView} from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';
import {CartItem, ShoppingCartService} from '../../../services/shopping-cart.service';

export type {CartItem};

@Component({
  selector: 'app-shopping-cart-details',
  standalone: true,
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrls: ['./shopping-cart-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetails {
  private readonly cartService = inject(ShoppingCartService);

  protected readonly items = this.cartService.items;

  public readonly total = this.cartService.total;

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
