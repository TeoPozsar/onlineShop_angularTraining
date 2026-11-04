import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartDetailsView } from './shopping-cart-details-view.component';

describe('ShoppingCartDetailsView', () => {
  let component: ShoppingCartDetailsView;
  let fixture: ComponentFixture<ShoppingCartDetailsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetailsView],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDetailsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the product ID when increasing quantity', () => {
    const emittedProductIds: string[] = [];
    component.increase.subscribe((productId) => emittedProductIds.push(productId));
    fixture.componentRef.setInput('items', [displayItem]);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[aria-label^="Increase quantity"]').click();

    expect(emittedProductIds).toEqual(['product-1']);
  });

  it('emits the product ID when decreasing quantity', () => {
    const emittedProductIds: string[] = [];
    component.decrease.subscribe((productId) => emittedProductIds.push(productId));
    fixture.componentRef.setInput('items', [displayItem]);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[aria-label^="Decrease quantity"]').click();

    expect(emittedProductIds).toEqual(['product-1']);
  });

  it('emits the product ID when removing an item', () => {
    const emittedProductIds: string[] = [];
    component.remove.subscribe((productId) => emittedProductIds.push(productId));
    fixture.componentRef.setInput('items', [displayItem]);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('[aria-label^="Remove"]').click();

    expect(emittedProductIds).toEqual(['product-1']);
  });
});

const displayItem = {
  productId: 'product-1',
  quantity: 2,
  product: {
    id: 'product-1',
    name: 'Test product',
    category: 'Test category',
    description: 'Test description',
    price: 10,
    image: 'test.jpg',
  },
};
