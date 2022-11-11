import { LocalStorageKeys } from '../constants/enums/local-storage-keys.enum';
import { LanguageConstants } from '../constants/language.constants';

export class LocalStorageHelpers {
  static setSelectedLanguage(languageCode: string): void {
    this.setItem(LocalStorageKeys.selectedLanguage, languageCode);
  }

  static getSelectedLanguage(): string {
    return this.getItem(LocalStorageKeys.selectedLanguage, LanguageConstants.defaultLanguageCode);
  }

  static removeSelectedLanguage(): void {
    this.removeItem(LocalStorageKeys.selectedLanguage);
  }

  private static getItem<T>(key: LocalStorageKeys, defaultValue: T): T {
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

  private static setItem<T>(key: LocalStorageKeys, value: T) {
    if(!value) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  private static removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }
}
