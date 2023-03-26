import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AppRoutes } from '../../shared/constants/routes/app-routes.constants';
import { AuthFacade } from '../../global-stores/auth/auth.facade';
import { AuthStatus } from '../../shared/constants/enums/auth-status.enum';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly AuthStatus = AuthStatus;
  readonly AppRoutes = AppRoutes;

  loginFormGroup = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required]),
  });

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
    this.loginFormGroup.setValue({ email: 'anowak@gmail.com', password: 'tRtyU45!as' });
  }

  fillEmployeeData(): void {
    this.loginFormGroup.setValue({ email: 'bkowalski@gmail.com', password: 'Tpfforith2!' });
  }

}
