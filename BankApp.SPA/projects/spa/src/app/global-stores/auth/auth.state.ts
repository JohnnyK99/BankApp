import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

export interface AuthState {
  accessToken: string | null;
  accessTokenExp: number | null;
  status: AuthStatus;
}
