
import { createAction, props } from '@ngrx/store';
import { Product } from '../../../types/products.types';
import { SaveProduct } from '../../../services/products';

// Load product list
export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>(),
);

// Load one product
export const loadProduct = createAction(
  '[Products] Load Product',
  props<{ id: string }>(),
);

export const loadProductSuccess = createAction(
  '[Products] Load Product Success',
  props<{ product: Product }>(),
);

export const loadProductFailure = createAction(
  '[Products] Load Product Failure',
  props<{ error: string }>(),
);

// Create product
export const createProduct = createAction(
  '[Products] Create Product',
  props<{ product: SaveProduct }>(),
);

export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ product: Product }>(),
);

export const createProductFailure = createAction(
  '[Products] Create Product Failure',
  props<{ error: string }>(),
);

// Update product
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ id: string; product: SaveProduct }>(),
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ product: Product }>(),
);

export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: string }>(),
);

// Delete product
export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: string }>(),
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: string }>(),
);

export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ id: string; error: string }>(),
);
