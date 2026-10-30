import { createReducer , on } from '@ngrx/store';
import {
  ProductsState,
  initialProductsState,
} from './products.state';

import { loadProducts,
  loadProductsSuccess,
  loadProductsFailure } from './products.actions';


export const productsReducer = createReducer<ProductsState>(
  initialProductsState,

  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
    error : null,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
