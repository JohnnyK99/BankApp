import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

@Component({
  selector: 'bnk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginFormGroup = this.fb.group({
    idNumber: this.fb.control<string>('', [Validators.required]),
    password: this.fb.control<string>('', [Validators.required]),
  });

  readonly AuthStatus = AuthStatus;

  constructor(
    private fb: NonNullableFormBuilder,
    public facade: AuthFacade
  ) {}

  login(): void {
    if(this.loginFormGroup.valid) {
      this.facade.login(this.loginFormGroup.getRawValue());
    }
  }

  fillCustomerData(): void {
    this.loginFormGroup.setValue({ idNumber: '12345', password: 'abcde' });
  }

  fillEmployeeData(): void {
    this.loginFormGroup.setValue({ idNumber: '99999', password: 'wwwww' });
  }

}
