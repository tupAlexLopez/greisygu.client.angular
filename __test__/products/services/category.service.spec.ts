import { TestBed } from '@angular/core/testing';

import { CategoryService } from '../../../src/app/products/services/category.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';
import { of } from 'rxjs';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpTestingController:HttpTestingController;

  let mockCategories:CategoryResponse[];
  let mockCategory:CategoryResponse;
  let nameCategoryTest:string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CategoryService ]
    });

    categoryService = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject( HttpTestingController )
  });

  afterEach(()=> httpTestingController.verify());

  beforeEach(() => {
    mockCategories = [ 
      { id: 1, name: 'Prueba'}, 
      { id: 2, name: 'Prueba 2'}, 
      { id: 3, name: 'Prueba 3'}, 
      { id: 4, name: 'Prueba 4'}, 
      { id: 5, name: 'Prueba 5'}, 
    ];

    nameCategoryTest = 'Prueba test';
    mockCategory   = { id: 5, name: 'Prueba de actualizacion' };
  });

  test('(1) Deberia inicializar el servicio.', () => {
    expect( categoryService ).toBeTruthy(); 
  });

  test('(2) Deberia traer todas las categorias disponibles.', (done) => {
    const spy = jest.spyOn(categoryService, 'getAll').mockReturnValue( of( mockCategories ));

    categoryService.getAll().subscribe(response => {
      expect( response ).toBeTruthy();
      expect( response ).toEqual(mockCategories);
      
      done();
    });

    expect(spy).toHaveBeenCalled();
  });

  test('(3) Deberia guardar una categoria.', ( done ) => {
    const spy = jest.spyOn(categoryService, 'save').mockReturnValue(of( true ));
  
    categoryService.save( nameCategoryTest )
    .subscribe(response => {
      expect( response ).toBeTruthy();
      
      done();
    })
    expect(spy).toHaveBeenCalled();
  });

  test('(4) Deberia actualizar una categoria existente.', () => {
    const spy = jest.spyOn(categoryService, 'update').mockReturnValue(of( true ));
  
    categoryService.update( mockCategory ).subscribe(response =>{
      expect( response ).toBeTruthy();
    });

    expect(spy).toHaveBeenCalled();
  });

  test('(5) Deberia eliminar una categoria.', () => {
    const spy = jest.spyOn(categoryService, 'delete').mockReturnValue(of( true ));
  
    categoryService.delete( mockCategory.id ).subscribe(response => expect( response ).toBeTruthy());

    expect(spy).toHaveBeenCalled();
  });
});
