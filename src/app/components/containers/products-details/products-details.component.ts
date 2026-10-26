import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/products.types';
import { PRODUCTS } from '../../../mocks/products.mocks';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';
import { ShoppingCartService } from '../../../features/shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [ProductsDetailsViewComponent],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(ShoppingCartService);

  readonly product = signal<Product | undefined>(
    PRODUCTS.find(
      product => product.id === Number(this.route.snapshot.paramMap.get('id'))
    )
  );

  protected onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
