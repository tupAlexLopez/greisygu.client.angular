import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataConfirmDialog, OPTIONS } from 'src/app/products/interfaces/util.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog:DataConfirmDialog,
  ) { }

  onNoClick(): void {
    this.dialog.close();
  }

  onClickConfirm(): void {
    this.dialog.close( true );
  }
}
