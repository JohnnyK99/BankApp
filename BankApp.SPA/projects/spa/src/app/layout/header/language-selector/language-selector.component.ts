import { Component } from '@angular/core';
import { LanguageFacade } from '../../../global-stores/language/language.facade';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'bnk-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  constructor(
    public translationService: TranslationService,
    public facade: LanguageFacade
  ) {}
}

