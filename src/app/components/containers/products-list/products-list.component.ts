import {Component, ChangeDetectionStrategy, signal, output, inject} from '@angular/core';
import { Product } from '../../../types/products.types';
import { PRODUCTS } from '../../../mocks/products.mocks';
import { ProductsListViewComponent } from '../../presentational/products-list-view/products-list-view.component';
import {Router} from '@angular/router';
import {ProductsService} from '../../../services/products';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsListViewComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  readonly addToCart = output<Product>();
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  private readonly authService = inject(AuthService);

  protected readonly products = signal<Product[]>([]);
  protected readonly isAdmin = this.authService.isAdmin;
  protected readonly isCustomer = this.authService.isCustomer;

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: products => this.products.set(products),
      error: err => console.error('Error fetching products:', err)
    });
  }

  protected onProductSelected(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  protected onAddToCart(product: Product): void {
    if (!this.isCustomer()) {
      return;
    }

    this.addToCart.emit(product);
  }

  protected onAddProduct(): void {
    this.router.navigate(['/products/new']);
  }
}
