import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AppRoutes } from '../../app-routes.constants';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { DictionariesFacade } from '../../global-stores/dictionaries/dictionaries.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';
import { StringHelpers } from '../../shared/helpers/string.helpers';
import { TranslationService } from '../../shared/services/translation.service';
import { TranslatedComponent } from '../../translated.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends TranslatedComponent implements OnInit {
  readonly AppRoutes = AppRoutes;
  readonly AuthStatus = AuthStatus;

  step = 0;

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
    public authFacade: AuthFacade,
    public dictFacade: DictionariesFacade,
    private fb: NonNullableFormBuilder,
    public override translationService: TranslationService
  ) {
    super(translationService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.dictFacade.getAccountTypes();

    this.passwordFormControl.addValidators([this.passwordValidator]);
    this.repeatPasswordFormControl.addValidators([this.repeatPasswordValidator]);

    this.observe(this.passwordFormControl.valueChanges)
      .subscribe(() => this.repeatPasswordFormControl.updateValueAndValidity());

    this.observe(this.dictFacade.accountTypes$)
      .subscribe(accountTypes => this.initialAccountTypeIdControl.setValue(!accountTypes?.length ? null : accountTypes[0].id, { emitEvent: false }));
  }

  moveForward(): void {
    this.step++;
  }

  moveBack(): void {
    this.step--;
  }

  register(): void {
    if(this.registrationFormGroup.valid) {
      this.authFacade.register(this.registrationFormGroup.getRawValue());
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
