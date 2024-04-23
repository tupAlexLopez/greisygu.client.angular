import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'stringBoolean'
})
export class StringBooleanPipe implements PipeTransform {
  transform(value: boolean ): string {
    return value ? 'done' : 'close';
  }

}
