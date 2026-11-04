
import { createReducer, on } from '@ngrx/store';
import { ProductsState, initialProductsState } from './products.state';

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

export const productsReducer = createReducer<ProductsState>(
  initialProductsState,

  // Load all products
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
    error: null,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load one product
  on(loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedProduct: null,
  })),

  on(loadProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    selectedProduct: product,
    error: null,
  })),

  on(loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    selectedProduct: null,
    error,
  })),

  // Create product
  on(createProduct, (state) => ({
    ...state,
    operationLoading: true,
    operationError: null,
  })),

  on(createProductSuccess, (state, { product }) => ({
    ...state,
    operationLoading: false,
    products: [...state.products, product],
    operationError: null,
  })),

  on(createProductFailure, (state, { error }) => ({
    ...state,
    operationLoading: false,
    operationError: error,
  })),

  // Update product
  on(updateProduct, (state) => ({
    ...state,
    operationLoading: true,
    operationError: null,
  })),

  on(updateProductSuccess, (state, { product }) => ({
    ...state,
    operationLoading: false,
    products: state.products.map((item) =>
      item.id === product.id ? product : item,
    ),
    selectedProduct:
      state.selectedProduct?.id === product.id
        ? product
        : state.selectedProduct,
    operationError: null,
  })),

  on(updateProductFailure, (state, { error }) => ({
    ...state,
    operationLoading: false,
    operationError: error,
  })),

  // Delete product
  on(deleteProduct, (state) => ({
    ...state,
    operationLoading: true,
    operationError: null,
  })),

  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    operationLoading: false,
    products: state.products.filter((product) => product.id !== id),
    selectedProduct:
      state.selectedProduct?.id === id ? null : state.selectedProduct,
    operationError: null,
  })),

  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    operationLoading: false,
    operationError: error,
  })),
);
