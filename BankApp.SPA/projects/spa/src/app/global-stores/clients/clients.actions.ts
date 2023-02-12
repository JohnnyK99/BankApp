import { createAction, props } from '@ngrx/store';
import { FetchClientsSuccessProps } from './props/fetch-clients-success.props';
import { FetchClientsProps } from './props/fetch-clients.props';
import { SetSelectedClientIdProps } from './props/set-selected-client-id.props';

export const ClientsActions = {
  fetchClients: createAction(
    '[Clients] Fetch clients',
    props<FetchClientsProps>()
  ),
  fetchClientsSuccess: createAction(
    '[Clients] Fetch clients success',
    props<FetchClientsSuccessProps>()
  ),
  fetchClientsFail: createAction(
    '[Clients] Fetch clients fail'
  ),
  setSelectedClientId: createAction(
    '[Clients] Set selected client id',
    props<SetSelectedClientIdProps>()
  ),
};
