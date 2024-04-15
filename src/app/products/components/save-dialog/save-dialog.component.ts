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
    id: [ '', Validators.required ],
    img: [ '', Validators.required ],
    description: [ '', Validators.required ],
    price: [ '', Validators.required ],
    available: [ 'true', Validators.required ],
    category: [ '', Validators.required ],
  });


  constructor( 
    private dialog: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductResponse,
    private formBuilder:FormBuilder,
  ){
    if(data){
      this.fillForm(data);
    }
  }

  get productForm():ProductResponse {
    return this.formData.value as ProductResponse;
  }

  private fillForm( data:ProductResponse ){
    this.formData.setValue({
      id: data.id,
      img: data.img,
      description: data.description,
      price: data.price,
      available: data.available,
      category: data.category.name
    });
  }
  public onSave():void {

  }
  
  public onCancel():void {
    this.dialog.close(false);
  }

  public onFileSelected( event:any ){
    const file:File = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload= ()=> {
          this.formData.controls['img'].setValue( reader.result );
        }
        reader.readAsDataURL(file);
      }
  }
}

