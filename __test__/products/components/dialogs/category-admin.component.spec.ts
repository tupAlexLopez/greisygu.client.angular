import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdminComponent } from '../../../../src/app/products/components/category-admin/category-admin.component';

describe('CategoryAdminComponent', () => {
  let component: CategoryAdminComponent;
  let fixture: ComponentFixture<CategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
