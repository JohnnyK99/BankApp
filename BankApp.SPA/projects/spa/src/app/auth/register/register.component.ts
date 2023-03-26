import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { RegistrationModel } from 'projects/api-client/src/models/auth/registration.model';
import { AppRoutes } from '../../shared/constants/routes/app-routes.constants';
import { BaseComponent } from '../../base.component';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { DictionariesFacade } from '../../global-stores/dictionaries/dictionaries.facade';
import { AuthConstants } from '../../shared/constants/auth.constants';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { RegistrationStep } from '../../shared/constants/enums/registration-step.enum';
import { StringHelpers } from '../../shared/helpers/string.helpers';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  readonly AppRoutes = AppRoutes;
  readonly AuthStatus = AuthStatus;
  readonly RegistrationStep = RegistrationStep;
  readonly passwordRules = AuthConstants.passwordRules;

  step = RegistrationStep.PersonalData;

  registrationFormGroup = this.fb.group({
    firstName: this.fb.control<string>('', [Validators.required]),
    lastName: this.fb.control<string>('', [Validators.required]),
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required]),
    repeatPassword: this.fb.control<string>('', [Validators.required]),
    initialAccountTypeId: this.fb.control<number | null>(null),
  });

  get passwordFormControl(): FormControl<string> {
    return this.registrationFormGroup.controls.password;
  }

  get repeatPasswordFormControl(): FormControl<string> {
    return this.registrationFormGroup.controls.repeatPassword;
  }

  get initialAccountTypeIdControl(): FormControl<number | null> {
    return this.registrationFormGroup.controls.initialAccountTypeId;
  }

  get hasEnoughCharacters(): boolean {
    return this.passwordFormControl.value.length >= this.passwordRules.minLength;
  }

  get hasEnoughCapitalLetters(): boolean {
    return StringHelpers.getCapitalLettersCount(this.passwordFormControl.value) >= this.passwordRules.minCapitalLetters;
  }

  get hasEnoughDigits(): boolean {
    return StringHelpers.getDigitCount(this.passwordFormControl.value) >= this.passwordRules.minDigits;
  }

  get hasEnoughSpecialCharacters(): boolean {
    return StringHelpers.getSpecialCharacterCount(this.passwordFormControl.value, this.passwordRules.specialCharacters) >= this.passwordRules.minSpecialCharacters;
  }

  constructor(
    public authFacade: AuthFacade,
    public dictFacade: DictionariesFacade,
    private fb: NonNullableFormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.dictFacade.getAccountTypes();

    this.passwordFormControl.addValidators([this.passwordValidator]);
    this.repeatPasswordFormControl.addValidators([this.repeatPasswordValidator]);

    this.observe(this.passwordFormControl.valueChanges)
      .subscribe(() => this.repeatPasswordFormControl.updateValueAndValidity());

    this.observe(this.dictFacade.accountTypes$)
      .subscribe(accountTypes => this.initialAccountTypeIdControl.setValue(accountTypes?.length == null ? null : accountTypes[0].id, { emitEvent: false }));
  }

  moveForward(): void {
    this.step++;
  }

  moveBack(): void {
    this.step--;
  }

  register(): void {
    if(this.registrationFormGroup.valid) {
      const model: RegistrationModel = {
        firstName: this.registrationFormGroup.controls.firstName.value,
        lastName: this.registrationFormGroup.controls.lastName.value,
        email: this.registrationFormGroup.controls.email.value,
        password: this.registrationFormGroup.controls.password.value,
        accountTypeId: this.registrationFormGroup.controls.initialAccountTypeId.value,
      };

      this.authFacade.register(model);
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
