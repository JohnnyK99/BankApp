import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageFacade } from '../../global-stores/language/language.facade';
import { LocalStorageHelpers } from '../helpers/local-storage.helpers';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLanguage$ = this.facade.selectedLanguage$;

  constructor(
    private translate: TranslateService,
    private facade: LanguageFacade
  ) {
    this.translate.use(LocalStorageHelpers.getSelectedLanguage());
  }

  setLanguage(language: string): void {
    this.facade.setLanguage(language);
    LocalStorageHelpers.setSelectedLanguage(language);
    this.translate.use(language);
  }

  getCurrentLanguageCode(): string {
    return this.translate.currentLang.toLocaleLowerCase();
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
