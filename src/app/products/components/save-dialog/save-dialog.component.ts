import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'products-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent {
  public formData:FormGroup = this.formBuilder.group({
    img: [ '', Validators.required ],
    description: [ '', Validators.required ],
    price: [ '', Validators.required ],
    available: [ '', Validators.required ],
    category: [ '', Validators.required ],
  });

  // public product?:ProductResponse;
  constructor( 
    private dialog: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductResponse,
    private formBuilder:FormBuilder,
  ){}

  public onSave():void {

  }
  public onCancel():void {
    this.dialog.close(false);
  }
}
