import {Component, ChangeDetectionStrategy, inject, input, output} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';
import {Product} from '../../../types/products.types';

@Component({
  selector: 'app-products-details-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsViewComponent {
  private readonly router = inject(Router);

  readonly product = input.required<Product>();

  readonly addToCart = output<Product>();

  addProductToCart(): void {
    this.addToCart.emit(this.product());
  }

  goBackToProducts(): void {
    void this.router.navigate(['/products']);
  }
}
