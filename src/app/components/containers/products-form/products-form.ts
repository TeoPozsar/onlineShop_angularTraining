
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { filter, take } from 'rxjs';

import { ProductsFormViewComponent } from '../../presentational/products-form-view/products-form-view';
import { ProductForm } from '../../presentational/products-form-view/product-form.types';
import { Product } from '../../../types/products.types';
import {
  loadProduct,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
} from '../../../features/products/state/products.actions';
import {
  selectProductOperationLoading,
  selectProductOperationError,
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from '../../../features/products/state/products.selectors';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule, ProductsFormViewComponent],
  templateUrl: './products-form.html',
  styleUrl: './products-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly productForm: ProductForm =
    this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
    });

  protected readonly operationLoading =
    this.store.selectSignal(selectProductOperationLoading);

  protected readonly operationError =
    this.store.selectSignal(selectProductOperationError);

  private readonly selectedProduct =
    this.store.selectSignal(selectSelectedProduct);

  protected readonly productLoading =
    this.store.selectSignal(selectProductsLoading);

  private readonly productLoadError =
    this.store.selectSignal(selectProductsError);

  private productId: string | null = null;
  protected isEditing = false;

  protected readonly isProductLoaded = computed(
    () =>
      !this.isEditing ||
      (this.productId !== null &&
        this.selectedProduct()?.id === this.productId),
  );

  protected readonly loadErrorMessage = computed(() => {
    if (!this.isEditing || this.productLoading() || this.isProductLoaded()) {
      return null;
    }

    return this.productLoadError() ?? 'Product not found.';
  });

  protected readonly saveDisabled = computed(
    () => this.isEditing && (this.productLoading() || !this.isProductLoaded()),
  );

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditing = this.productId !== null;

    if (this.productId) {
      this.store
        .select(selectSelectedProduct)
        .pipe(
          filter(
            (product): product is Product => product?.id === this.productId,
          ),
          take(1),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((product) => {
          this.productForm.patchValue(product);
        });

      this.store.dispatch(loadProduct({ id: this.productId }));
    }
  }

  protected onSave(): void {
    if (this.operationLoading()) {
      return;
    }

    if (this.isEditing && (this.productLoading() || !this.isProductLoaded())) {
      return;
    }

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.getRawValue();

    if (this.productId) {
      this.actions$
        .pipe(
          ofType(updateProductSuccess, updateProductFailure),
          take(1),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((action) => {
          if (action.type === updateProductSuccess.type) {
            void this.router.navigate(['/products']);
          }
        });

      this.store.dispatch(
        updateProduct({ id: this.productId, product }),
      );
    } else {
      this.actions$
        .pipe(
          ofType(createProductSuccess, createProductFailure),
          take(1),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((action) => {
          if (action.type === createProductSuccess.type) {
            void this.router.navigate(['/products']);
          }
        });

      this.store.dispatch(createProduct({ product }));
    }
  }

  protected onCancel(): void {
    if (this.productId) {
      void this.router.navigate(['/products', this.productId]);
    } else {
      void this.router.navigate(['/products']);
    }
  }
}
