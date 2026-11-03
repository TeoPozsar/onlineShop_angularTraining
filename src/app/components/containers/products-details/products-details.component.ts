
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../../types/products.types';
import { ProductsService } from '../../../services/products';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';
import { ShoppingCartService } from '../../../features/shopping-cart/services/shopping-cart.service';
import {
  selectIsAdmin,
  selectIsCustomer,
} from '../../../features/user/state/user.selectors';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [ProductsDetailsViewComponent, MatButtonModule],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(ShoppingCartService);
  private readonly store = inject(Store);

  readonly product = signal<Product | undefined>(undefined);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly isNotFound = signal(false);

  protected readonly isAdmin = this.store.selectSignal(selectIsAdmin);
  protected readonly isCustomer = this.store.selectSignal(selectIsCustomer);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.isNotFound.set(true);
      return;
    }

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.isLoading.set(false);

        if (!product) {
          this.isNotFound.set(true);
          return;
        }

        this.product.set(product);
      },
      error: (error) => {
        console.error('Failed to load product:', error);
        this.isLoading.set(false);
        this.errorMessage.set(
          'Unable to load this product. Please try again later.',
        );
      },
    });
  }

  protected onAddToCart(product: Product): void {
    if (!this.isCustomer()) {
      return;
    }

    this.cartService.addToCart(product);
  }

  protected onDeleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        void this.router.navigate(['/products']);
      },
      error: (error) => console.error('Failed to delete product:', error),
    });
  }

  protected onEditProduct(id: string): void {
    void this.router.navigate(['/products', id, 'edit']);
  }

  protected goBackToProducts(): void {
    void this.router.navigate(['/products']);
  }
}
