import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  public title:string       ='Bienvenido/a'
  public description:string ='¿Que desea realizar?'
  constructor( private router:Router ){ }

  onClick():void {
    this.router.navigateByUrl('/products/admin');
  }
}
