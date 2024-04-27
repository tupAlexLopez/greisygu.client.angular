import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  standalone:true,
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  transform(img?: string ): string {
    if( !img || img === '' ) return 'assets/no-image.png';

    
    return environment.url+`/media/${img}`;
  }

}
