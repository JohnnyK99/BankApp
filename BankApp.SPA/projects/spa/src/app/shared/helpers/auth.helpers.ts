import jwtDecode from 'jwt-decode';
import { AuthStatus } from '../constants/enums/auth-status.enum';
import { DecodedToken } from '../models/decoded-token.model';
import { LocalStorageHelpers } from './local-storage.helpers';

export class AuthHelpers {
  static getAccessTokenExp(token: string | null): number | null {
    if(!token) {
      return null;
    }

    const exp = this.decodeToken(token).exp;

    return exp ? exp * 1000 : null; //token stores expiry time in seconds instead of miliseconds
  }

  static getRefreshTokenExp(expiresIn: number): number {
    return new Date().setSeconds(new Date().getSeconds() + expiresIn);
  }

  static getUserRoles(token: string | null): string[] {
    if(!token) {
      return [];
    }

    const roles = this.decodeToken(token).role;

    if(!roles) {
      return [];
    }

    if(Array.isArray(roles)) {
      return roles;
    }

    return [roles];
  }

  static getUserName(token: string | null): string {
    if(!token) {
      return '';
    }

    const name = this.decodeToken(token).name;

    return name ?? '';
  }

  static getInitialStatus(): AuthStatus {
    const token = LocalStorageHelpers.getAccessToken();
    const exp = this.getAccessTokenExp(token);

    if(exp && exp > Date.now()) {
      return AuthStatus.Authenticated;
    }
    return AuthStatus.LoggedOut;
  }

  static isTokenExpired(exp: number): boolean {
    return exp < Date.now();
  }

  private static decodeToken(token: string): DecodedToken {
    return jwtDecode<DecodedToken>(token);
  }
}
