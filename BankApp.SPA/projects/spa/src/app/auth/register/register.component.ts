import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { AppRoutes } from '../../app-routes.constants';
import { BaseComponent } from '../../base.component';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { StringHelpers } from '../../shared/helpers/string.helpers';

@Component({
  selector: 'bnk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  readonly AppRoutes = AppRoutes;
  readonly AuthStatus = AuthStatus;

  registrationFormGroup = this.fb.group({
    firstName: this.fb.control<string>('', [Validators.required]),
    lastName: this.fb.control<string>('', [Validators.required]),
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required]),
    repeatPassword: this.fb.control<string>('', [Validators.required]),
  });

  get passwordFormControl(): FormControl<string> {
    return this.registrationFormGroup.controls.password;
  }

  get repeatPasswordFormControl(): FormControl<string> {
    return this.registrationFormGroup.controls.repeatPassword;
  }

  get hasEnoughCharacters(): boolean {
    return this.passwordFormControl.value.length >= 8;
  }

  get hasEnoughCapitalLetters(): boolean {
    return StringHelpers.getCapitalLettersCount(this.passwordFormControl.value) >= 1;
  }

  get hasEnoughDigits(): boolean {
    return StringHelpers.getDigitCount(this.passwordFormControl.value) >= 1;
  }

  get hasEnoughSpecialCharacters(): boolean {
    return StringHelpers.getSpecialCharacterCount(this.passwordFormControl.value, ['!', '@', '#', '$', '%', '^', '&', '*']) >= 1;
  }

  constructor(
    private fb: NonNullableFormBuilder,
    public facade: AuthFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.passwordFormControl.setValidators(this.passwordValidator);
    this.repeatPasswordFormControl.setValidators(this.repeatPasswordValidator);
    this.observe(this.passwordFormControl.valueChanges).subscribe(() => this.repeatPasswordFormControl.updateValueAndValidity());
  }

  register(): void {
    if(this.registrationFormGroup.valid) {
      this.facade.register(this.registrationFormGroup.getRawValue());
    }
  }

  passwordValidator: ValidatorFn = (): ValidationErrors | null => {
    const isValid = this.hasEnoughCharacters && this.hasEnoughCapitalLetters && this.hasEnoughDigits && this.hasEnoughSpecialCharacters;

    if(isValid) {
      return null;
    }

    return { invalidPassword: true };
  };

  repeatPasswordValidator: ValidatorFn = (control: AbstractControl<string>): ValidationErrors | null => {
    const isSame = this.passwordFormControl.value === control.value;

    if(isSame) {
      return null;
    }

    return { doesNotMatch: true };
  };
}
