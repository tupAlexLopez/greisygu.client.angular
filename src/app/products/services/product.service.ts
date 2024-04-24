import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductRequest } from 'src/app/shared/interfaces/request.interface';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private base_url:string = environments.url + '/products';

  constructor( private http: HttpClient ) { }

  public getAll():Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>( this.base_url );
  }

  public save( product:ProductRequest ):Observable<ProductResponse> {
    return this.http.post<ProductResponse>( this.base_url, product );
  }

  public update( id:string, product:ProductRequest ):Observable<ProductResponse> {
    return this.http.put<ProductResponse>( this.base_url + `/${ id }`, product );
  }

  public delete( id:string ):Observable<boolean> {
    return this.http.delete( this.base_url+`/${id}` )
    .pipe( 
      catchError(()=> of( false ) ),
      map( () => true)
    );
  }
  public disable( id:string, available:boolean ):Observable<boolean> {
    return this.http.patch( this.base_url + `/${id}/${ available }`, { })
    .pipe(
      catchError(()=> of( false ) ),
      map( () => true)
    );
  }
  

  public getAllByCategoryName( name:string ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>( this.base_url + `/category/${ name }`);
  }
  
  public getAllByDescription( description:string ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>( this.base_url + `/search?description=${ description }`);
  }

  public getAllByDescriptionAndCategoryName( description:string, category:string ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>( this.base_url + `/search?description=${ description }&category=${ category }`);
  }
  
  public getAllByDescriptionAndCategoryNameAndAvailable( description:string, category:string, available:boolean ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>( this.base_url + `/search?description=${ description }&category=${ category }&available=${ available }`);
  }
  
  public getAllByAvailable( available:boolean ):Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>( this.base_url + `/available/${ available }`);
  }
  
}
