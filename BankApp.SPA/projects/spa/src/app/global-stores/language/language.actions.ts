import { createAction, props } from '@ngrx/store';
import { SelectLanguageProps } from './props/select-language.props';

export const LanguageActions = {
  selectLanguage: createAction(
    '[Lang] Select language',
    props<SelectLanguageProps>()
  ),
};
