import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AlertService } from '../../../shared/services/alert.service';

@Injectable()
export class NewTransactionEffects {

  constructor(
    private actions$: Actions,
    private alertService: AlertService
  ) {}
}
