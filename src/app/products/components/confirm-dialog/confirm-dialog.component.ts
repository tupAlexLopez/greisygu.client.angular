import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OPTIONS } from 'src/app/shared/interfaces/util.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  public title?:string;

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog:{ title:string, description?:string },
  ) { }

  onNoClick(): void {
    this.dialog.close();
  }

  onClickConfirm(): void {
    this.dialog.close( true );
  }
}
