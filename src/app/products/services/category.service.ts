import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http:HttpClient ) { }

  getAll():Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>('http://localhost:8080/categories');
  }
}
