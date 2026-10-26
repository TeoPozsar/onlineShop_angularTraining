import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { Product } from '../../../types/products.types';
import { ProductsDetailsViewComponent } from '../../presentational/products-details-view/products-details-view.component';

@Component({
  selector: 'app-products-details',
  standalone :true,
  imports: [ProductsDetailsViewComponent],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent {
 readonly product =input.required<Product>();
}
