import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { DashboardEffects } from './dashboard.effects';
import { dashboardReducer } from './dashboard.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(FeatureState.Dashboard, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardStoreModule { }
