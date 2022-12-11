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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LanguageSelectorComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule,

    NzButtonModule,
    NzIconModule.forChild([UserOutline, LoginOutline, GithubOutline, LinkedinOutline]),
    NzDropDownModule,
  ],
  exports: [
    SidenavComponent,
  ],
})
export class LayoutModule { }
