import { Component, OnInit } from '@angular/core';

type SidebarItem = {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  public sidebarItems:SidebarItem[] = [];

  constructor(){ }
  
  ngOnInit(): void {
    this.sidebarItems = [
      { label: 'Home', icon: 'home', url: './home' },
      { label: 'Productos', icon: 'inventory_2', url: './products/list' },
      { label: 'Categoria', icon: 'category', url: './products/admin' },
    ]
  }
}
