import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDialog, OPTIONS } from 'src/app/shared/interfaces/util.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  public title:string = '';

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog:{ option:OPTIONS, status?:boolean },
  ) {
    console.log( dataDialog.option );
    switch( dataDialog.option ){
      case OPTIONS.DISABLE:
        if( dataDialog.status === true ){
          this.title = '¿Desea deshabilitar este producto?';
        }else{ 
          this.title = '¿Desea habilitar este producto?';
        }

      break;

      case OPTIONS.DELETE:
        console.log('Debe llegar aqui.')
        this.title = '¿Desea eliminar este producto?'
      break;
    }
  }

  onNoClick(): void {
    this.dialog.close();
  }

  onClickConfirm(): void {
    this.dialog.close(true);
  }
}
