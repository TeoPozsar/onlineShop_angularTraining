import { Product } from '../../../types/products.types';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
