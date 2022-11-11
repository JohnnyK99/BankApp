import { LanguageModel } from '../models/language.model';

export const LanguageConstants = {
  availableLanguages: [
    {
      code: 'pl',
      name: 'Polski',
      flag: './assets/icons/flags/pl.svg',
    },
    {
      code: 'en',
      name: 'English',
      flag: './assets/icons/flags/gb.svg',
    },
  ] as LanguageModel[],
  defaultLanguageCode: 'pl',
};
