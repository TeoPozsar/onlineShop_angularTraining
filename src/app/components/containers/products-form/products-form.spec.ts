import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { ProductsFormComponent } from './products-form';
import { productsReducer } from '../../../features/products/state/products.reducer';
import {
  loadProduct,
  loadProductFailure,
  loadProductSuccess,
  createProduct,
  updateProduct,
} from '../../../features/products/state/products.actions';
import { Product } from '../../../types/products.types';

const product: Product = {
  id: '1',
  name: 'Keyboard',
  category: 'Accessories',
  description: 'A mechanical keyboard',
  price: 99.9,
  image: 'https://example.com/keyboard.png',
};

describe('ProductsFormComponent', () => {
  let fixture: ComponentFixture<ProductsFormComponent>;
  let component: ProductsFormComponent;
  let store: Store;
  let dispatchSpy: ReturnType<typeof vi.spyOn>;
  const navigate = vi.fn();

  async function setup(id: string | null): Promise<void> {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent],
      providers: [
        provideStore({ products: productsReducer }),
        provideEffects([]),
        { provide: Router, useValue: { navigate } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => id } } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function saveButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button[type="submit"]');
  }

  function errorMessages(): string[] {
    return Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('.error-message'),
    ).map((element) => element.textContent?.trim() ?? '');
  }

  function fillForm(): void {
    component['productForm'].setValue({
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      description: product.description,
    });
  }

  beforeEach(() => {
    navigate.mockReset();
  });

  it('should create', async () => {
    await setup(null);

    expect(component).toBeTruthy();
  });

  describe('while the product is loading', () => {
    beforeEach(async () => {
      await setup('1');
    });

    it('requests the product once', () => {
      expect(dispatchSpy).toHaveBeenCalledWith(loadProduct({ id: '1' }));
      const loadCalls = (
        dispatchSpy.mock.calls as unknown as { type: string }[][]
      ).filter(([action]) => action.type === loadProduct.type);

      expect(loadCalls).toHaveLength(1);
    });

    it('disables the save button', () => {
      expect(saveButton().disabled).toBe(true);
    });

    it('does not dispatch an update', () => {
      fillForm();
      component['onSave']();

      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: updateProduct.type }),
      );
    });
  });

  describe('when loading fails', () => {
    beforeEach(async () => {
      await setup('missing-id');
      store.dispatch(loadProductFailure({ error: 'Product not found' }));
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('shows the error message', () => {
      expect(errorMessages()).toContain('Product not found');
    });

    it('keeps the save button disabled', () => {
      expect(saveButton().disabled).toBe(true);
    });

    it('does not dispatch an update', () => {
      fillForm();
      component['onSave']();

      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: updateProduct.type }),
      );
    });
  });

  describe('when a different product is loaded', () => {
    it('does not allow updating the requested product', async () => {
      await setup('2');
      store.dispatch(loadProductSuccess({ product }));
      fixture.detectChanges();
      await fixture.whenStable();

      fillForm();
      component['onSave']();

      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: updateProduct.type }),
      );
    });
  });

  describe('when the product has loaded', () => {
    beforeEach(async () => {
      await setup('1');
      store.dispatch(loadProductSuccess({ product }));
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('patches the form with the loaded product', () => {
      expect(component['productForm'].getRawValue()).toEqual({
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        description: product.description,
      });
    });

    it('enables the save button', () => {
      expect(saveButton().disabled).toBe(false);
    });

    it('dispatches an update on save', () => {
      component['onSave']();

      expect(dispatchSpy).toHaveBeenCalledWith(
        updateProduct({
          id: '1',
          product: {
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            description: product.description,
          },
        }),
      );
    });
  });

  describe('when creating a new product', () => {
    beforeEach(async () => {
      await setup(null);
    });

    it('does not load a product', () => {
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: loadProduct.type }),
      );
    });

    it('enables the save button for a valid form', async () => {
      fillForm();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(saveButton().disabled).toBe(false);
    });

    it('dispatches a create action on save', () => {
      fillForm();
      component['onSave']();

      expect(dispatchSpy).toHaveBeenCalledWith(
        createProduct({
          product: {
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            description: product.description,
          },
        }),
      );
    });
  });
});
