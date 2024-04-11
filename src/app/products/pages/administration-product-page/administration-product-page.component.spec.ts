import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationProductPageComponent } from './administration-product-page.component';

describe('AdministrationProductPageComponent', () => {
  let component: AdministrationProductPageComponent;
  let fixture: ComponentFixture<AdministrationProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
