import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../shared/interfaces/response.interface';
import { environments } from 'src/environments/environment';

@Pipe({
  standalone:true,
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  transform(img?: string ): string {
    if( !img || img === '' ) return 'assets/no-image.png';

    
    return environments.url+`/media/${img}`;
  }

}
