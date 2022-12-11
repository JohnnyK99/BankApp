import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { CheckOutline, CloseOutline } from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TranslatedFieldPipe } from '../shared/pipes/translated-field.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule,
    TranslatedFieldPipe,

    NzSpinModule,
    NzButtonModule,
    NzInputModule,
    NzAlertModule,
    NzFormModule,
    NzRadioModule,
    NzSkeletonModule,
    NzStepsModule,
    NzIconModule.forChild([CheckOutline, CloseOutline]),
  ],
})
export class AuthModule { }
