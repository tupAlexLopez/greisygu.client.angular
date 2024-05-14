import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ImageResponse } from '../interfaces/response.interface';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private base_url:string = environment.url;
  constructor( private http:HttpClient ) { }

  public upload( request:File ):Observable<ImageResponse>{
    const data: FormData = new FormData();
    data.append('file', request);

    return this.http.post<ImageResponse>( this.base_url + '/media', data );
  }
  
  public update( filename:string ,file:File  ):Observable<ImageResponse>{ 
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.put<ImageResponse>( this.base_url + `/media/${ filename }`, data );
  }
}
