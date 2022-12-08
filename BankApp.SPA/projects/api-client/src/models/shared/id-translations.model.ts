import { TranslationHelpers } from '../../helpers/translation.helpers';
import { IdTranslationsApi } from './id-translations-api.model';

export class IdTranslation {
  id: number;
  translation: Map<string, string>;

  constructor(
    model: IdTranslationsApi
  ) {
    this.id = model.id;
    this.translation = TranslationHelpers.getTranslationsMap(model.translations);
  }

  static from(obj: IdTranslationsApi): IdTranslation;
  static from(obj: IdTranslationsApi[]): IdTranslation[];
  static from(obj: IdTranslationsApi | IdTranslationsApi[]): IdTranslation | IdTranslation[] {
    if(Array.isArray(obj)) {
      return obj.map(item => new IdTranslation(item));
    }
    return new IdTranslation(obj);
  }
}
