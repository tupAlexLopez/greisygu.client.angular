import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public pricePattern:string = '^[0-9]*(\.[0-9]{2})?$';

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
      }
    }
    return null;
  }
}
