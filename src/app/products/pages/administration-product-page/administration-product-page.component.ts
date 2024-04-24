import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OPTIONS, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { SaveDialogComponent } from '../../components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductRequest } from 'src/app/shared/interfaces/request.interface';
import { FileService } from '../../services/file.service';
import { ImageResponse } from '../../../shared/interfaces/response.interface';
import { CategoryAdminComponent } from '../../components/category-admin/category-admin.component';

@Component({
  selector: 'app-administration-product-page',
  templateUrl: './administration-product-page.component.html',
  styleUrls: ['./administration-product-page.component.css']
})
export class AdministrationProductPageComponent implements OnInit{
  private currentSizeDatasource:number = 0;
  
  private categorySelected?:string;
  private searchBoxValue?:string;
  private availableSelected?:boolean;


  public columnsTable:string[] = [];
  public dataSource:ProductResponse[] = [];

  constructor( 
    private router:Router,
    private productService:ProductService,
    private fileService:FileService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.columnsTable = [ 'Imagen', 'ID', 'Descripcion', 'Precio', 'Disponible', 'Categoria', 'Opciones'];
    this.productService.getAll()
      .pipe( tap( data => this.currentSizeDatasource = data.length ), )
      .subscribe( data => this.dataSource = data );
    
  }

  get getSearchValue():string {
    return this.searchBoxValue ?? '';
  }

  setSearchValue( value:string ) {
    this.searchBoxValue = value;
    this.refreshDatasource();
  }
  get getCategoryName():string {
    return this.categorySelected ?? '';
  }
  
  setCategoryName( value:string ) {
    this.categorySelected = value;
    this.refreshDatasource();
  }

  get getAvailable():boolean {
    return this.availableSelected!;
  }
  
  setAvailable( value:boolean ) {
    this.availableSelected = value;
    this.refreshDatasource();
  }

  get getCurrentSizeDatasource():number {
    return this.currentSizeDatasource;
  }

  public openSaveDialog( optionSelected:string, product?:ProductResponse  ):void {
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

  public openAdminCategoryDialog(): void {
    const dialogRef = this.dialog.open( CategoryAdminComponent, {  width: '450px' } );
    dialogRef.afterClosed().subscribe( ()=> this.refreshPage() );
  }

  public refreshDatasource():void { 
    
    if( this.searchBoxValue && 
      this.categorySelected && this.availableSelected
    ){
      this.productService.getAllByDescriptionAndCategoryNameAndAvailable( this.searchBoxValue, this.categorySelected, this.availableSelected )
      .subscribe( resp => this.dataSource = resp );

      return;
    }

    if( this.searchBoxValue && this.categorySelected ){
      this.productService.getAllByDescriptionAndCategoryName( this.searchBoxValue, this.categorySelected )
      .subscribe(resp => this.dataSource = resp );

      return;
    }

    if( this.searchBoxValue  ) {
      this.productService.getAllByDescription( this.searchBoxValue! ).subscribe(resp => this.dataSource = resp );
      return;
    }

    if( this.categorySelected ) {
      this.productService.getAllByCategoryName( this.categorySelected ).subscribe(resp => this.dataSource = resp );
      return;
    }

    if( this.availableSelected !== null ) { 
      this.productService.getAllByAvailable( this.availableSelected! ).subscribe(resp => this.dataSource = resp );
      return;
    }

  }

  public openConfirmDialog( option:string, product:ProductResponse ):void {
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
}
