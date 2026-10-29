import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toolbar-view',
  standalone: true,
  templateUrl: './toolbar-view.component.html',
  styleUrls: ['./toolbar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarViewComponent {
  readonly title = input<string>('Online Shop');
  readonly cartItemCount = input<number>(0);
  readonly username = input<string | null>(null);
  readonly showCart = input<boolean>(true);
  readonly logoutClick = output<void>();

  protected onLogoutClick(): void {
    this.logoutClick.emit();
  }

  readonly cartClick = output<void>();

  protected onCartClick(): void {
    this.cartClick.emit();
  }
}
