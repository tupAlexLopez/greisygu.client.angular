import { Component, OnInit } from '@angular/core';
import { CategoryResponse, ProductResponse } from 'src/app/shared/interfaces/response.interface';

const category:CategoryResponse = {
  id: 1,
  name: 'Category 1'
};

@Component({
  selector: 'app-list-product-page',
  templateUrl: './list-product-page.component.html',
  styleUrls: ['./list-product-page.component.css']
})
export class ListProductPageComponent implements OnInit{
  public columnsTable:string[] = [];
  public dataSource:ProductResponse[] = [];

  ngOnInit(): void {
    this.columnsTable = [ 'Imagen', 'ID', 'Descripcion', 'Precio', 'Disponible', 'Categoria', 'Opciones'];
    this.dataSource = [
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Gaseosa Secco de Pomelo de 3Lts', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
      { img: 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/1:1/w_720,h_720,c_limit/dragon-ball-z.jpg' ,id: 1, description: 'Product 1', price: 10, available: true, category: category },
    ]
  }
}
