import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  ModuleWithProviders,
  Provider,
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
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
