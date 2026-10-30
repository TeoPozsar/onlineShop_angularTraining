
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ProductsService } from '../../../services/products';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) =>
            of(
              loadProductsFailure({
                error: error.message ?? 'Failed to load products',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
