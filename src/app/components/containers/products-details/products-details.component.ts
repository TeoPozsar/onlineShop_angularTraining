import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Product } from '../../../types/products.types';
import { ProductsService } from '../../../services/products';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';
import { ShoppingCartService } from '../../../features/shopping-cart/services/shopping-cart.service';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [ProductsDetailsViewComponent],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(ShoppingCartService);
  private readonly authService = inject(AuthService);

  readonly product = signal<Product | undefined>(undefined);
  protected readonly isAdmin = this.authService.isAdmin;
  protected readonly isCustomer = this.authService.isCustomer;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.productsService.getProductById(id).subscribe({
      next: product => this.product.set(product),
      error: error => console.error('Failed to load product:', error),
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
        this.router.navigate(['/products']);
      },
      error: error => console.error('Failed to delete product:', error),
    });
  }

  protected onEditProduct(id: string): void {
    this.router.navigate(['/products', id, 'edit']);
  }
}
