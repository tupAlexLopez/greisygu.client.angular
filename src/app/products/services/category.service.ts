import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { CategoryResponse } from '../interfaces/response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private base_url:string = environment.url + '/categories';
  constructor( private http:HttpClient ) { }

  getAll():Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>( this.base_url );
  }

  save( categoryName:string ):Observable<Boolean> {
    const data = {
      name: categoryName
    }

    return this.http.post( this.base_url, data )
    .pipe( 
      catchError( ()=> of( false ) ),
      map( () => true ) 
    );
  }

  update( category:CategoryResponse ):Observable<Boolean> {
    return this.http.put<CategoryResponse>( this.base_url +`/${ category.id }`, category )
    .pipe( 
      catchError( ()=> of( false ) ),
      map( () => true ) 
    );
  }

  delete( idCategory:number ):Observable<Boolean> {
    return this.http.delete( this.base_url + `/${ idCategory }` )
    .pipe( 
      catchError( ()=> of( false ) ),
      map( () => true )
    );
  }
}
