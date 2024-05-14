import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Params } from '../interfaces/response.interface';

import { ProductRequest } from '../interfaces/request.interface';
import { ProductResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private base_url:string = environment.url + '/products';

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
  
  public save( product:ProductRequest ):Observable<boolean> {
    return this.http.post<ProductResponse>( this.base_url, product )
    .pipe(
      catchError( () => of( false )),
      switchMap( ()=> of(true) )      
    );
  }

  public update( id:string, product:ProductRequest ):Observable<Boolean> {
    return this.http.put<ProductResponse>( this.base_url + `/${ id }`, product )
    .pipe(
      catchError( () => of( false )),
      switchMap( ()=> of(true) )      
    );
  }

  public deleteByCategory( idCategory:number ):Observable<boolean> {
    return this.http.delete( this.base_url + `/category/${idCategory}`)
    .pipe( 
      catchError(()=> of(false)),
      map ( ()=> true)
    )
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
