import { Component, OnInit } from '@angular/core';

type SidebarItem = {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{
  public titleMenuBar:string = 'greisygu$';
  public sidebarItems:SidebarItem[] = [];
  
  ngOnInit(): void {
    this.sidebarItems = [
      { label: 'Home', icon: 'home', url: './home' },
      { label: 'Administracion', icon: 'web', url: './products/admin' },
    ]
  }
}
