import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryResponse, OPTIONS, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { SaveDialogComponent } from '../../components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';

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
    private service:ProductService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.columnsTable = [ 'Imagen', 'ID', 'Descripcion', 'Precio', 'Disponible', 'Categoria', 'Opciones'];
    this.service.getAll()
      .subscribe( data => this.dataSource = data );
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

  public refreshDatasource( products:ProductResponse[] ):void { this.dataSource = products; }

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
