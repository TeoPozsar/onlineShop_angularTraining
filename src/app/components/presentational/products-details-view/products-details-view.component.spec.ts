import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsDetailsViewComponent } from './products-details-view.component';
import { Product } from '../../../types/products.types';

const product: Product = {
  id: '1',
  name: 'Keyboard',
  category: 'Accessories',
  description: 'A mechanical keyboard',
  price: 99.9,
  image: 'https://example.com/keyboard.png',
};

describe('ProductsDetailsViewComponent', () => {
  let component: ProductsDetailsViewComponent;
  let fixture: ComponentFixture<ProductsDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDetailsViewComponent);
    fixture.componentRef.setInput('product', product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
