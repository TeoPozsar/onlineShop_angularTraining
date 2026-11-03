import {Component, ChangeDetectionStrategy, inject, input, output} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';
import {Product} from '../../../types/products.types';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly product = input.required<Product>();
  readonly isAdmin = input(false);
  readonly isCustomer = input(false);

  readonly addToCart = output<Product>();

  readonly deleteProduct = output<string>();

  readonly  editProduct = output<string>();

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
    void this.router.navigate(['/products']);
  }

  editProductDetails(): void {
    this.editProduct.emit(this.product().id);
  }
}
