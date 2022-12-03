import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

export interface AuthState {
  accessToken: string | null;
  accessTokenExp: number | null;
  refreshToken: string | null;
  refreshTokenExp: number | null;
  username: string;
  userRoles: string[];
  status: AuthStatus;
}
