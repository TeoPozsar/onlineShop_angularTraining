
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartDetails } from './components/containers/shopping-cart-details/shopping-cart-details';
import { ShoppingCartDetailsView } from './components/presentational/shopping-cart-details-view/shopping-cart-details-view';

@NgModule({
  declarations: [
    ShoppingCartDetails,
    ShoppingCartDetailsView,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShoppingCartDetails,
  ],
})
export class ShoppingCartModule {}
