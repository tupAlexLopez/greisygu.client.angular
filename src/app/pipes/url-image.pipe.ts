import { Pipe, PipeTransform } from '@angular/core';
import { ProductResponse } from '../shared/interfaces/response.interface';

@Pipe({
  standalone:true,
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  transform(value: ProductResponse ): string {
    if(!value.img) return 'assets/no-image.png';

    return value.img;
  }

}
