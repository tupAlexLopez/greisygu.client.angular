import { TestBed } from '@angular/core/testing';

import { ValidatorService } from '../../../src/app/products/services/validator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ValidatorService', () => {
  let service: ValidatorService;

  let form:FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  beforeEach(()=> {
    form = new FormGroup({
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.pattern( service.pricePattern ))
    });
  });

  test('Deberia inicializarse el servicio', () => {
    expect(service).toBeTruthy();
  });

  test('Los campos del formulario deberian ser correctos.', ()=> {
    const description:string = 'Producto';
    const price:string = '123';
    form.get('description')?.setValue( description );
    form.get('price')?.setValue( price );

  
    const resultValidationDescriptionField:Boolean | null = service.isInvalidField( form, 'description' );
    const resultValidationPriceField:Boolean | null = service.isInvalidField( form, 'price' );

    expect( resultValidationDescriptionField ).toBeFalsy();
    expect( resultValidationPriceField ).toBeFalsy();
  })
  
  test('Los campos del formulario deberian ser incorrectos.', ()=> {
    const description:string | null = null;
    const price:string = '123asd';
    form.get('description')?.setValue( description );
    form.get('price')?.setValue( price );
    form.markAllAsTouched();
  
    const resultValidationDescriptionField:Boolean | null = service.isInvalidField( form, 'description' );
    const resultValidationPriceField:Boolean | null = service.isInvalidField( form, 'price' );

    expect( resultValidationDescriptionField ).toBeTruthy();
    expect( resultValidationPriceField ).toBeTruthy();
  })
  
  test('Deberia indicarme cual fue el error en los campos.', ()=> {
    const description:string | null = null;
    const price:string = '123asd';

    form.get('description')?.setValue( description );
    form.get('price')?.setValue( price );
    form.markAllAsTouched();
  
    const errorDescriptionField:string | null = service.getFieldError( form, 'description' );
    const errorPriceField:string | null = service.getFieldError( form, 'price' );

    expect( errorDescriptionField ).not.toBeNull();
    expect( errorPriceField ).not.toBeNull();
    expect( errorDescriptionField ).toBe('Campo obligatorio.');
    expect( errorPriceField ).toBe('Debe cumplir expresion regular.');
  })
});
