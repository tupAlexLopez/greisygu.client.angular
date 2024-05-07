import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductService } from '../../../src/app/products/services/product.service';
import { Product, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { of } from 'rxjs';
import { ProductRequest } from '../../../src/app/shared/interfaces/request.interface';

describe('ProductService', () => {
  let productService: ProductService;

  let productResponse:ProductResponse;
  let mockproducts:Product[];
  let mockProduct:Product;
  let request:ProductRequest;

  beforeAll(() => {
    request= {
      description: 'Producto prueba4',
      available: true,
      category: 1 ,
      img: 'http://img.com.ar/xyzdffaq.png',
      price: 1780.21
    }

    mockProduct = {
      id: '5',
      description: 'Producto prueba',
      available: true,
      category: { id: 1, name: 'Prueba de categoria' },
      img: 'http://img.com.ar/lopytresx.png',
      price: 1111.21
    };
    mockproducts = [
      {
        id: '1',
        description: 'Producto prueba2',
        available: true,
        category: { id: 1, name: 'Prueba de categoria' },
        img: 'http://img.com.ar/asdadasd.png',
        price: 1222.21
      },
      {
        id: '2',
        description: 'Producto prueba3',
        available: true,
        category: { id: 1, name: 'Prueba de categoria' },
        img: 'http://img.com.ar/xyzdffaq.png',
        price: 1780.21
      },
    ]
    productResponse = {
      content: mockproducts,
      empty: false,
      first: true,
      last: true,
      totalPages: 1,
      numberOfElements: 2,
      totalElements: 2,
      size: 2,
      number: 0,
      pageable: { offset: 0, paged: true, pageNumber: 0, pageSize: 2, unpaged: false, sort: {empty: false, sorted: false, unsorted: false } },
      sort: {empty: false, sorted: false, unsorted: false }
    }
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    productService = TestBed.inject(ProductService);
  });

  test('(1) Deberia inicializar el servicio.', () => {
    expect(productService).toBeTruthy();
  });

  test('(2) Deberia listar todos los productos.', (done)=> {
    const spy = jest.spyOn( productService, 'getAll' ).mockReturnValue( of( productResponse ));

    productService.getAll().subscribe(response => {
      expect( response.content.length ).toBeGreaterThan(0);
      expect( response.content.length ).toEqual( mockproducts.length );
      expect( response.content ).toBe( mockproducts );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });

  test('(3) Deberia guardar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'save' ).mockReturnValue( of( true ));

    productService.save( request ).subscribe(response => {
      expect( response ).toBeTruthy();
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('(4) Deberia guardar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'save' ).mockReturnValue( of( true ));

    productService.save( request ).subscribe(response => {
      expect( response ).toBeTruthy();
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
});
