import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryResponse, OPTIONS, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { SaveDialogComponent } from '../../components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const category:CategoryResponse = {
  id: 1,
  name: 'galletitas'
};

@Component({
  selector: 'app-administration-product-page',
  templateUrl: './administration-product-page.component.html',
  styleUrls: ['./administration-product-page.component.css']
})
export class AdministrationProductPageComponent implements OnInit{
  public columnsTable:string[] = [];
  public dataSource:ProductResponse[] = [];

  constructor( 
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.columnsTable = [ 'Imagen', 'ID', 'Descripcion', 'Precio', 'Disponible', 'Categoria', 'Opciones'];
    this.dataSource = [
      { img: 'https://maxiconsumo.com/media/catalog/product/cache/8313a15b471f948db4d9d07d4a9f04a2/1/9/19904_169120741864cdc6fa669305.47676088.jpg' ,id: "1", description: 'Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts', price: 10, available: true, category: category },
      { img: 'https://maxiconsumo.com/media/catalog/product/cache/8313a15b471f948db4d9d07d4a9f04a2/1/9/19904_169120741864cdc6fa669305.47676088.jpg' ,id: "1", description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://maxiconsumo.com/media/catalog/product/cache/8313a15b471f948db4d9d07d4a9f04a2/1/9/19904_169120741864cdc6fa669305.47676088.jpg' ,id: "1", description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://maxiconsumo.com/media/catalog/product/cache/8313a15b471f948db4d9d07d4a9f04a2/1/9/19904_169120741864cdc6fa669305.47676088.jpg' ,id: "1", description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://maxiconsumo.com/media/catalog/product/cache/8313a15b471f948db4d9d07d4a9f04a2/1/9/19904_169120741864cdc6fa669305.47676088.jpg' ,id: "1", description: 'Product 1', price: 10, available: true, category: category },
    ]
  }

  public openDialog( optionSelected?:string, data?:ProductResponse  ):void {
    let dialogRef;
    switch( optionSelected ){
      case OPTIONS.SAVE:
        dialogRef = this.dialog.open( SaveDialogComponent );
        break;
      case OPTIONS.UPDATE:
        dialogRef = this.dialog.open( SaveDialogComponent, { data: data } );
        break;
      case OPTIONS.DELETE:
        dialogRef = this.dialog.open( ConfirmDialogComponent, { data: OPTIONS.DELETE } );
        break;
      case OPTIONS.DISABLE:
        dialogRef = this.dialog.open( ConfirmDialogComponent, { data: OPTIONS.DISABLE } );
        break;
    } 



    // dialogRef.afterClosed()
    //   .pipe(
    //     filter(  (result:boolean) => result),
    //     tap( ()=> this.showSnackBar('Eliminado con exito.') )
    //   )
    // .subscribe();
  }

  public openDeleteDialog():void {
    const dialogRef = this.dialog.open( ConfirmDialogComponent );

    dialogRef.afterClosed()
      .pipe(
        filter(  (result:boolean) => result),
        tap( ()=> this.showSnackBar('Eliminado con exito.') )
      )
    .subscribe();
  }

  showSnackBar( message:string ):void{
    this.snackBar.open( message, 'OK', {
      duration: 2500
    });
  }
}
