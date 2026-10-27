
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartDetails } from '../shopping-cart-details/shopping-cart-details';
import { OrdersService } from '../../../../../services/orders';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [ShoppingCartDetails],
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

    this.ordersService.createOrderFromCart(items).subscribe({
      next: () => {
        this.checkoutMessage.set('Order placed successfully!');
        this.isCheckingOut.set(false);
      },
      error: error => {
        console.error('Failed to create order:', error);
        this.checkoutMessage.set('Checkout failed. Please try again.');
        this.isCheckingOut.set(false);
      },
    });
  }
}
