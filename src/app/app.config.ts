import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, StoreRootModule, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { appReducer } from './shared/store/app.reducer';
import { provideAuth } from './core/providers/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      StoreModule.forRoot(appReducer),
      HttpClientModule,
      EffectsModule.forRoot([])
    ),

    provideAnimations(),
    provideAuth(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
