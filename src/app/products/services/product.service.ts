import { Params } from './../../shared/interfaces/response.interface';
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

  public getAll( page:number = 0 ):Observable<ProductResponse>{
    const url:string = this.base_url + `?page=${page}`;
    return this.http.get<ProductResponse>( url );
  }

  public searchBy( params:Params, page:number = 0 ):Observable<ProductResponse> {    
    const paramsUrl = this.getParamsSelected(params);
    const url:string = this.base_url + `/search?page=${page}`+ paramsUrl;
  
    return this.http.get<ProductResponse>( url );
  }

  public getProductDescriptions( description:string ):Observable<string[]> {
    return this.http.get<ProductResponse>( this.base_url + `/search?page=0&description=${ description }`)
    .pipe( 
      map( response => response.content ),
      map( resp => resp.map( p => p.description ) )
    );
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

  private fieldIsPresent =( params:Params, atr:string ) => {
    return Object.prototype.hasOwnProperty.call(params, atr);
  }

  private getParamsSelected(  params:Params ):string {
    let urlParams:string = '';
    const attributes:string[] = Object.keys(params);
    
    for( let atr of attributes ){
        if( this.fieldIsPresent(params, atr) ){
          if( params[atr as keyof Params] !== undefined ) {
            const value = params[atr as keyof Params];
            urlParams += `&${atr}=${value}`
          }
        }
    }

    return urlParams;
  }
  
}
