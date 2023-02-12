import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { ClientsEffects } from './clients.effects';
import { clientsReducer } from './clients.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Clients, clientsReducer),
    EffectsModule.forFeature([ClientsEffects]),
  ],
})
export class ClientsStoreModule { }
