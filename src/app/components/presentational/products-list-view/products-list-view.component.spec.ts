import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListViewComponent } from './products-list-view.component';

describe('ProductsListViewComponent', () => {
  let component: ProductsListViewComponent;
  let fixture: ComponentFixture<ProductsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
