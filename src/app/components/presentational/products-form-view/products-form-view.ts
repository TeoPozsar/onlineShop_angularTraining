import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products-form-view',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './products-form-view.html',
  styleUrl: './products-form-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormViewComponent {
  readonly productForm = input.required<FormGroup>();
  readonly title = input.required<string>();
  readonly save = output<void>();
  readonly cancel = output<void>();
}
