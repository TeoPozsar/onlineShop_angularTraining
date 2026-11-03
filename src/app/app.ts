
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToolbarViewComponent } from './components/presentational/toolbar-view/toolbar-view.component';
import { ShoppingCartService } from './features/shopping-cart/services/shopping-cart.service';
import { AuthService } from './services/auth';
import { loadUser } from './features/user/state/user.actions';
import {selectCurrentUser,selectIsAdmin} from './features/user/state/user.selectors';

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
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly cartItemCount = this.cartService.totalQuantity;
  protected readonly isLoginPage = signal(this.router.url === '/login');

  protected readonly currentUser = this.store.selectSignal(selectCurrentUser);
  protected readonly isAdmin = this.store.selectSignal(selectIsAdmin);

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isLoginPage.set(this.router.url === '/login');
      });

    if (this.authService.isLoggedIn()) {
      this.store.dispatch(loadUser());
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
