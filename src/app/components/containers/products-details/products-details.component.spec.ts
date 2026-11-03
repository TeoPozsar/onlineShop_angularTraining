import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Action, Store, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductsDetailsComponent } from './products-details.component';
import { productsReducer } from '../../../features/products/state/products.reducer';
import { userReducer } from '../../../features/user/state/user.reducer';
import {
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
} from '../../../features/products/state/products.actions';

describe('ProductsDetailsComponent', () => {
  let component: ProductsDetailsComponent;
  let fixture: ComponentFixture<ProductsDetailsComponent>;
  let store: Store;
  let dispatchSpy: ReturnType<typeof vi.spyOn>;
  let originalDispatch: (action: Action) => void;
  const navigate = vi.fn();

  beforeEach(async () => {
    navigate.mockReset();

    await TestBed.configureTestingModule({
      imports: [ProductsDetailsComponent],
      providers: [
        provideStore({
          products: productsReducer,
          user: userReducer,
        }),
        provideEffects([]),
        { provide: Router, useValue: { navigate } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'product-1' } },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    originalDispatch = store.dispatch.bind(store);
    dispatchSpy = vi.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates after the requested product deletion succeeds', () => {
    component['onDeleteProduct']('product-1');
    store.dispatch(deleteProductSuccess({ id: 'product-1' }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteProduct({ id: 'product-1' }),
    );
    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith(['/products']);
  });

  it('does not navigate when the requested product deletion fails', () => {
    component['onDeleteProduct']('product-1');
    store.dispatch(
      deleteProductFailure({
        id: 'product-1',
        error: 'Deletion failed',
      }),
    );
    store.dispatch(deleteProductSuccess({ id: 'product-1' }));

    expect(navigate).not.toHaveBeenCalled();
  });

  it('ignores completion actions for another product', () => {
    component['onDeleteProduct']('product-1');
    store.dispatch(deleteProductSuccess({ id: 'product-2' }));
    store.dispatch(
      deleteProductFailure({
        id: 'product-2',
        error: 'Other deletion failed',
      }),
    );

    expect(navigate).not.toHaveBeenCalled();

    store.dispatch(deleteProductSuccess({ id: 'product-1' }));

    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith(['/products']);
  });

  it('does not navigate after the component is destroyed', () => {
    component['onDeleteProduct']('product-1');
    fixture.destroy();
    store.dispatch(deleteProductSuccess({ id: 'product-1' }));

    expect(navigate).not.toHaveBeenCalled();
  });

  it('observes a synchronous success dispatched during the delete request', () => {
    dispatchSpy.mockImplementation((action: Action) => {
      originalDispatch(action);

      if (action.type === deleteProduct.type) {
        originalDispatch(deleteProductSuccess({ id: 'product-1' }));
      }
    });

    component['onDeleteProduct']('product-1');

    expect(navigate).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledWith(['/products']);
  });
});
