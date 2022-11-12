import jwtDecode from 'jwt-decode';
import { AuthStatus } from '../constants/enums/auth-status.enum';
import { DecodedToken } from '../models/decoded-token.model';

export class AuthHelpers {
  static getAccessTokenExp(token: string | null): number | null {
    if(!token) {
      return null;
    }

    const exp = this.decodeToken(token).exp;
    return exp ? exp * 1000 : null; //TODO: How does token store time?
  }

  static getInitialStatus(token: string | null): AuthStatus {
    const exp = this.getAccessTokenExp(token);

    return exp ? AuthStatus.Authenticated : AuthStatus.LoggedOut;
  }

  private static decodeToken(token: string): DecodedToken {
    return jwtDecode<DecodedToken>(token);
  }
}
