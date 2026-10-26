import { Product } from '../types/products.types';

const createProduct = (
  id: string,
  name: string,
  category: string,
  description: string,
  price: number
): Product => ({
  id,
  name,
  category,
  description,
  price,
});

export const PRODUCTS: Product[] = [
  createProduct(
    '1',
    'Product 1',
    'Category 1',
    'Description for Product 1',
    10.99
  ),
  createProduct(
    '2',
    'Product 2',
    'Category 2',
    'Description for Product 2',
    19.99
  ),
  createProduct(
    '3',
    'Product 3',
    'Category 1',
    'Description for Product 3',
    5.99
  ),
];
