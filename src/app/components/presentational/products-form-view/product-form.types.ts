import { FormControl, FormGroup } from '@angular/forms';

export type ProductForm = FormGroup<{
  name: FormControl<string>;
  category: FormControl<string>;
  image: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}>;
