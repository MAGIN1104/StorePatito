import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProductDto,
  IProductAddDto,
  IProductUpdateDto,
} from '../interface/product.interface';

@Injectable()
export class ProductServiceService {
  constructor(private _http: HttpClient) {}
  loadProducts(): Observable<IProductDto[]> {
    return this._http.get<IProductDto[]>('http://localhost:8080/api/products');
  }

  createProduct(product: IProductAddDto) {
    return this._http.post('http://localhost:8080/api/products', product);
  }
  updateProduct(id: number, product: IProductUpdateDto) {
    return this._http.put(`http://localhost:8080/api/products/${id}`, product);
  }
  deleteProduct(id: number) {
    return this._http.delete(`http://localhost:8080/api/products/${id}`);
  }
}
