
import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../types/cart-item.type';

@Component({
  selector: 'app-shopping-cart-details-view',
  standalone: true,
  imports: [CurrencyPipe],
  styleUrls: ['./shopping-cart-details-view.scss'],
  templateUrl: './shopping-cart-details-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartDetailsView {
  readonly items = input<CartItem[]>([]);
  readonly total = input<number>(0);
}
