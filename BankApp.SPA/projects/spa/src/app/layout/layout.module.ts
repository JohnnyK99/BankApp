import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IconModule } from '../shared/icon.module';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSelectorComponent } from './header/language-selector/language-selector.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    CommonModule,
    IconModule,

    //Angular material
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }
