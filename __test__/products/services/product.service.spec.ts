import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { ProductService } from '../../../src/app/products/services/product.service';
import { Params, Product, ProductResponse } from '../../../src/app/shared/interfaces/response.interface';
import { ProductRequest } from '../../../src/app/shared/interfaces/request.interface';

describe('Test: ProductService', () => {
  let productService: ProductService;

  let mockProduct:Product;
  let mockRequestProduct:ProductRequest;
  let mockProducts:Product[];
  let mockProductResponse:ProductResponse;
  let params:Params;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    productService = TestBed.inject(ProductService);
  });

  beforeEach(()=> {
    params =
    { 
      description: undefined,
      category: undefined,
      available: undefined 
    };

    mockRequestProduct ={
      description: 'Producto prueba',
      available: true,
      category: 1,
      img: 'http://img.com.ar/lopytresx.png',
      price: 1111.21
    }

    mockProduct ={
      id: '5',
      description: 'Producto prueba',
      available: true,
      category: { id: 1, name: 'Prueba de categoria' },
      img: 'http://img.com.ar/lopytresx.png',
      price: 1111.21
    };
  });

  beforeEach(() => {
    mockProducts = [
      {
        id: '1',
        description: 'Producto prueba',
        available: true,
        category: { id: 1, name: 'Prueba de categoria 2' },
        img: 'http://img.com.ar/asdadasd.png',
        price: 1222.21
      },
      {
        id: '2',
        description: 'Producto prueba2',
        available: false,
        category: { id: 2, name: 'Prueba de categoria' },
        img: 'http://img.com.ar/xyzdffaq.png',
        price: 1780.21
      },
      {
        id: '3',
        description: 'Producto prueba2',
        available: true,
        category: { id: 2, name: 'Prueba de categoria' },
        img: 'http://img.com.ar/xyzdffaq.png',
        price: 1780.21
      },
      {
        id: '4',
        description: 'Producto prueba',
        available: false,
        category: { id: 2, name: 'Prueba de categoria' },
        img: 'http://img.com.ar/xyzdffaq.png',
        price: 1780.21
      },
    ]

    mockProductResponse = {
      content: mockProducts,
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
  });


  test('Deberia inicializar el servicio.', () => {
    expect(productService).toBeTruthy();
  });

  test('Deberia listar todos los productos.', (done)=> {
    const spy = jest.spyOn( productService, 'getAll' ).mockReturnValue( of( mockProductResponse ));

    productService.getAll().subscribe(response => {
      expect( response.content.length ).toBeGreaterThan(0);
      expect( response.content.length ).toEqual( mockProducts.length );
      expect( response.content ).toBe( mockProducts );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia listar productos por descripcion', (done)=> {
    const description:string = 'Producto';
    params.description = description;
    const productByDescription:Product[] = mockProducts.filter( prod => prod.description.includes( params.description as string ));
    mockProductResponse.content = productByDescription;

    const spy = jest.spyOn( productService, 'searchBy' ).mockReturnValue( of( mockProductResponse ));

    productService.searchBy( params ).subscribe(response => {
      

      expect( response.content.length ).toBeGreaterThan(0);
      expect( response.content.length ).toEqual( productByDescription.length );
      expect( response.content ).toBe( productByDescription );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia listar productos por categoria', (done)=> {
    const category:string = 'Prueba de categoria';
    params.category = category;
    const productByCategory:Product[] = mockProducts.filter( prod => prod.category.name === params.category );
    mockProductResponse.content = productByCategory;

    const spy = jest.spyOn( productService, 'searchBy' ).mockReturnValue( of( mockProductResponse ));

    productService.searchBy( params ).subscribe(response => {
      const products:Product[] = response.content;
      expect( products.length ).toBeGreaterThan(0);
      expect( products.length ).toEqual( productByCategory.length );
      expect( products ).toBe( productByCategory );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia listar productos por disponibilidad', (done)=> {
    params.available = true;
    const productsByAvailable:Product[] = mockProducts.filter( prod => prod.available === params.available );
    mockProductResponse.content = productsByAvailable;

    const spy = jest.spyOn( productService, 'searchBy' ).mockReturnValue( of( mockProductResponse ));


    productService.searchBy( params ).subscribe(response => {
      const products:Product[] = response.content;

      expect( products.length ).toBeGreaterThan(0);
      expect( products.length ).toEqual( productsByAvailable.length );
      expect( products ).toBe( productsByAvailable );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia listar productos por descripcion, categoria y disponibilidad', (done)=> {
    params.description = 'Prod';
    params.category = 'Prueba de categoria 2';
    params.available = true;

    const productsByParams:Product[] = mockProducts
      .filter( prod => prod.description.includes( params.description as string ) )
      .filter( prod => prod.category.name === params.category )
      .filter( prod => prod.available === params.available );
    
      mockProductResponse.content = productsByParams;

    const spy = jest.spyOn( productService, 'searchBy' ).mockReturnValue( of( mockProductResponse ));

    productService.searchBy( params ).subscribe(response => {
      const products:Product[] = response.content;

      expect( products.length ).toBeGreaterThan(0);
      expect( products.length ).toEqual( productsByParams.length );
      expect( products ).toBe( productsByParams );

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });

  test('Deberia guardar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'save' ).mockReturnValue( of( true ));

    productService.save( mockRequestProduct ).subscribe(response => {
      expect( response ).toBeTruthy();

      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia actualizar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'update' ).mockReturnValue( of( true ));
    const { id } = mockProduct;

    productService.update( id, mockRequestProduct ).subscribe(response => {
      expect( response ).toBeTruthy();
      
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia eliminar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'delete' ).mockReturnValue( of( true ));
    const { id } = mockProduct;

    productService.delete( id ).subscribe(response => {
      expect( response ).toBeTruthy();
      
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });

  test('Deberia deshabilitar un producto.', (done)=> {
    const spy = jest.spyOn( productService, 'disable' ).mockReturnValue( of( true ));
    const { id } = mockProduct;

    productService.disable( id, false ).subscribe(response => {
      expect( response ).toBeTruthy();
      
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
  
  test('Deberia eliminar productos por categoria.', (done)=> {
    const spy = jest.spyOn( productService, 'deleteByCategory' ).mockReturnValue( of( true ));
    const { id } = mockProducts[0].category;

    productService.deleteByCategory( id ).subscribe(response => {
      expect( response ).toBeTruthy();
      
      done();
    });

    expect( spy ).toHaveBeenCalled();
  });
});
