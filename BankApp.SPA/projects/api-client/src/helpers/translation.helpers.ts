import { Translation } from '../models/shared/translation.model';

export class TranslationHelpers {
  static getTranslationsMap(translations: Translation[]): Map<string, string> {
    const result: Map<string, string> = new Map<string, string>();
    translations.forEach(translation => result.set(translation.countryCode, translation.value));

    return result;
  }
}
