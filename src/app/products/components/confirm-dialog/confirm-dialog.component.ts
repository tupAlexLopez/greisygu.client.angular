import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OPTIONS } from 'src/app/shared/interfaces/util.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit{
  public title?:string;

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog:{ option:OPTIONS, status?:boolean },
  ) { }

  ngOnInit(): void {
    switch( this.dataDialog.option ){
      case OPTIONS.DISABLE:
        this.title = (this.dataDialog.status) ? 
          '¿Desea deshabilitar este producto?' : 
          '¿Desea habilitar este producto?';
      
      break;

      case OPTIONS.DELETE:
        this.title = '¿Desea eliminar este producto?'
      break;
    }
  }

  onNoClick(): void {
    this.dialog.close();
  }

  onClickConfirm(): void {
    this.dialog.close( true );
  }
}
