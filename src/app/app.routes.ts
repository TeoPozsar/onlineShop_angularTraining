import { Routes } from '@angular/router';
import {ProductsDetailsComponent} from './components/containers/products-details/products-details.component';
import {ShopPageComponent} from './components/containers/shop-page/shop-page.component';
import {ShoppingCartPage} from './features/shopping-cart/components/containers/shopping-cart-page/shopping-cart-page';


export const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ShopPageComponent},
  {path: 'products/:id', component: ProductsDetailsComponent},
  {path: 'cart', component: ShoppingCartPage}

];
