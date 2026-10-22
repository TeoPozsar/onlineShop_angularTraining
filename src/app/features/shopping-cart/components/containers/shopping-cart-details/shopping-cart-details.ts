import { Component } from '@angular/core';
import { ShoppingCartDetailsView } from '../../presentational/shopping-cart-details-view/shopping-cart-details-view';

@Component({
  selector: 'app-shopping-cart-details',
  standalone: true,
  imports: [ShoppingCartDetailsView],
  templateUrl: './shopping-cart-details.html',
  styleUrls: ['./shopping-cart-details.scss'],

})
export class ShoppingCartDetails {}
