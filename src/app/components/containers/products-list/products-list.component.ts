
import {
  Component,
  ChangeDetectionStrategy,
  output,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Product } from '../../../types/products.types';
import { ProductsListViewComponent } from '../../presentational/products-list-view/products-list-view.component';
import { loadProducts } from '../../../features/products/state/products.actions';
import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from '../../../features/products/state/products.selectors';
import {
  selectIsAdmin,
  selectIsCustomer,
} from '../../../features/user/state/user.selectors';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsListViewComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  readonly addToCart = output<Product>();

  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly products$: Observable<Product[]> =
    this.store.select(selectAllProducts);

  protected readonly loading$: Observable<boolean> =
    this.store.select(selectProductsLoading);

  protected readonly error$: Observable<string | null> =
    this.store.select(selectProductsError);

  protected readonly isAdmin = this.store.selectSignal(selectIsAdmin);
  protected readonly isCustomer = this.store.selectSignal(selectIsCustomer);

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  protected onProductSelected(product: Product): void {
    void this.router.navigate(['/products', product.id]);
  }

  protected onAddToCart(product: Product): void {
    if (!this.isCustomer()) {
      return;
    }

    this.addToCart.emit(product);
  }

  protected onAddProduct(): void {
    void this.router.navigate(['/products/new']);
  }
}
