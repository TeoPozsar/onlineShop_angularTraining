
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';

import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';
import { ShoppingCartService } from '../../../features/shopping-cart/services/shopping-cart.service';
import {
  selectIsAdmin,
  selectIsCustomer,
} from '../../../features/user/state/user.selectors';
import {
  loadProduct,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from '../../../features/products/state/products.actions';
import {
  selectSelectedProduct,
  selectProductsLoading,
  selectProductsError,
} from '../../../features/products/state/products.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { filter, take } from 'rxjs';

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
  private readonly cartService = inject(ShoppingCartService);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly product = this.store.selectSignal(selectSelectedProduct);
  protected readonly isLoading = this.store.selectSignal(selectProductsLoading);
  protected readonly errorMessage = this.store.selectSignal(selectProductsError);

  protected readonly isNotFound = () =>
    !this.isLoading() && !this.errorMessage() && !this.product();

  protected readonly isAdmin = this.store.selectSignal(selectIsAdmin);
  protected readonly isCustomer = this.store.selectSignal(selectIsCustomer);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.store.dispatch(loadProduct({ id }));
  }

  protected onAddToCart(): void {
    const product = this.product();

    if (!product || !this.isCustomer()) {
      return;
    }

    this.cartService.addToCart(product);
  }

  protected onDeleteProduct(id: string): void {
    this.actions$
      .pipe(
        ofType(deleteProductSuccess, deleteProductFailure),
        filter((action) => action.id === id),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((action) => {
        if (action.type === deleteProductSuccess.type) {
          void this.router.navigate(['/products']);
        }
      });

    this.store.dispatch(deleteProduct({ id }));
  }

  protected onEditProduct(id: string): void {
    void this.router.navigate(['/products', id, 'edit']);
  }

  protected goBackToProducts(): void {
    void this.router.navigate(['/products']);
  }
}
