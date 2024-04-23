import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAvailableComponent } from './filter-available.component';

describe('FilterAvailableComponent', () => {
  let component: FilterAvailableComponent;
  let fixture: ComponentFixture<FilterAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
