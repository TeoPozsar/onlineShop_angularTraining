import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartDetails } from '../shopping-cart-details/shopping-cart-details';
import { OrdersService } from '../../../../../services/orders';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import {MatButtonModule} from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../../user/state/user.selectors';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [ShoppingCartDetails, MatButtonModule],
  templateUrl: './shopping-cart-page.html',
  styleUrls: ['./shopping-cart-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartPage {
  private readonly router = inject(Router);
  private readonly ordersService = inject(OrdersService);
  private readonly cartService = inject(ShoppingCartService);

  protected readonly isCheckingOut = signal(false);
  protected readonly checkoutMessage = signal('');

  private readonly store = inject(Store);
  protected readonly currentUser = this.store.selectSignal(selectCurrentUser);

  protected goToProducts(): void {
    this.router.navigate(['/products']);
  }

  protected checkout(): void {
    const items = this.cartService.items();

    if (items.length === 0) {
      this.checkoutMessage.set('Your cart is empty.');
      return;
    }

    this.isCheckingOut.set(true);
    this.checkoutMessage.set('');

    const user = this.currentUser();

    if (!user) {
      this.checkoutMessage.set('You must be logged in to checkout.');
      return;
    }

    this.ordersService.createOrderFromCart(user.id, items).subscribe({
      next: () => {
        this.checkoutMessage.set('Order placed successfully!');
        this.isCheckingOut.set(false);
        this.cartService.clearCart();
      },
      error: error => {
        console.error('Failed to create order:', error);
        this.checkoutMessage.set('Checkout failed. Please try again.');
        this.isCheckingOut.set(false);
      },
    });
  }
}
