import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsService } from '../../../../../services/products';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ShoppingCartDetails } from './shopping-cart-details.component';

describe('ShoppingCartDetails', () => {
  let component: ShoppingCartDetails;
  let fixture: ComponentFixture<ShoppingCartDetails>;
  let cartService: ShoppingCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartDetails],
      providers: [
        {
          provide: ProductsService,
          useValue: { getProducts: () => of([product]) },
        },
      ],
    }).compileComponents();

    cartService = TestBed.inject(ShoppingCartService);
    cartService.updateItems([{ productId: product.id, quantity: 2 }]);
    fixture = TestBed.createComponent(ShoppingCartDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the quantity and monetary total after increasing an item', () => {
    component.increaseQuantity(product.id);

    expect(cartService.items()).toEqual([{ productId: product.id, quantity: 3 }]);
    expect(component.total()).toBe(30);
  });
});

const product = {
  id: 'product-1',
  name: 'Test product',
  category: 'Test category',
  description: 'Test description',
  price: 10,
  image: 'test.jpg',
};
