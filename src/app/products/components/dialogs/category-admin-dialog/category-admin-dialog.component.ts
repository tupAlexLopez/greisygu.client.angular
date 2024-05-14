import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { tap } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { ValidatorService } from '../../../services/validator.service';
import { ProductService } from '../../../services/product.service';

import { CategoryResponse } from 'src/app/products/interfaces/response.interface';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin-dialog.component.html'
})
export class CategoryAdminComponent implements OnInit{
  private changes:boolean = false;
  private currentCategory?:CategoryResponse;
  
  
  public enable:boolean = false;
  public titleForm:string = '';
  public categories:CategoryResponse[] = [];
  public form:FormGroup = this.formBuilder.group({
    category: [ '' , Validators.required ]
  });

  constructor(
    private validator:ValidatorService,
    private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private productService:ProductService,
    private dialog: MatDialogRef<CategoryAdminComponent>,
    private matDialog:MatDialog
  ){ }


  ngOnInit(): void {
    this.refreshDatasource();
  }

  onSaveButton():void {
    this.reset();
    this.enable = true;
    this.titleForm = 'Nueva categoria';
  }

  onCancelButton():void {
    this.enable =false;
  }

  onCloseButton():void {
    this.dialog.close( this.changes );
  }

  onUpdateButton( category:CategoryResponse ):void {
    this.form.get( 'category' )?.setValue( category.name );
    this.titleForm = 'Modificar categoria';
    this.currentCategory = category;
    this.enable = true;
  }

  onDeleteButton( idCategory:number ):void {
    const dialogRef = this.matDialog.open( ConfirmDialogComponent, 
      { 
        data:  {
          title: '¿Esta seguro que desea eliminar esta categoria?',
          description:' Se eliminaran todos los productos asociados a esta categoria.' 
        }
      });
    dialogRef.afterClosed()
    .subscribe( result => {
      if(!result)
        return;

      this.productService.deleteByCategory( idCategory )
      .pipe( tap( ()=> this.changes = true ))
      .subscribe();

      this.categoryService.delete( idCategory )
      .pipe( 
        tap( ()=> this.reset()), 
        tap( ()=> this.refreshDatasource()), 
      )
      .subscribe();
    });
  }

  onSave():void {
    if( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    if( this.currentCategory ){
      this.changes = true;
      this.currentCategory.name = this.form.get('category')?.value;
      this.categoryService.update( this.currentCategory )
      .pipe( 
        tap( ()=> this.reset()), 
        tap( ()=> this.refreshDatasource()), 
      )
      .subscribe();
      
      return;
    }

    const categoryName:string = this.form.get('category')?.value;
    this.categoryService.save( categoryName )
    .pipe( 
      tap( ()=> this.reset()), 
      tap( ()=> this.refreshDatasource()), 
    )
    .subscribe();
  };

  private reset():void {
    this.form.reset();
    this.titleForm = '';
    this.currentCategory = undefined;
    this.enable = false;
  }

  private refreshDatasource():void {
    this.categoryService.getAll()
    .subscribe( resp => this.categories = resp );
  }

  isInvalidField():boolean | null {
    return this.validator.isInvalidField( this.form, 'category' );
  }

  get getError():string | null {
    return this.validator.getFieldError( this.form, 'category');
  }

}
