
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, SaveProduct } from '../../../services/products';
import { ProductsFormViewComponent } from '../../presentational/products-form-view/products-form-view';

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
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly productForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
  });

  private productId: string | null = null;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productsService.getProductById(this.productId).subscribe({
        next: (product) => this.productForm.patchValue(product),
        error: (error) => console.error('Could not load product', error),
      });
    }
  }

  protected onSave(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product: SaveProduct = this.productForm.getRawValue();

    const request = this.productId
      ? this.productsService.updateProduct(this.productId, product)
      : this.productsService.createProduct(product);

    request.subscribe({
      next: () => this.router.navigate(['/products']),
      error: (error) => console.error('Could not save product', error),
    });
  }

  protected onCancel(): void {
    if (this.productId) {
      this.router.navigate(['/products', this.productId]);
    } else {
      this.router.navigate(['/products']);
    }
  }


}
