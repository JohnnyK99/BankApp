import { Translation } from './translation.model';

export interface IdTranslationsApi {
  id: number;
  translations: Translation[];
}
