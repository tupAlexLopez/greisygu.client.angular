import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CategoryResponse } from 'src/app/shared/interfaces/response.interface';

import { ProductRequest } from '../../../shared/interfaces/request.interface';
import { CategoryService } from '../../services/category.service';
import { ValidatorService } from '../../services/validator.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CategoryAdminComponent } from '../category-admin/category-admin.component';
import { tap } from 'rxjs';

@Component({
  selector: 'products-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit{
  public title:string = 'Agregar nuevo producto';
  public categories: CategoryResponse[]= [];
  public newImage?:File;
  public alt_img?:any;

  public form:FormGroup = this.formBuilder.group({
    description: [ '', Validators.required ],
    price: [ '', [ Validators.required, Validators.pattern(this.validator.pricePattern)] ],
    category: [ '', Validators.required ],
    available: [ true ],
    img: [ '' ]
  });

  constructor(
    private validator:ValidatorService,
    private categoryService: CategoryService,
    private dialog: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductRequest,
    private formBuilder:FormBuilder,
  ){ }

  ngOnInit(): void {
    if( this.data ) {
      this.loadForm( this.data );
      this.title = 'Modificar producto';
    }

    this.categoryService.getAll()
    .pipe(
      tap( response => this.categories = response  )
    )
    .subscribe();
  }

  private loadForm( data:ProductRequest ){
    this.form.setValue({
      description: data.description,
      price: data.price,
      available: data.available,
      category: data.category.id,
      img: data.img,
    });
  }

  get currentProduct():ProductRequest {
    return this.form.value as ProductRequest;
  }

  public onSave():void {
    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      available: this.currentProduct.available,
      category: this.form.get('category')?.value,
      file: this.newImage? this.newImage : undefined,
    }

    this.dialog.close( data );
  }
  
  public onCancel():void {
    this.form.reset();
    this.dialog.close();
  }

  isInvalidField( field:string ):boolean | null {
    return this.validator.isInvalidField( this.form, field );
  }

  getFieldError( field:string ): string | null {
    return this.validator.getFieldError( this.form, field );
  }

  public onFileSelected( event:any ){
    if( event.target.files[0] ){
      const file:File = event.target.files[0];
      
      if(file){
        this.newImage =file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.alt_img = e.target.result;
        };
        
        reader.readAsDataURL( file );
      }
    }
  }
}

