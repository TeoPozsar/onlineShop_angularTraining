import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './interceptors/auth-interceptor';
import {provideStore} from '@ngrx/store';
import {productsReducer} from './features/products/state/products.reducer';
import {provideEffects} from '@ngrx/effects';
import {ProductsEffects} from './features/products/state/products.effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { isDevMode} from '@angular/core';
import { userReducer } from './features/user/state/user.reducer';
import { UserEffects } from './features/user/state/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ products: productsReducer, user: userReducer }),
    provideEffects([ProductsEffects, UserEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
