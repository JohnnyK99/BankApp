import { createReducer, on } from '@ngrx/store';
import { ClientsActions } from './clients.actions';
import { ClientsState } from './clients.state';

const initialState: ClientsState = {
  clients: [],
  selectedClientId: null,
};

export const clientsReducer = createReducer<ClientsState>(
  initialState,
  on(ClientsActions.fetchClientsSuccess, (state, action): ClientsState => ({
    ...state,
    clients: action.clients,
  })),
  on(ClientsActions.setSelectedClientId, (state, action): ClientsState => ({
    ...state,
    selectedClientId: action.id,
  }))
);
