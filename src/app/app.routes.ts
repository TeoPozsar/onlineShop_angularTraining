import { Routes } from '@angular/router';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { ShopPageComponent } from './components/containers/shop-page/shop-page.component';
import { ShoppingCartPage } from './features/shopping-cart/components/containers/shopping-cart-page/shopping-cart-page';
import { ProductsFormComponent } from './components/containers/products-form/products-form';
import { Login } from './components/containers/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ShopPageComponent },
  {
    path: 'products/new',
    component: ProductsFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:id/edit',
    component: ProductsFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    component: ProductsDetailsComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartPage,
    canActivate: [authGuard],
  },
  { path: 'login', component: Login },
];
