
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form-view',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-form-view.html',
  styleUrl: './products-form-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFormViewComponent {
  readonly productForm = input.required<FormGroup>();
  readonly save = output<void>();
  readonly cancel = output<void>();
}
