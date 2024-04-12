import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryResponse, ProductResponse } from 'src/app/shared/interfaces/response.interface';
import { SaveDialogComponent } from '../../components/save-dialog/save-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const category:CategoryResponse = {
  id: 1,
  name: 'Category 1'
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
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts Gaseosa Secco de Pomelo de 3Lts', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
    ]
  }

  public openSaveDialog():void {
    const dialogRef = this.dialog.open( SaveDialogComponent );

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
