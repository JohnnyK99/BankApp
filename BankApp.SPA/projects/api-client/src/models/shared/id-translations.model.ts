import { IdTranslationsApi, Translation } from './id-translations-api.model';

export class IdTranslation {
  id: number;
  translation: Map<string, string>;

  constructor(
    model: IdTranslationsApi
  ) {
    this.id = model.id;
    this.translation = this.getTranslationsMap(model.translations);
  }

  static from(obj: IdTranslationsApi): IdTranslation;
  static from(obj: IdTranslationsApi[]): IdTranslation[];
  static from(obj: IdTranslationsApi | IdTranslationsApi[]): IdTranslation | IdTranslation[] {
    if(Array.isArray(obj)) {
      return obj.map(item => new IdTranslation(item));
    }
    return new IdTranslation(obj);
  }

  private getTranslationsMap(translations: Translation[]): Map<string, string> {
    const result: Map<string, string> = new Map<string, string>();
    translations.forEach(translation => result.set(translation.countryCode, translation.value));

    return result;
  }
}
