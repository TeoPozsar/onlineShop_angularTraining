import { Component, Input } from '@angular/core';
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
  @Input() items: CartItem[] = [];

  protected get total(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }
}
