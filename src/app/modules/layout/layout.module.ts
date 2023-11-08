import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { appReducer } from 'src/app/shared/store/app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
@NgModule({
  imports: [
    LayoutRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    StoreModule.forFeature("appState", appReducer ),
  
  ],
  providers: [
   
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class LayoutModule {}
