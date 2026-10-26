import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarViewComponent } from './components/presentational/toolbar-view/toolbar-view.component';
import { ShoppingCartService } from './features/shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarViewComponent],
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly cartService = inject(ShoppingCartService);

  protected readonly cartItemCount = this.cartService.totalQuantity;

  protected onCartClick(): void {
    this.router.navigate(['/cart']);
  }
}
