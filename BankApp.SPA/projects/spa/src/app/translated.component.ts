import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { LanguageConstants } from './shared/constants/language.constants';
import { TranslationService } from './shared/services/translation.service';

@Component({
  template: '',
})
export class TranslatedComponent extends BaseComponent implements OnInit {

  currentLanguage = LanguageConstants.defaultLanguageCode;

  constructor(public translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.observe(this.translationService.currentLanguage$).subscribe(lang => {
      this.currentLanguage = lang;
    });
  }
}
