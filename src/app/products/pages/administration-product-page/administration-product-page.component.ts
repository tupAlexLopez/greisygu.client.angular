import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPage, OPTIONS, Pageable, Product, ProductResponse } from 'src/app/shared/interfaces/response.interface';
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

  public pages:number[] = [];
  public columnsTable:string[] = [];
  public dataSource:Product[] = [];

  public dataPage?:DataPage;
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
      .pipe( 
        tap( resp => {

          this.dataPage = {
            pageable: resp.pageable,
            isFirst: resp.first,
            isLast: resp.last,
            numberOfElements: resp.numberOfElements,
            totalPages: resp.totalPages
          };
        }),
        tap( ()=> {
          for (let i = 1; i <= this.dataPage!.totalPages; i++) {
            this.pages.push(i);
          }
        }),
        tap( resp => this.currentSizeDatasource = resp.numberOfElements ),
        tap( resp => this.dataSource= resp.content ),
      )
      .subscribe(); 
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

  public openAdminCategoryDialog(): void {
    const dialogRef = this.dialog.open( CategoryAdminComponent, {  width: '450px' } );
    dialogRef.afterClosed().subscribe( ()=> this.refreshPage() );
  }

  public refreshDatasource():void { 
    //TODO: Aplicar la logica de filtrado
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

  onNavigate( page:number ){
    this.productService.getAll( (page - 1) )
    .pipe(
      tap( resp => {
        this.dataPage = {
          pageable: resp.pageable,
          isFirst: resp.first,
          isLast: resp.last,
          numberOfElements: resp.numberOfElements,
          totalPages: resp.totalPages
        };
        console.log(this.dataPage);
      }),
      tap( resp => this.currentSizeDatasource = resp.numberOfElements ),
      tap( resp => this.dataSource= resp.content ),
      tap( ()=> console.log(this.dataSource) )
    ).subscribe();
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
