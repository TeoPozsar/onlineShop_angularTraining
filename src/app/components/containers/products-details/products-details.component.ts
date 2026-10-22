import { Component, Input } from '@angular/core';
import { Product } from '../../../types/products.types';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';

@Component({
  selector: 'app-products-details',
  imports: [ProductsDetailsViewComponent],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent {
  @Input() product: Product | null = null;
}
