import { LanguageModel } from '../../shared/models/language.model';

export interface LanguageState {
  availableLanguages: LanguageModel[];
  selectedLanguageCode: string;
}
