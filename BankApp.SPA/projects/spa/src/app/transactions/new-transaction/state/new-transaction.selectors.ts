import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../../shared/constants/enums/feature-state.enum';
import { NewTransactionState } from './new-transaction.state';

const getNewTransactionState = createFeatureSelector<NewTransactionState>(FeatureState.NewTransaction);

export const getNewTransactionId = createSelector(
  getNewTransactionState,
  state => state.newTransactionId
);
