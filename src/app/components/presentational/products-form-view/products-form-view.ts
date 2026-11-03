import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductForm } from './product-form.types';

@Component({
  selector: 'app-products-form-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './products-form-view.html',
  styleUrl: './products-form-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormViewComponent {
  readonly productForm = input.required<ProductForm>();
  readonly title = input.required<string>();
  readonly save = output<void>();
  readonly cancel = output<void>();
  readonly isSaving = input(false);
  readonly isLoading = input(false);
  readonly saveDisabled = input(false);
}
