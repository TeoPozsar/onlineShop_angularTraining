
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarViewComponent } from './components/presentational/toolbar-view/toolbar-view.component';
import { ShoppingCartService } from './features/shopping-cart/services/shopping-cart.service';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarViewComponent],
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly cartService = inject(ShoppingCartService);
  private readonly authService = inject(AuthService);

  protected readonly cartItemCount = this.cartService.totalQuantity;
  protected readonly currentUser = this.authService.currentUser;
  protected readonly isAdmin = this.authService.isAdmin;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.loadCurrentUser();
    }
  }

  protected onCartClick(): void {
    void this.router.navigate(['/cart']);
  }

  protected onLogoutClick(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
