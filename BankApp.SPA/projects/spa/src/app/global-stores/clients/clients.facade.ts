import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientsActions } from './clients.actions';
import { getClients, getSelectedClientId } from './clients.selectors';
import { ClientsState } from './clients.state';

@Injectable({
  providedIn: 'root',
})
export class ClientsFacade {
  clients$ = this.store.select(getClients);
  selectedClientId$ = this.store.select(getSelectedClientId);

  constructor(private store: Store<ClientsState>) {}

  fetchClients(searchBy: string): void {
    this.store.dispatch(ClientsActions.fetchClients({ searchBy }));
  }

  setSelectedClientId(id: string): void {
    this.store.dispatch(ClientsActions.setSelectedClientId({ id }));
  }
}
