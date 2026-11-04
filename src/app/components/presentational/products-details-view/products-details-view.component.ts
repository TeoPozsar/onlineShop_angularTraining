import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Product } from '../../../types/products.types';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products-details-view',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule],
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsViewComponent {
  private readonly dialog = inject(MatDialog);

  readonly product = input.required<Product>();
  readonly isAdmin = input(false);
  readonly isCustomer = input(false);

  readonly addToCart = output<Product>();

  readonly deleteProduct = output<string>();

  readonly editProduct = output<string>();

  readonly back = output<void>();

  addProductToCart(): void {
    this.addToCart.emit(this.product());
  }

  removeProduct(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      data: {
        title: 'Delete product?',
        message: `Are you sure you want to delete "${this.product().name}"?`,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct.emit(this.product().id);
      }
    });
  }

  goBackToProducts(): void {
    this.back.emit();
  }

  editProductDetails(): void {
    this.editProduct.emit(this.product().id);
  }
}
