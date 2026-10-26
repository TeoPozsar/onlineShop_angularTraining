import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartDetails } from '../shopping-cart-details/shopping-cart-details';

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

  protected goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
