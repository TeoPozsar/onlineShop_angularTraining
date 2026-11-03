import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { ProductsService } from '../../../services/products';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  loadProduct,
  loadProductSuccess,
  loadProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) =>
            of(
              loadProductsFailure({
                error: error?.message ?? 'Failed to load products',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      switchMap(({ id }) =>
        this.productsService.getProductById(id).pipe(
          map((product) => loadProductSuccess({ product })),
          catchError((error) =>
            of(
              loadProductFailure({
                error: error?.message ?? 'Failed to load product',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      switchMap(({ product }) =>
        this.productsService.createProduct(product).pipe(
          map((createdProduct) =>
            createProductSuccess({ product: createdProduct }),
          ),
          catchError((error) =>
            of(
              createProductFailure({
                error: error?.message ?? 'Failed to create product',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({ id, product }) =>
        this.productsService.updateProduct(id, product).pipe(
          map((updatedProduct) =>
            updateProductSuccess({ product: updatedProduct }),
          ),
          catchError((error) =>
            of(
              updateProductFailure({
                error: error?.message ?? 'Failed to update product',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map(() => deleteProductSuccess({ id })),
          catchError((error) =>
            of(
              deleteProductFailure({
                id,
                error: error?.message ?? 'Failed to delete product',
              }),
            ),
          ),
        ),
      ),
    ),
  );

}
