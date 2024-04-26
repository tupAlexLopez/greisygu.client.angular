import { Params } from './../../../shared/interfaces/response.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryResponse, DataPage, OPTIONS, Product, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { SaveDialogComponent } from '../../components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, map, pipe, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductRequest } from 'src/app/shared/interfaces/request.interface';
import { FileService } from '../../services/file.service';
import { ImageResponse } from '../../../shared/interfaces/response.interface';
import { CategoryAdminComponent } from '../../components/category-admin/category-admin.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-administration-product-page',
  templateUrl: './administration-product-page.component.html',
  styleUrls: ['./administration-product-page.component.css']
})
export class AdministrationProductPageComponent implements OnInit{
  datasourceSize:number = 0;
  currentCategories:CategoryResponse[] = [];

  public pages:number[] = [];
  public columnsTable:string[] = [];
  public datasource:Product[] = [];
  public dataPage?:DataPage;
  private params:Params = { description: undefined, category: undefined, available: undefined };
  
  constructor( 
    private router:Router,
    private productService:ProductService,
    private categoryService:CategoryService,
    private fileService:FileService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.columnsTable = [ 'Imagen', 'ID', 'Descripcion', 'Precio', 'Disponible', 'Categoria', 'Opciones'];
    this.categoryService.getAll().subscribe( response => this.currentCategories = response);
    this.refreshDatasource();
  }
  
  onSearchValue( value:string ):void {
    this.params.description =value
    this.applyFilters();
  }
  
  onSelectCategoryName( value:string ):void {
    this.params.category =value;
    this.applyFilters();
  }
  
  onSelectAvailable( value:boolean ):void {
    this.params.available =value;
    this.applyFilters();
  }

  public applyFilters():void {
    this.searchBy( this.params );
  }


  public openSaveDialog( optionSelected:string, product?:Product  ):void {
    let dialogRef;
    switch( optionSelected ){
      case OPTIONS.SAVE:
        dialogRef = this.dialog.open( SaveDialogComponent );
        dialogRef.afterClosed()
        .subscribe( form => {
          if( !form )
            return;

          const request: ProductRequest = {
            description: form.description,
            price: form.price,
            available: form.available,
            img: product?.img ?? '',
            category: { id: form.category }
          }


          if( form.file ){ 
            const { file } = form;
            this.fileService.uploadImage( file )
            .subscribe( (resp:ImageResponse) => {
              request.img = resp.filename;
              this.saveAndRefresh( request );
            });

            return;
          }

          this.saveAndRefresh( request );
        });
      break;
      case OPTIONS.UPDATE:
        dialogRef = this.dialog.open( SaveDialogComponent, { data: product } );
        dialogRef.afterClosed()
        .subscribe( form => {
          if( !form )
            return;

          const request: ProductRequest = {
            description: form.description,
            price: form.price,
            available: form.available,
            img: product?.img ?? '',
            category: { id: form.category }
          }

          if( !product?.img && form.file ){
            const { file } =form; 
            this.fileService.uploadImage( file )
            .subscribe( resp => {
              request.img = resp.filename;
              this.updateAndRefresh( product!.id, request );
            });

            return;
          }

          if( product?.img && form.file ){
            const { file } =form;
            this.fileService.updateImage( product.img, file )
            .subscribe( resp => {
              request.img = resp.filename; 
              this.updateAndRefresh( product.id, request );
            });

            return;
          }

          this.updateAndRefresh( product!.id, request );
        });
      break;
    }
  }
  public openConfirmDialog( option:string, product:Product ):void {
    let dialog;
    switch( option ){
      case OPTIONS.DELETE:
        dialog = this.dialog.open( ConfirmDialogComponent, 
          { 
            data: {
              title: '¿Esta seguro que desea eliminar este producto?',
              description: 'Este proceso es irreversible.'
            }
          }
        );
        dialog.afterClosed()
        .subscribe( result =>  {
          if(!result)
            return;

          this.productService.delete( product.id )
          .pipe( 
            filter( resp => resp ),
            tap( ()=> this.refreshPage()),
            tap( ()=> this.showSnackBar('Eliminado correctamente') ), 
          )
          .subscribe();
        });
      break;

      case OPTIONS.DISABLE:
        dialog = this.dialog.open( ConfirmDialogComponent, 
          { 
            data: {
              title: product.available ?  '¿Desea deshabilitar este producto?' : '¿Desea habilitar este producto?'
            }
          }
        );
        dialog.afterClosed()
        .subscribe( result =>  {
          if(!result)
            return;

          this.productService.disable( product.id, !product.available )
          .pipe( 
            filter( resp => resp ),
            tap( ()=> this.refreshPage()),
            tap( ()=> this.showSnackBar('Realizado correctamente') ), 
          )
          .subscribe();
        });
      break;
    }
  }
  public openAdminCategoryDialog(): void {
    const dialogRef = this.dialog.open( CategoryAdminComponent, {  width: '450px' } );
    dialogRef.afterClosed().subscribe( (changes)=> {
      if(!changes)
        return;

      this.refreshPage();
    });
  }

  onNavigate( page:number ){
    if(this.existsParams()){
      this.searchBy(this.params, page);
      
      return;
    }

    this.refreshDatasource( page );
  }

  private saveAndRefresh( request:ProductRequest ):void {
    this.productService.save( request )
    .pipe(
      tap( ()=> this.refreshPage()),
      tap( ()=> this.showSnackBar('Guardado correctamente.') ), 
    )
    .subscribe();
  }

  private updateAndRefresh( id:string, request:ProductRequest ):void {
    this.productService.update( id, request )
    .pipe(
      tap( ()=> this.refreshPage()),
      tap( ()=> this.showSnackBar('Modificado correctamente.') ), 
    )
    .subscribe();
  }

  private searchBy( params:Params, page?:number ):void {
    this.productService.searchBy( params, page )
    .pipe(
      tap( response => {
        this.dataPage = {
          pageNumber: (response.pageable.pageNumber + 1),
          isFirst: response.first,
          isLast: response.last,
          totalPages: response.totalPages
        };
      }),
      tap( () => this.loadPages( this.dataPage!.totalPages ) ),
      tap( response => this.datasource = response.content ) 
    )
    .subscribe();
  }

  private refreshDatasource( page?:number ):void {
    this.productService.getAll( page )
    .pipe(
      tap( response => {
        this.dataPage = {
          pageNumber: (response.pageable.pageNumber + 1),
          isFirst: response.first,
          isLast: response.last,
          totalPages: response.totalPages,
        };
        this.datasourceSize = response.totalElements
      }),
      tap( () =>  this.loadPages( this.dataPage!.totalPages ) ),
      map( response => response.content ),
      tap( products =>  this.datasource = products )
    )
    .subscribe();
  }

  private refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  private showSnackBar( message:string ):void{
    this.snackBar.open( message, 'OK', {
      duration: 1500
    });
  }

  loadPages( totalPages:number ):void {
    this.pages = [];
    for( let page=1; page <= totalPages; page++ ){
      this.pages.push(page);
    }
  }

  existsParams():boolean {
    if( !this.params.description 
      && !this.params.available 
      && !this.params.category)
      return false;

    
      return true;
  }
}
