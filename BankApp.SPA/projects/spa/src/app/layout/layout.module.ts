import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UserOutline, LoginOutline, GithubOutline, LinkedinOutline } from '@ant-design/icons-angular/icons';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ClientSelectorComponent } from './sidenav/client-selector/client-selector.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LanguageSelectorComponent,
    SidenavComponent,
    ClientSelectorComponent,
    NoAccessComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule,
    ReactiveFormsModule,

    NzButtonModule,
    NzIconModule.forChild([UserOutline, LoginOutline, GithubOutline, LinkedinOutline]),
    NzDropDownModule,
    NzFormModule,
    NzSelectModule,
  ],
  exports: [
    SidenavComponent,
  ],
})
export class LayoutModule { }
