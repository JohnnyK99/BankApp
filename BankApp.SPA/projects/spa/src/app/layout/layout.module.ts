import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ClientSelectorComponent } from './sidenav/client-selector/client-selector.component';
import { SidenavComponent } from './sidenav/sidenav.component';

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
    NzIconModule,
    NzDropDownModule,
    NzFormModule,
    NzSelectModule,
  ],
  exports: [
    SidenavComponent,
  ],
})
export class LayoutModule { }
