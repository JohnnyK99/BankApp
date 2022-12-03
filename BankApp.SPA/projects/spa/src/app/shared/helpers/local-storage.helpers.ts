import { AppRoutes } from '../../app-routes.constants';
import { LocalStorageKey } from '../constants/enums/local-storage-key.enum';
import { LanguageConstants } from '../constants/language.constants';

export class LocalStorageHelpers {
  static setSelectedLanguage(languageCode: string): void {
    this.setItem(LocalStorageKey.SelectedLanguage, languageCode);
  }

  static getSelectedLanguage(): string {
    return this.getItem(LocalStorageKey.SelectedLanguage, LanguageConstants.defaultLanguageCode);
  }

  static removeSelectedLanguage(): void {
    this.removeItem(LocalStorageKey.SelectedLanguage);
  }

  static setAccessToken(token: string): void {
    this.setItem(LocalStorageKey.AccessToken, token);
  }

  static getAccessToken(): string | null {
    return this.getItem(LocalStorageKey.AccessToken, null);
  }

  static removeAccessToken(): void {
    this.removeItem(LocalStorageKey.AccessToken);
  }

  static setRefreshToken(token: string): void {
    this.setItem(LocalStorageKey.RefreshToken, token);
  }

  static getRefreshToken(): string | null {
    return this.getItem(LocalStorageKey.RefreshToken, null);
  }

  static removeRefreshToken(): void {
    this.removeItem(LocalStorageKey.RefreshToken);
  }

  static setRefreshTokenExp(exp: number): void {
    this.setItem(LocalStorageKey.RefreshTokenExp, exp);
  }

  static getRefreshTokenExp(): number | null {
    return this.getItem(LocalStorageKey.RefreshTokenExp, null);
  }

  static removeRefreshTokenExp(): void {
    this.removeItem(LocalStorageKey.RefreshTokenExp);
  }

  static setLoginTargetUrl(url: string): void {
    this.setItem(LocalStorageKey.LoginTargetUrl, url);
  }

  static getLoginTargetUrl(): string {
    return this.getItem(LocalStorageKey.LoginTargetUrl, AppRoutes.base);
  }

  static removeLoginTargetUrl(): void {
    this.removeItem(LocalStorageKey.LoginTargetUrl);
  }

  private static getItem<T>(key: LocalStorageKey, defaultValue: T): T {
    const value = localStorage.getItem(key);

    if(value == null) {
      return defaultValue;
    }

    try {
      return JSON.parse(value);
    } catch (err) {
      return defaultValue;
    }
  }

  private static setItem<T>(key: LocalStorageKey, value: T): void {
    if(!value) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  private static removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}
