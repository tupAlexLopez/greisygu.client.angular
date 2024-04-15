import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OPTIONS } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  public title:string = '';

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:OPTIONS,
  ) {
    switch(data){
      case OPTIONS.DISABLE:
        this.title = '¿Desea deshabilitar este producto?'
        break;
      
      case OPTIONS.DELETE:
        this.title = '¿Desea eliminar este producto?'
        break;
    }
  }

  onNoClick(): void {
    this.dialog.close(false);
  }
  onClickConfirm(): void {
    this.dialog.close(true);
  }
}
