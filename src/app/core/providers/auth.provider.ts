import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  Provider,
} from '@angular/core';
import { authInterceptor } from '../interceptor/auth.interceptor';
import { AuthService } from 'src/app/modules/auth/auth.service';

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
  return [
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(AuthService),
      multi: true,
    },
  ];
};
