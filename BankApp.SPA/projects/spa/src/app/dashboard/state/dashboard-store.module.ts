import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './dashboard.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardStoreModule { }
