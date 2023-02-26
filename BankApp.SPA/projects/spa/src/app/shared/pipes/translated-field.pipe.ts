import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LanguageConstants } from '../constants/language.constants';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translatedField',
  pure: false,
  standalone: true,
})
export class TranslatedFieldPipe implements PipeTransform, OnDestroy {
  private asyncPipe: AsyncPipe;
  private previousValue: Map<string, string>;
  private result: Observable<string | null | undefined> | null;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.asyncPipe = new AsyncPipe(this.cdr);
  }

  transform(value: Map<string, string>): string | null | undefined {
    if(value !== this.previousValue || this.result == null) {
      this.result = this.translationService.currentLanguage$.pipe(map(lang => this.translateValue(value, lang)));
      this.previousValue = value;
    }

    return this.asyncPipe.transform(this.result);
  }

  ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

  private translateValue(value: Map<string, string>, lang: string): string | null | undefined {
    return value.get(lang) ?? value.get(LanguageConstants.defaultLanguageCode);
  }
}
