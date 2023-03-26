import { AbstractControl, ValidationErrors } from '@angular/forms';
import { StringHelpers } from '../helpers/string.helpers';

export class StringValidators {
  static required = (control: AbstractControl): ValidationErrors | null => {
    if(control.value == null) {
      return { required: true };
    }

    const value: string = control.value;

    if(StringHelpers.isEmptyOrWhitespace(value)) {
      return { required: true };
    }

    return null;
  };
}
