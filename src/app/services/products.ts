import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../types/products.types';
import {environment} from '../../environments/environment';


export type SaveProduct = Omit<Product, 'id'>;

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: SaveProduct): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: SaveProduct): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

}
