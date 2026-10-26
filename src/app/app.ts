import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ShoppingCartDetails } from './features/shopping-cart/components/containers/shopping-cart-details/shopping-cart-details';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsListComponent, ShoppingCartDetails],
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class App {

}
