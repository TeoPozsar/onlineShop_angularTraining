
import { Product } from '../../../types/products.types';
export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  operationLoading: boolean;
  operationError: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  operationLoading: false,
  operationError: null,
};
