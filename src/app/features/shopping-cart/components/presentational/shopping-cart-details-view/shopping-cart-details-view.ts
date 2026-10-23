
import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../../../types/products.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart-details-view',
  standalone: true,
  imports: [CurrencyPipe],
  styleUrls: ['./shopping-cart-details-view.scss'],
  templateUrl: './shopping-cart-details-view.html',
})
export class ShoppingCartDetailsView {
  @Input() items: CartItem[] = [];
  @Input() total = 0;
}
