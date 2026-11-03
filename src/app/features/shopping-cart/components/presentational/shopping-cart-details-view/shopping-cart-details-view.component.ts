import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../../types/products.types';

export interface ShoppingCartDisplayItem {
  productId: string;
  quantity: number;
  product: Product;
}

@Component({
  selector: 'app-shopping-cart-details-view',
  standalone: true,
  imports: [CurrencyPipe],
  styleUrls: ['./shopping-cart-details-view.component.scss'],
  templateUrl: './shopping-cart-details-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetailsView {
  readonly items = input<ShoppingCartDisplayItem[]>([]);
  readonly total = input<number | null>(0);
  readonly increase = output<string>();
  readonly decrease = output<string>();
  readonly remove = output<string>();
}
