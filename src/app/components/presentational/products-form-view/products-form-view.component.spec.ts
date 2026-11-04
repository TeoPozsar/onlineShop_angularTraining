import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsFormViewComponent } from './products-form-view.component';

describe('ProductsFormViewComponent', () => {
  let component: ProductsFormViewComponent;
  let fixture: ComponentFixture<ProductsFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormViewComponent);
    fixture.componentRef.setInput(
      'productForm',
      new FormGroup({
        name: new FormControl(''),
        category: new FormControl(''),
        image: new FormControl(''),
        price: new FormControl(0),
        description: new FormControl(''),
      }),
    );
    fixture.componentRef.setInput('title', 'Test');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables the form fields while saving', async () => {
    fixture.componentRef.setInput('isSaving', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');

    expect(fieldset.disabled).toBe(true);
  });
});
