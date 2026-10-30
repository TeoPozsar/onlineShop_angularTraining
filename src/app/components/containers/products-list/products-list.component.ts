import {Component, ChangeDetectionStrategy, output, inject} from '@angular/core';
import { Product } from '../../../types/products.types';
import { ProductsListViewComponent } from '../../presentational/products-list-view/products-list-view.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {loadProducts} from '../../../features/products/state/products.actions';
import {selectAllProducts , selectProductsLoading , selectProductsError} from '../../../features/products/state/products.selectors';
import { AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsListViewComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  readonly addToCart = output<Product>();
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);

  protected readonly products$: Observable<Product[]> = this.store.select(selectAllProducts);
  protected readonly loading$: Observable<boolean> = this.store.select(selectProductsLoading);
  protected readonly error$: Observable<string | null> = this.store.select(selectProductsError);

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  protected readonly isAdmin = this.authService.isAdmin;
  protected readonly isCustomer = this.authService.isCustomer;


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
