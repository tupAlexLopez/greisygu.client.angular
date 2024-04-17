import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient ) { }

  public getAll():Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>( 'http://localhost:8080/products');
  }

  public getAllProductsBy( description:string ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`http://localhost:8080/products/search?description=${description}`);
  }
}
