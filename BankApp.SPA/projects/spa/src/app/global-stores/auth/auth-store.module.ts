import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule { }
