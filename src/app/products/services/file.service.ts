import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private base_url:string = environment.url;
  constructor( private http:HttpClient ) { }

  public uploadImage( request:File ):Observable<ImageResponse>{
    const data: FormData = new FormData();
    data.append('file', request);

    return this.http.post<ImageResponse>( this.base_url + '/media/upload', data );
  }
  
  public updateImage( filename:string ,file:File  ):Observable<ImageResponse>{ 
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.put<ImageResponse>( this.base_url + `/media/${ filename }`, data );
  }
}
