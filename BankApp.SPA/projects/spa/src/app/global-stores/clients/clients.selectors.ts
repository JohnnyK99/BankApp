import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureState } from '../../shared/constants/enums/feature-state.enum';
import { ClientsState } from './clients.state';

const getClientsState = createFeatureSelector<ClientsState>(FeatureState.Clients);

export const getClients = createSelector(
  getClientsState,
  state => state.clients
);

export const getSelectedClientId = createSelector(
  getClientsState,
  state => state.selectedClientId
);
