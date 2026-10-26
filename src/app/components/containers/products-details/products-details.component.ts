import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Product } from '../../../types/products.types';
import { ProductsService } from '../../../services/products';
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
export class ProductsDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(ShoppingCartService);

  readonly product = signal<Product | undefined>(undefined);

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
}
