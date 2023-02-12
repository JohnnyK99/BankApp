import { Client } from 'projects/api-client/src/models/auth/client.model';

export interface ClientsState {
  clients: Client[];
  selectedClientId: string | null;
}
