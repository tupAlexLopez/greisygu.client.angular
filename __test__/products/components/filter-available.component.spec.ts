import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FilterAvailableComponent } from '../../../src/app/products/components/filter-available/filter-available.component';

describe('FilterAvailableComponent', () => {
  let component: FilterAvailableComponent;
  let fixture: ComponentFixture<FilterAvailableComponent>;
  let compiled: HTMLElement;
  let loader: HarnessLoader;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAvailableComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(FilterAvailableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader( fixture );
    compiled = fixture.nativeElement;
    
    fixture.detectChanges();
  });

  test('Deberia inicializar el componente', () => {
    expect(component).toBeTruthy();
  });

  test('Debe coincidir el HTML con el snapshot', ()=> {
    const html = compiled.innerHTML;
    expect( html ).toMatchSnapshot();
  });

  test('HTML debe tener un mat-form-field con su respectivo label.', async()=> {
    const labelTextExpected:string = 'Disponibilidad';
    const form = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness);
    const label = await form.getLabel();

    expect( form ).not.toBeNull();
    expect( label ).toEqual( labelTextExpected );
  })

  test('HTML debe tener un mat-select con sus respectivas opciones disponibles.', async()=> {
    
  })

  

});
