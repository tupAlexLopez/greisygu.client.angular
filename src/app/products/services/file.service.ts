import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse } from 'src/app/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor( private http:HttpClient ) { }

  public uploadImage( request:File ):Observable<ImageResponse>{
    const data: FormData = new FormData();
    data.append('file', request);

    return this.http.post<ImageResponse>( 'http://localhost:8080/media/upload', data );
  }
  
  public updateImage( filename:string ,file:File  ):Observable<ImageResponse>{ 
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.put<ImageResponse>( `http://localhost:8080/media/${ filename }`, data );
  }
}
