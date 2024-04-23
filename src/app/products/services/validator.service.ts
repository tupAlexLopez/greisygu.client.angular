import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public numberPattern:string = '^[0-9.$]*';
  constructor() { }

  public isInvalidField( form:FormGroup, field:string ):boolean | null {
    return form.controls[field]?.errors && form.controls[field]?.touched; 
  }
  public getFieldError( form:FormGroup ,field:string ): string|null {
    if( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
          return 'Campo obligatorio.';
        case 'minlength':
          return `must have at least ${ errors[key].requiredLength } characters.`;
      }
    }
    return null;
  }
}
