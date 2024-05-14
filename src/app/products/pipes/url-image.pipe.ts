import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  standalone:true,
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  transform(img?: string ): string {
    if( !img || img === '' ) return 'assets/icons/no-image.png';

    
    return environment.url+`/media/${img}`;
  }

}
