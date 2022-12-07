import { Pipe, PipeTransform } from '@angular/core';
import { LanguageConstants } from '../constants/language.constants';

@Pipe({
  name: 'translatedField',
  standalone: true,
})
export class TranslatedFieldPipe implements PipeTransform {
  transform(value: Map<string, string>, language: string): string | undefined {
    return value.get(language) ?? value.get(LanguageConstants.defaultLanguageCode);
  }
}
