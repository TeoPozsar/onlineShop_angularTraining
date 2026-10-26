import {Component, ChangeDetectionStrategy, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Product} from '../../../types/products.types';

@Component({
  selector: 'app-products-details-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsViewComponent {
  readonly product = input.required<Product>();

}
