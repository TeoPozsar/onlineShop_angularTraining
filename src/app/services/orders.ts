
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../types/products.types';

export interface CreateOrderRequest {
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface Order {
  id: string;
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}


@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  createOrder(order: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }


  createOrderFromCart(
    customerId: string,
    items: { product: Product; quantity: number }[],
  ): Observable<Order> {
    const order: CreateOrderRequest = {
      customerId,
      products: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    return this.createOrder(order);
  }

}
