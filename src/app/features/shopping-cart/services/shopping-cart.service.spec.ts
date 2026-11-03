import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
    service.updateItems([{ productId: 'product-1', quantity: 2 }]);
  });

  it('increases an item quantity and the total quantity', () => {
    service.increaseQuantity('product-1');

    expect(service.items()).toEqual([{ productId: 'product-1', quantity: 3 }]);
    expect(service.totalQuantity()).toBe(3);
  });

  it('decreases an item quantity and the total quantity', () => {
    service.decreaseQuantity('product-1');

    expect(service.items()).toEqual([{ productId: 'product-1', quantity: 1 }]);
    expect(service.totalQuantity()).toBe(1);
  });

  it('removes an item immediately', () => {
    service.removeItem('product-1');

    expect(service.items()).toEqual([]);
    expect(service.totalQuantity()).toBe(0);
  });

  it('removes an item when decreasing its quantity to zero', () => {
    service.updateItems([{ productId: 'product-1', quantity: 1 }]);

    service.decreaseQuantity('product-1');

    expect(service.items()).toEqual([]);
    expect(service.totalQuantity()).toBe(0);
  });

  it('discards invalid quantities when replacing cart items', () => {
    service.updateItems([
      { productId: 'zero', quantity: 0 },
      { productId: 'negative', quantity: -1 },
      { productId: 'fractional', quantity: 1.5 },
    ]);

    expect(service.items()).toEqual([]);
    expect(service.totalQuantity()).toBe(0);
  });
});
