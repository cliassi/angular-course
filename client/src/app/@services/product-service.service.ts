import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../@models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  create(product: Product) {
    return this.http.post(`${environment.apiEndpoint}products`, product);
  }

  update(product: Product) {
    return this.http.put(
      environment.apiEndpoint + 'products/' + product.id,
      product
    );
  }

  get() {
    return this.http.get<Product[]>(`${environment.apiEndpoint}products`);
  }

  remove(id: number) {
    return this.http.delete(environment.apiEndpoint + 'products/' + id);
  }
}
